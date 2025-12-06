# Alternative Database Integration Guide

This guide explains how to replace Supabase with alternative backend/database solutions in Product-Blueprint.

## Supported Alternatives

| Provider | Type | Best For |
|----------|------|----------|
| [Convex](#convex) | Realtime Backend | Real-time apps, automatic sync |
| [Vercel Postgres](#vercel-postgres) | PostgreSQL | Vercel-hosted apps |
| [Firebase](#firebase) | NoSQL + Auth | Google ecosystem |
| [PlanetScale](#planetscale) | MySQL | Serverless MySQL |
| [Neon](#neon) | PostgreSQL | Serverless Postgres |

---

## Convex

[Convex](https://convex.dev) is a reactive backend with real-time sync.

### Installation

```bash
# Web app
cd apps/web
npm install convex

# Mobile app
cd apps/mobile
npm install convex react-native-get-random-values
```

### Setup

1. **Create Convex project:**
   ```bash
   npx convex dev
   ```

2. **Replace `lib/supabase.ts` with `lib/convex.ts`:**

```typescript
// apps/web/src/lib/convex.ts
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

export { convex, ConvexProvider };
```

3. **Update auth store** to use Convex Auth (or Clerk integration).

4. **Environment variables:**
   ```env
   VITE_CONVEX_URL=https://your-project.convex.cloud
   ```

### Key Differences
- Schema defined in `convex/schema.ts` (TypeScript)
- Queries/mutations are functions, not SQL
- Automatic real-time sync built-in

---

## Vercel Postgres

[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) is PostgreSQL hosted on Vercel.

### Installation

```bash
cd apps/web
npm install @vercel/postgres
```

### Setup

1. **Create database** in Vercel dashboard.

2. **Create `lib/db.ts`:**

```typescript
// apps/web/src/lib/db.ts
import { sql } from '@vercel/postgres';

export async function getUser(id: string) {
  const { rows } = await sql`SELECT * FROM users WHERE id = ${id}`;
  return rows[0];
}
```

3. **Environment variables** (auto-set by Vercel):
   ```env
   POSTGRES_URL=postgres://...
   ```

### Auth Options
- Use [Auth.js](https://authjs.dev) (NextAuth) with Vercel Postgres adapter
- Or keep Supabase Auth with Vercel Postgres for data

---

## Firebase

[Firebase](https://firebase.google.com) provides NoSQL (Firestore) + Auth.

### Installation

```bash
# Web
cd apps/web
npm install firebase

# Mobile
cd apps/mobile
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

### Setup

1. **Create `lib/firebase.ts`:**

```typescript
// apps/web/src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

2. **Update auth store:**

```typescript
// Replace Supabase auth with Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

signIn: async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return { error: null };
}
```

---

## PlanetScale

[PlanetScale](https://planetscale.com) is serverless MySQL.

### Installation

```bash
cd apps/web
npm install @planetscale/database
```

### Setup

```typescript
// apps/web/src/lib/db.ts
import { connect } from '@planetscale/database';

const conn = connect({
  url: import.meta.env.DATABASE_URL
});

export async function query<T>(sql: string, args?: any[]): Promise<T[]> {
  const results = await conn.execute(sql, args);
  return results.rows as T[];
}
```

---

## Neon

[Neon](https://neon.tech) is serverless PostgreSQL.

### Installation

```bash
cd apps/web
npm install @neondatabase/serverless
```

### Setup

```typescript
// apps/web/src/lib/db.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.DATABASE_URL);

export async function getUsers() {
  const users = await sql`SELECT * FROM users`;
  return users;
}
```

---

## Migration Checklist

When switching from Supabase:

- [ ] Install new database package
- [ ] Create new `lib/db.ts` or equivalent
- [ ] Update auth store (`stores/authStore.ts`)
- [ ] Update environment variables
- [ ] Migrate data if needed
- [ ] Update any Row Level Security to new provider's equivalent
- [ ] Test auth flow (login, register, logout)
- [ ] Test data queries

---

## Auth Alternatives

If you only need auth (not a full database):

| Provider | Installation |
|----------|-------------|
| [Clerk](https://clerk.com) | `npm install @clerk/clerk-react` |
| [Auth0](https://auth0.com) | `npm install @auth0/auth0-react` |
| [Lucia](https://lucia-auth.com) | `npm install lucia` |

---

## Questions?

- Open an issue on [GitHub](https://github.com/willbnu/Product-Blueprint/issues)
- Check the [Discussions](https://github.com/willbnu/Product-Blueprint/discussions)
