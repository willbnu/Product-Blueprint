# Security Implementation Guide

Complete guide for implementing security best practices in your app.

---

## Table of Contents

- [Row Level Security (RLS)](#row-level-security-rls)
- [Authentication Security](#authentication-security)
- [Secret Management](#secret-management)
- [API Security](#api-security)
- [Data Protection](#data-protection)
- [Frontend Security](#frontend-security)
- [CI/CD Security](#cicd-security)
- [Security Checklist](#security-checklist)

---

## Row Level Security (RLS)

### Why RLS is Critical

**Without RLS:** Any authenticated user can access all data in the database.

**With RLS:** Each user can only access their own data, enforced at the database level.

### Implementing RLS on Supabase

#### Step 1: Enable RLS on All Tables

```sql
-- Enable RLS (do this for EVERY table)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables
```

⚠️ **CRITICAL:** Tables without RLS enabled are accessible to ALL authenticated users!

#### Step 2: Create Policies for Each Operation

**Basic CRUD Policies:**

```sql
-- SELECT Policy (Read)
CREATE POLICY "Users can view own data"
  ON todos FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT Policy (Create)
CREATE POLICY "Users can insert own data"
  ON todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE Policy (Update)
CREATE POLICY "Users can update own data"
  ON todos FOR UPDATE
  USING (auth.uid() = user_id);

-- DELETE Policy (Delete)
CREATE POLICY "Users can delete own data"
  ON todos FOR DELETE
  USING (auth.uid() = user_id);
```

#### Step 3: Verify No Cross-Tenant Access

**Test with Two Different Users:**

```sql
-- User 1 (ID: user-111) creates a todo
INSERT INTO todos (id, user_id, title)
VALUES ('todo-1', 'user-111', 'User 1 Todo');

-- User 2 (ID: user-222) tries to access it
-- Switch to user-222's session
SELECT * FROM todos WHERE id = 'todo-1';
-- Should return ZERO rows (RLS blocks it)

-- User 2 tries to update it
UPDATE todos SET title = 'Hacked!' WHERE id = 'todo-1';
-- Should fail or affect ZERO rows

-- Verify user can only see their own data
SELECT * FROM todos;
-- Should only show todos where user_id = 'user-222'
```

### Advanced RLS Patterns

#### Public + Private Data

```sql
-- Posts table: Public for viewing, private for editing
CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT
  USING (true);  -- Public read

CREATE POLICY "Users can edit own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = author_id);
```

#### Role-Based Access

```sql
-- Admins can see all data
CREATE POLICY "Admins can view all"
  ON todos FOR SELECT
  USING (
    auth.uid() = user_id
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

#### Shared Access

```sql
-- Team members can view shared todos
CREATE POLICY "View own or shared todos"
  ON todos FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM todo_shares
      WHERE todo_id = todos.id
      AND user_id = auth.uid()
    )
  );
```

### RLS Testing Checklist

- [ ] RLS enabled on ALL tables
- [ ] Policies created for SELECT, INSERT, UPDATE, DELETE
- [ ] Tested with multiple user accounts
- [ ] Verified no cross-tenant data leakage
- [ ] Edge cases handled (null user_id, deleted users)
- [ ] Performance tested (policies use indexes)

---

## Authentication Security

### Password Requirements

```typescript
// Enforce on client side
const passwordSchema = z.string()
  .min(8, 'Minimum 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

// Configure in Supabase Dashboard:
// Authentication → Providers → Email → Password Policy
```

### Session Security

```typescript
// Configure session timeout
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// Set secure cookie options
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for enhanced security
  },
  global: {
    headers: {
      'X-Client-Info': 'your-app/1.0.0',
    },
  },
});
```

### Multi-Factor Authentication (MFA)

```typescript
// Enable MFA for high-value accounts
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
  friendlyName: 'My Authenticator App',
});

// Verify MFA code
const { data, error } = await supabase.auth.mfa.verify({
  factorId: data.id,
  challengeId: challenge.id,
  code: userEnteredCode,
});
```

---

## Secret Management

### ⚠️ Critical: Never Commit Secrets

**Bad (DON'T DO THIS):**
```typescript
// ❌ Hardcoded secret in code
const API_KEY = 'sk_live_12345abcdef';
const supabaseUrl = 'https://myproject.supabase.co';
```

**Good:**
```typescript
// ✅ Use environment variables
const API_KEY = process.env.API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
```

### Secret Types

| Secret Type | Safe to Expose? | Where to Store |
|-------------|----------------|----------------|
| **Supabase URL** | ✅ Yes (public) | Client-side env var |
| **Supabase Anon Key** | ✅ Yes (protected by RLS) | Client-side env var |
| **Supabase Service Role Key** | ❌ NO! (full DB access) | Server-side only, never in client |
| **API Keys (Stripe, etc.)** | ❌ NO! | Server-side only |
| **JWT Secrets** | ❌ NO! | Server-side only |

### Environment Variable Security

#### Mobile (Expo)

```bash
# .env.local (gitignored)
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# ⚠️ Variables with EXPO_PUBLIC_ prefix are embedded in the app
# Never put secrets here!
```

**Access in code:**
```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
```

#### Web (Vite)

```bash
# .env.local (gitignored)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# ⚠️ Variables with VITE_ prefix are in client bundle
# Never put secrets here!
```

**Access in code:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

### .gitignore Verification

```bash
# Verify secrets are ignored
cat .gitignore | grep -E "\.env\.local|\.env\.production"

# If not found, add them:
echo ".env.local" >> .gitignore
echo ".env*.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### Secret Rotation

**If a secret is accidentally exposed:**

1. **Immediately revoke** the exposed secret
2. **Generate new** secret
3. **Update** all environments
4. **Notify** team members
5. **Monitor** for unauthorized access

```bash
# Rotate Supabase keys:
# 1. Go to Supabase Dashboard → Settings → API
# 2. Click "Regenerate" for anon key
# 3. Update .env.local in all environments
# 4. Redeploy all services
```

---

## API Security

### Rate Limiting

```typescript
// Supabase Edge Function with rate limiting
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const userId = req.headers.get('x-user-id');

  // Check rate limit
  const { data: rateLimitData } = await supabase
    .from('rate_limits')
    .select('count, window_start')
    .eq('user_id', userId)
    .single();

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;

  if (rateLimitData) {
    const timeSinceWindow = now - new Date(rateLimitData.window_start).getTime();

    if (timeSinceWindow < windowMs && rateLimitData.count >= maxRequests) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
  }

  // Continue with request...
});
```

### Input Validation

```typescript
import { z } from 'zod';

// Define schema
const createTodoSchema = z.object({
  title: z.string()
    .min(1, 'Title required')
    .max(500, 'Title too long')
    .trim(),
  description: z.string()
    .max(5000, 'Description too long')
    .optional(),
  due_date: z.string()
    .datetime()
    .optional(),
});

// Validate input
async function createTodo(input: unknown) {
  // Validate and sanitize
  const validated = createTodoSchema.parse(input);

  // Use validated data (SQL injection safe)
  const { data, error } = await supabase
    .from('todos')
    .insert(validated);

  return data;
}
```

### CORS Configuration

```typescript
// Supabase Edge Function CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com', // ⚠️ Never use '*' in production
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Your logic here...

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
```

---

## Data Protection

### Encryption

**In Transit:**
- ✅ HTTPS/TLS 1.3 enforced
- ✅ Certificate pinning (mobile apps)
- ✅ No unencrypted HTTP

**At Rest:**
- ✅ Database encrypted (Supabase default)
- ✅ File storage encrypted (Supabase Storage)
- ✅ Backups encrypted

### Sensitive Data Handling

```typescript
// ❌ Bad: Logging sensitive data
console.log('User password:', password);
console.log('Credit card:', creditCard);

// ✅ Good: Redact sensitive data
console.log('User authenticated:', { userId: user.id });
console.log('Payment processed:', { last4: card.last4 });
```

### PII Compliance (GDPR/CCPA)

```sql
-- Allow users to export their data
CREATE FUNCTION export_user_data(user_id UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'profile', (SELECT * FROM profiles WHERE id = user_id),
    'todos', (SELECT json_agg(*) FROM todos WHERE user_id = user_id),
    'posts', (SELECT json_agg(*) FROM posts WHERE author_id = user_id)
  );
$$ LANGUAGE SQL;

-- Allow users to delete their data
CREATE FUNCTION delete_user_data(user_id UUID)
RETURNS VOID AS $$
  DELETE FROM profiles WHERE id = user_id;
  DELETE FROM todos WHERE user_id = user_id;
  DELETE FROM posts WHERE author_id = user_id;
  -- Cascade deletes handle related data
$$ LANGUAGE SQL;
```

---

## Frontend Security

### XSS Prevention

```tsx
// ✅ React escapes by default
<div>{userInput}</div>  // Safe

// ⚠️ Dangerous: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // Unsafe!

// ✅ If you must render HTML, sanitize first
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
```

### Content Security Policy

```typescript
// Add CSP headers (in your hosting config)
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co",
  "frame-ancestors 'none'",
].join('; ');
```

---

## CI/CD Security

### GitHub Actions Secrets

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}
        run: |
          # Secrets are available as env vars
          # Never echo secrets in logs!
```

**Set secrets in GitHub:**
```
Settings → Secrets and variables → Actions → New repository secret
```

---

## Security Checklist

### Pre-Launch Security Audit

**Database:**
- [ ] RLS enabled on ALL tables
- [ ] RLS policies tested with multiple users
- [ ] No service role key in client code
- [ ] Database backups configured
- [ ] Sensitive columns encrypted if needed

**Authentication:**
- [ ] Strong password requirements enforced
- [ ] Session timeout configured
- [ ] MFA available for sensitive accounts
- [ ] Email verification enabled
- [ ] OAuth providers configured securely

**Secrets:**
- [ ] No secrets in git history
- [ ] `.env.local` in `.gitignore`
- [ ] Different credentials per environment
- [ ] Secrets stored in CI/CD secret manager
- [ ] Service keys never in client code

**API:**
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] SQL injection prevention verified
- [ ] Error messages don't leak info

**Frontend:**
- [ ] XSS prevention verified
- [ ] CSP headers configured
- [ ] No sensitive data in localStorage
- [ ] HTTPS enforced
- [ ] Dependencies security scanned

**CI/CD:**
- [ ] Branch protection enabled
- [ ] Required status checks
- [ ] Signed commits (optional)
- [ ] Dependabot enabled
- [ ] Security scanning in pipeline

---

## Tools & Resources

**Security Scanning:**
- [Dependabot](https://github.com/dependabot) - Dependency updates
- [Snyk](https://snyk.io/) - Vulnerability scanning
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Package security

**Penetration Testing:**
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [Burp Suite](https://portswigger.net/burp) - Web security testing

**Compliance:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Security risks
- [CWE Top 25](https://cwe.mitre.org/top25/) - Dangerous weaknesses
- [GDPR Compliance](https://gdpr.eu/) - Privacy compliance

---

**Next Steps:**
1. Review this guide
2. Implement RLS policies
3. Audit secret management
4. Run security checklist
5. Schedule regular security reviews
