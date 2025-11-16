# Documentation Site

This is the VitePress-powered documentation website for the Product-Blueprint.

## 🎯 Architecture

This VitePress site uses the **existing markdown files as the single source of truth**. It does NOT duplicate documentation content.

### How It Works

```
project/
├── docs/                     # Source documentation
│   ├── paths/
│   ├── MOBILE.md
│   ├── WEB.md
│   └── ...
├── README.md                 # Source file
├── GETTING_STARTED.md       # Source file
├── ARCHITECTURE.md          # Source file
└── docs-site/
    ├── .vitepress/
    │   └── config.ts        # Configured with srcDir: '../'
    ├── index.md             # VitePress landing page only
    └── package.json
```

**Key Configuration:**
```typescript
// docs-site/.vitepress/config.ts
export default defineConfig({
  srcDir: '../',  // Use parent directory as source
  // ... VitePress reads existing markdown files
})
```

## 🚀 Quick Start

### Prerequisites

- Node.js v20+
- pnpm 8+

### Development

```bash
# Install dependencies (one-time setup)
cd docs-site
pnpm install

# Start development server
cd ..  # back to root
npm run docs:dev

# Or from docs-site directory:
pnpm docs:dev

# The site will be available at http://localhost:5173
```

### Building

```bash
# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## 📁 What's in docs-site/

This directory contains **ONLY** VitePress-specific files:

- ✅ `.vitepress/config.ts` - VitePress configuration
- ✅ `index.md` - VitePress landing page (separate from README.md)
- ✅ `package.json` - VitePress dependencies
- ✅ `README.md` - This file
- ❌ **NO duplicate documentation** - all docs are in the root and docs/ directories

## 🔗 How Links Work

VitePress reads markdown files from the parent directory, so links are relative to the project root:

| File Location | VitePress URL | Link in Config |
|--------------|---------------|----------------|
| `/README.md` | `/README.html` | `link: '/README'` |
| `/GETTING_STARTED.md` | `/GETTING_STARTED.html` | `link: '/GETTING_STARTED'` |
| `/docs/paths/mobile-first-app.md` | `/docs/paths/mobile-first-app.html` | `link: '/docs/paths/mobile-first-app'` |
| `/docs-site/index.md` | `/docs-site/` | `link: '/docs-site/'` |

## ✏️ Editing Documentation

**To edit documentation:**

1. ✅ **DO:** Edit the source markdown files in the root and `docs/` directories
2. ❌ **DON'T:** Create markdown files in `docs-site/` (except `index.md` for the landing page)

**Examples:**
- Edit architecture docs: → `ARCHITECTURE.md` (root)
- Edit security docs: → `docs/SECURITY_IMPLEMENTATION.md`
- Edit paths: → `docs/paths/*.md`

VitePress will automatically pick up changes from these source files.

## 🎨 Features

- **Full-text search** - Search across all documentation
- **Dark mode** - Automatic dark/light theme
- **Mobile responsive** - Works on all devices
- **Mermaid diagrams** - Visual diagrams render beautifully
- **Code highlighting** - Syntax highlighting for all languages
- **Edit on GitHub** - Easy contributions
- **Single source of truth** - No duplicate content to maintain

## 📊 Benefits of This Architecture

✅ **No Duplication**: Single source of truth for all documentation
✅ **Easy Maintenance**: Update docs once, reflected everywhere
✅ **Consistency**: GitHub and VitePress show the same content
✅ **Git Workflow**: All docs versioned together
✅ **Simple Updates**: No need to sync between locations

## 🚀 Deployment

### GitHub Pages

The site can be deployed to GitHub Pages:

```yaml
# .github/workflows/deploy-docs.yml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: cd docs-site && pnpm install
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs-site/.vitepress/dist
```

### Netlify/Vercel

**Build command:** `cd docs-site && pnpm install && pnpm docs:build`

**Output directory:** `docs-site/.vitepress/dist`

**Root directory:** Leave as project root (so VitePress can access all markdown files)

## 📖 VitePress Documentation

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Extensions](https://vitepress.dev/guide/markdown)
- [Theme Configuration](https://vitepress.dev/reference/default-theme-config)

## 🤝 Contributing

To improve the documentation site configuration:

1. Make changes to `.vitepress/config.ts` or `index.md`
2. Test locally with `npm run docs:dev`
3. Build to ensure no errors: `npm run docs:build`
4. Submit a pull request

**To improve documentation content:**

1. Edit the source markdown files in `/` or `/docs/`
2. VitePress will automatically show your changes
3. Submit a pull request

---

**Built with [VitePress](https://vitepress.dev/)** ⚡️

**Architecture:** Single source of truth - no duplicate documentation! 🎯
