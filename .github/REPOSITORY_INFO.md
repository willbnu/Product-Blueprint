# Repository Information

This file contains information for updating the GitHub repository settings.

## About Section

**Description:**
```
Production-ready full-stack app template with PRD-first workflow. Mobile (Expo) + Web (React/Vite) + Backend (Supabase). Start with Product Requirements, build with confidence.
```

**Topics/Tags:**
```
app-template
monorepo
expo
react-native
react
vite
supabase
nx
typescript
prd
product-requirements
mobile-development
web-development
full-stack
cross-platform
tailwind-css
tanstack-query
zustand
```

**Website:**
```
https://github.com/YOUR-ORG/YOUR-REPO
```

## Repository Settings to Update

### General Settings

**Template repository:** ✅ Enable
- This allows others to create new repositories from this template

**Features:**
- ✅ Issues
- ✅ Projects
- ✅ Discussions (recommended for PRD collaboration)
- ✅ Wiki (optional)

**Pull Requests:**
- ✅ Allow squash merging
- ✅ Allow auto-merge
- ✅ Automatically delete head branches

### Branch Protection Rules (for main)

**Protect matching branches:**

**Pull Request Requirements:**
- Require a pull request before merging
- Require approvals: **2** (increased for security)
- Dismiss stale pull request approvals when new commits are pushed
- Require review from Code Owners (if CODEOWNERS file exists)

**Status Checks:**
- Require status checks to pass before merging:
  - ✅ Lint
  - ✅ Test
  - ✅ Build
  - ✅ Security scan (Dependabot)
- Require branches to be up to date before merging

**Commit Signing:**
- ✅ Require signed commits (recommended for production)
  ```bash
  # Setup GPG signing:
  git config --global commit.gpgsign true
  ```

**Additional Protections:**
- Require conversation resolution before merging
- Require linear history (no merge commits)
- Do not allow bypassing the above settings
- Restrict who can dismiss pull request reviews
- Restrict who can push to matching branches

**For Production Environments:**
- Create separate `production` branch
- Require 3+ approvals for production
- Restrict merge permissions to release managers only
- Enable deployment protections

### Code Security

**Dependabot:**
- ✅ Enable Dependabot alerts
- ✅ Enable Dependabot security updates
- ✅ Enable Dependabot version updates

**Code scanning:**
- ✅ Enable CodeQL analysis (optional)

## Social Preview

**Suggested preview image topics:**
- App template
- PRD-first workflow
- Cross-platform development
- Modern tech stack (Expo, React, Supabase, Nx)

**Dimensions:** 1280 x 640 pixels

## README Badge Suggestions

Current badges:
```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Nx](https://img.shields.io/badge/Nx-Monorepo-143055.svg)](https://nx.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_50+-000020.svg)](https://expo.dev/)
```

Additional badges to consider:
```markdown
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![GitHub Issues](https://img.shields.io/github/issues/YOUR-ORG/YOUR-REPO)](https://github.com/YOUR-ORG/YOUR-REPO/issues)
[![GitHub Stars](https://img.shields.io/github/stars/YOUR-ORG/YOUR-REPO)](https://github.com/YOUR-ORG/YOUR-REPO/stargazers)
```

## How to Update

### Via GitHub Web Interface

1. Go to repository settings
2. Update "About" section (top right of main page)
   - Add description
   - Add website
   - Add topics
3. Check "Template repository" box in General settings
4. Configure branch protection rules
5. Enable Dependabot

### Via GitHub CLI

```bash
# Update repository description
gh repo edit --description "Production-ready full-stack app template with PRD-first workflow"

# Add topics
gh repo edit --add-topic "app-template,monorepo,expo,react-native,react,vite,supabase,nx,typescript,prd"

# Enable template
gh api -X PATCH /repos/YOUR-ORG/YOUR-REPO -f is_template=true

# Enable features
gh api -X PATCH /repos/YOUR-ORG/YOUR-REPO -f has_issues=true -f has_discussions=true
```

## Recommended Repository Documentation Order

When users land on the repository, they should follow this path:

1. **README.md** - Overview and PRD-first workflow
2. **prd/README.md** - Complete PRD guide
3. **prd/templates/prd-template.md** - Copy and fill out
4. **prd/examples/todo-app-prd.md** - Reference example
5. **SETUP.md** - After PRD is done, setup development
6. **DEVELOPMENT.md** - Day-to-day development guide
7. **Other docs** - As needed during development

## Star This Repository!

Help others discover this template by starring the repository:
⭐ Click the "Star" button at the top of the page
