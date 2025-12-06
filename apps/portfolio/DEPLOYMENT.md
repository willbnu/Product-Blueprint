# Deployment Guide

This guide covers deploying the Designer Portfolio to various platforms.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Built project (`npm run build`)

## Vercel (Recommended)

Vercel provides the best experience for Vite-based React apps.

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to portfolio
cd apps/portfolio

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push your repository to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Configure settings:
   - **Root Directory:** `apps/portfolio`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### vercel.json (Optional)

The repository includes a `vercel.json` configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## Netlify

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Navigate to portfolio
cd apps/portfolio

# Build the project
npm run build

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Option 2: Netlify Dashboard

1. Connect your GitHub repository
2. Configure build settings:
   - **Base directory:** `apps/portfolio`
   - **Build command:** `npm run build`
   - **Publish directory:** `apps/portfolio/dist`
3. Add environment variables in Site Settings
4. Deploy!

### netlify.toml

Create `netlify.toml` in `apps/portfolio/`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## GitHub Pages

### Setup

1. Add `base` to `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
});
```

2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'apps/portfolio/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: cd apps/portfolio && npm install

      - name: Build
        run: cd apps/portfolio && npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: apps/portfolio/dist
```

3. Enable GitHub Pages in repository settings (use `gh-pages` branch)

## Cloudflare Pages

### Setup

1. Connect your GitHub repository
2. Configure build settings:
   - **Root directory:** `apps/portfolio`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Add environment variables
4. Deploy!

### Workers Configuration

For SPA routing, create `_redirects` in `public/`:

```
/* /index.html 200
```

## AWS Amplify

### Setup

1. Connect your GitHub repository in AWS Amplify Console
2. Configure build settings:

```yaml
version: 1
applications:
  - appRoot: apps/portfolio
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
```

3. Add environment variables
4. Deploy!

## Docker

### Dockerfile

Create `Dockerfile` in `apps/portfolio/`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
cd apps/portfolio

# Build image
docker build -t portfolio .

# Run container
docker run -p 8080:80 portfolio
```

## Environment Variables

All platforms require these environment variables for full functionality:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Optional | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key |
| `VITE_GA_TRACKING_ID` | Optional | Google Analytics ID |

**Note:** The portfolio works without Supabase configuration (static mode).

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test contact form submission
- [ ] Check responsive design on mobile
- [ ] Verify animations work smoothly
- [ ] Test project detail pages
- [ ] Check console for errors
- [ ] Verify environment variables are set
- [ ] Test navigation and routing
- [ ] Check meta tags and SEO
- [ ] Validate SSL certificate

## Custom Domain

### Vercel
1. Go to project settings > Domains
2. Add your custom domain
3. Update DNS records

### Netlify
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS

### Cloudflare
1. Add domain in Cloudflare dashboard
2. Configure DNS settings
3. Enable SSL

## Troubleshooting

### 404 on Page Refresh
- Add proper SPA redirect rules (see platform-specific sections)
- Ensure `_redirects` or redirect configuration is in place

### Environment Variables Not Working
- Prefix all variables with `VITE_` for Vite apps
- Redeploy after adding/changing variables
- Check variable names match exactly

### Build Failures
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for TypeScript errors locally first

### Slow Initial Load
- Enable gzip/brotli compression
- Use a CDN for static assets
- Optimize images and fonts

---

**Need help?** Check the [Product-Blueprint issues](https://github.com/willbnu/Product-Blueprint/issues) or open a new issue.
