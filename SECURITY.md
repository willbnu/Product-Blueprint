# Security Policy

## Supported Versions

Security updates are provided for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please:

1. **Email:** security@yourcompany.com
2. **Subject:** "[SECURITY] Brief description"
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 1 week
- **Status Updates:** Every week until resolved
- **Public Disclosure:** After fix is deployed (coordinated with you)

### Bug Bounty

We currently do not offer a bug bounty program, but we deeply appreciate responsible disclosure and will credit you in our security advisories (if desired).

## Security Best Practices

### For Users

1. **Keep Dependencies Updated**
   ```bash
   pnpm update
   pnpm audit
   ```

2. **Never Commit Secrets**
   - Use `.env.local` for secrets (gitignored)
   - Never commit API keys, tokens, passwords

3. **Use Environment Variables**
   ```bash
   # ❌ Bad
   const API_KEY = "sk_live_xxxxx";

   # ✅ Good
   const API_KEY = process.env.API_KEY;
   ```

4. **Enable 2FA**
   - On GitHub
   - On Supabase
   - On deployment platforms (Netlify, Vercel, EAS)

### For Contributors

1. **Dependency Security**
   - Run `pnpm audit` before PRs
   - Update vulnerable dependencies
   - Use `pnpm audit fix` when possible

2. **Code Review**
   - Review security implications
   - Check for exposed secrets
   - Validate input/output

3. **Supabase RLS**
   - Always enable Row Level Security
   - Test policies thoroughly
   - Never use service role key in client code

## Known Security Considerations

### Supabase Security

**Row Level Security (RLS):**
- All tables MUST have RLS enabled
- Policies must be thoroughly tested
- Service role key MUST stay server-side only

**Example Policy:**
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);
```

### API Keys

**Public vs Private:**

```bash
# ✅ Safe to expose (public keys)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...  # Anon key is designed to be public

# ❌ NEVER expose (private keys)
SUPABASE_SERVICE_ROLE_KEY=   # Full database access!
STRIPE_SECRET_KEY=           # Can charge customers!
```

### Client-Side Security

**React Native / Expo:**
- All `EXPO_PUBLIC_*` variables are embedded in app bundle
- Never put secrets in `EXPO_PUBLIC_*`
- Use secure storage for sensitive data (expo-secure-store)

**Web:**
- All `VITE_*` variables are in client bundle
- Anyone can inspect client-side code
- Backend validation is essential

### Authentication

**Best Practices:**
- Use Supabase Auth (don't roll your own)
- Implement proper session management
- Use secure password requirements
- Enable email verification
- Implement rate limiting

## Security Checklist

### Before Deployment

- [ ] All secrets in environment variables
- [ ] No hardcoded credentials in code
- [ ] RLS enabled on all Supabase tables
- [ ] RLS policies tested
- [ ] HTTPS enabled (production)
- [ ] CORS configured correctly
- [ ] Rate limiting on sensitive endpoints
- [ ] Input validation on all forms
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS prevention (React escapes by default)
- [ ] Dependencies audited (`pnpm audit`)
- [ ] Error messages don't leak sensitive info

### Regular Maintenance

- [ ] Monthly dependency updates
- [ ] Quarterly security audit
- [ ] Review access logs
- [ ] Rotate secrets annually
- [ ] Monitor error tracking (Sentry)
- [ ] Review Supabase auth logs

## Incident Response

If a security incident occurs:

1. **Assess Impact**
   - What data was exposed?
   - How many users affected?

2. **Contain**
   - Rotate compromised credentials
   - Block malicious IPs
   - Deploy fixes

3. **Notify**
   - Affected users (if applicable)
   - Team members
   - Stakeholders

4. **Document**
   - What happened
   - How it was fixed
   - How to prevent in future

5. **Learn**
   - Update security practices
   - Improve monitoring
   - Train team

## Useful Security Tools

```bash
# Audit dependencies
pnpm audit

# Check for exposed secrets (using gitleaks)
brew install gitleaks
gitleaks detect --source . --verbose

# Static analysis
pnpm lint

# Dependency vulnerability scanning
pnpm add -D @socketsecurity/cli
npx socket ci
```

## Contact

- **Security Email:** security@yourcompany.com
- **Security Team Lead:** [Name]
- **Response Time:** 48 hours

---

**Last Updated:** 2024-01-15

Thank you for helping keep our project secure!
