# Release v0.1.2 - Documentation Integrity & Developer Tooling

## 🎯 Overview
This release adds critical infrastructure for documentation quality and developer productivity while maintaining the "zero bloat" philosophy.

## ✨ What's New

### Documentation Integrity System
- **Link Checker**: Automated tool to validate all markdown links (`tools/check-links.js`)
- **CI Integration**: GitHub Action that validates docs on every PR (`.github/workflows/docs-health.yml`)
- **Bug Fixes**: Fixed 20 broken documentation links across the repository

### Unified CLI
- **`bin/pb.js`**: Clean entry point for all command-line tools
- **Commands**:
  - `node bin/pb.js prd new <project-name>` - Scaffold new PRD structure
  - `node bin/pb.js docs check` - Validate documentation links
- **Backward Compatible**: Direct script usage still supported

### Database Schema Patterns
- **Production-Ready SQL**: Added `prd/schemas/` directory with hardened patterns
  - `auth.sql` - Supabase Auth integration with RLS policies
  - `audit_logs.sql` - Immutable compliance logging
  - `user_profiles.sql` - RBAC implementation

### Enhanced Documentation
- **Interactive Onboarding**: Role-based paths in `GETTING_STARTED.md` (PM, Frontend, Backend, Compliance)
- **Updated Analysis**: `ANALYSIS_SUMMARY.md` reflects repository improvements (rating: 9.2/10)

## 📊 Repository Quality
- **46 markdown files** validated for link integrity
- **3 SQL schema patterns** for rapid backend setup
- **Zero dependencies** added for new tooling

## 🚀 Quick Start
```bash
# Scaffold a new PRD
node bin/pb.js prd new my-awesome-app

# Validate documentation
node bin/pb.js docs check
```

## 🔗 Related
- Removed TOON system (simplified to v0.1.0 base)
- Strategic improvements from v0.1.1 included

---
**Full Changelog**: Compare v0.1.0...v0.1.2
