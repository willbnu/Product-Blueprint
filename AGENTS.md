# AGENTS.md - AI Coding Agent Guide

**Welcome, AI coding agents!** This file provides context and instructions for working on the Product-Blueprint project.

---

## Project Overview

**Product-Blueprint** is a comprehensive architectural blueprint for building production-ready full-stack applications. It combines:

- **Documentation-First Approach**: PRD templates, architecture guides, security implementation patterns
- **Enterprise Compliance**: Structured audit logging, error categorization, security event tracking
- **Best Practices**: Security checklist, development workflows, deployment guides

**Current Version**: v0.1.0 (Documentation release)

**License**: MIT License
**Copyright**: William Finger (implementation)

---

## Development Environment

### Prerequisites

```bash
# Check Node.js version (must be v20 or higher)
node --version  # Should be v20.x.x

# Verify nvm configuration (if using nvm)
cat .nvmrc  # Shows: v20
```

### Setup

```bash
# Install dependencies
npm install

# Verify installation
npm run docs:build
```

### Key Technologies

- **Node.js v20**: JavaScript runtime
- **Git**: Version control with branch naming conventions
- **Claude Code Plugins Plus**: 253 production-ready plugins for enhanced development workflows
- **MCP Servers**: Model-Context-Protocol servers for browser automation, debugging, and extended capabilities

---

## Claude Code Plugins Plus Integration

### What is Claude Code Plugins Plus?

**Claude Code Plugins Plus** is a comprehensive marketplace containing **253 production-ready plugins** designed to extend Claude Code's capabilities for end-to-end development. All plugins are 100% compliant with Anthropic's 2025 Skills schema.

**Key Benefits:**
- **Automatic Skill Activation**: Natural language triggers activate relevant workflows without explicit commands
- **Comprehensive Coverage**: AI/ML, Database, Security, Testing, DevOps, Performance domains
- **Tool Permissions System**: Transparent declarations of what each skill can access and modify
- **Version Tracking**: Semantic versioning for professional skill management

**Repository**: https://github.com/jeremylongshore/claude-code-plugins-plus
**Website**: https://claudecodeplugins.io

### Installation & Setup

#### 1. Add the Marketplace

```bash
/plugin marketplace add jeremylongshore/claude-code-plugins
```

#### 2. Install Core Development Packs

```bash
# DevOps automation (20 commands: Git, CI/CD, Docker, Kubernetes, Terraform)
/plugin install devops-automation-pack@claude-code-plugins-plus

# Full-stack development workflows
/plugin install fullstack-starter-pack@claude-code-plugins-plus

# Security analysis and vulnerability scanning
/plugin install security-pro-pack@claude-code-plugins-plus

# AI/ML engineering workflows
/plugin install ai-ml-engineering-pack@claude-code-plugins-plus
```

#### 3. Install Essential Utility Plugins

```bash
# Comprehensive codebase analysis
/plugin install project-health-auditor@claude-code-plugins-plus

# AI-powered conventional commit messages
/plugin install git-commit-smart@claude-code-plugins-plus

# REST API debugging with OpenAPI specs
/plugin install conversational-api-debugger@claude-code-plugins-plus
```

### Available Commands for End-to-End Development

#### Code Analysis & Health
```bash
# Comprehensive codebase analysis (complexity, churn, coverage gaps)
/analyze /path/to/repo

# REST API debugging with guided workflows
/debug-api
```

#### Git Workflow
```bash
# Generate AI-powered conventional commit messages
/gc
```

#### DevOps Tasks
The DevOps pack includes 20 commands for:
- Git workflow automation and branching strategies
- CI/CD pipeline design and optimization
- Docker containerization guidance
- Kubernetes cluster management patterns
- Terraform infrastructure-as-code templates
- Deployment automation workflows

#### Plugin Management
```bash
# Auto-scaffold new plugins with proper structure
/create a plugin

# Validate plugin structure and compliance
/validate this plugin
```

### Automatic Skill Activation

**Agent Skills** activate automatically based on conversation context. Instead of explicit commands, use natural language:

| Trigger Phrase | Auto-Activated Skill |
|----------------|---------------------|
| "create an Ansible playbook" | DevOps automation workflow |
| "backup my database" | Database backup procedures |
| "scan for vulnerabilities" | Security analysis |
| "optimize this query" | Database performance tuning |
| "debug this API endpoint" | API debugger with specs |

### Integration with Product-Blueprint

#### Configuration (.claude/settings.json)

Store team-wide plugin preferences:

```json
{
  "enabledPlugins": {
    "project-health-auditor@claude-code-plugins-plus": true,
    "devops-automation-pack@claude-code-plugins-plus": true,
    "git-commit-smart@claude-code-plugins-plus": true,
    "security-pro-pack@claude-code-plugins-plus": true
  }
}
```

#### Best Practices for AI Agents

1. **Use Natural Language**: Say "create a Dockerfile for this Node.js app" instead of searching for Docker commands
2. **Leverage Auto-Activation**: Skills trigger automatically when context matches
3. **Check Tool Permissions**: Read-only skills use Read/Grep/Glob, editing skills include Write/Edit
4. **Reference Documentation**: All plugins include comprehensive README files with examples

#### Plugin Categories Available

| Category | Plugin Count | Coverage |
|----------|--------------|----------|
| AI/ML Engineering | 27 | 100% |
| Database Management | 25 | 100% |
| Security & Compliance | 27 | 100% |
| Testing & QA | 25 | 100% |
| DevOps & Infrastructure | 29 | 96.6% |
| Performance Optimization | 25 | 96% |

### Example Workflow: End-to-End Feature Development

```bash
# 1. Analyze current codebase health
/analyze /home/user/Product-Blueprint

# 2. Create feature branch (follows naming convention)
git checkout -b claude/new-feature-<session-id>

# 3. Implement feature (use natural language to trigger skills)
# Say: "create REST API endpoint with authentication"
# Agent Skills automatically apply relevant patterns

# 4. Generate smart commit message
/gc

# 5. Run security scan before pushing
# Say: "scan for security vulnerabilities"

# 6. Push to remote
git push -u origin claude/new-feature-<session-id>

# 7. Create PR with comprehensive analysis
gh pr create --title "feat: new feature" --body "Generated by workflow"
```

### MCP Tools Integration

Five executable plugins provide real code execution:
- **Project Analysis**: Codebase metrics and health scoring
- **API Debugging**: HTTP log analysis with OpenAPI validation
- **Knowledge Bases**: Context-aware documentation search
- **Design Conversion**: Figma/mockup to code translation
- **Workflow Orchestration**: Multi-step automation pipelines

### Resources

- **Marketplace**: https://claudecodeplugins.io
- **GitHub Repository**: https://github.com/jeremylongshore/claude-code-plugins-plus
- **Schema Specification**: SKILLS_SCHEMA_2025.md
- **Activation Guide**: SKILL_ACTIVATION_GUIDE.md
- **Security Guidelines**: USER_SECURITY_GUIDE.md

---

## MCP Server Integration

### What are MCP Servers?

**Model-Context-Protocol (MCP)** servers extend AI agent capabilities by providing specialized tools and integrations. MCP servers enable AI agents to interact with external systems, browsers, databases, APIs, and development tools beyond basic code editing.

**Key Benefits:**
- **Extended Capabilities**: Access browser automation, performance analysis, network inspection, and more
- **Real-Time Interaction**: Control live browser instances and inspect application state
- **Standardized Protocol**: Works across multiple AI assistants (Claude, Gemini, Cursor, Copilot)
- **Secure Integration**: Controlled access to system resources with explicit tool permissions

### Chrome DevTools MCP

**Chrome DevTools MCP** is an official Google MCP server that empowers AI agents to control and inspect live Chrome browser instances for automation, debugging, and performance analysis.

**Repository**: https://github.com/ChromeDevTools/chrome-devtools-mcp

#### Core Capabilities (26 Tools)

**Input Automation (8 tools):**
- Click elements, drag and drop
- Fill forms and handle dialogs
- Hover actions and key presses
- File uploads for complete browser interaction

**Navigation (6 tools):**
- Create and manage pages/tabs
- Navigate URLs and wait for conditions
- List active pages and close tabs
- Complete tab lifecycle management

**Emulation (2 tools):**
- Resize viewports for responsive testing
- Emulate different devices (mobile, tablet, desktop)

**Performance (3 tools):**
- Record Chrome DevTools traces
- Analyze performance insights
- Extract actionable metrics (LCP, FCP, CLS, etc.)

**Network (2 tools):**
- Inspect network requests
- Retrieve detailed request/response data

**Debugging (5 tools):**
- Take screenshots for visual validation
- Create DOM snapshots
- Evaluate JavaScript in page context
- Monitor console messages

#### Installation & Configuration

**For Claude Code**, add to your MCP configuration:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

**Configuration Options:**

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless",        // Run without UI (optional)
        "--isolated",        // Use temporary profile, auto-cleaned on close
        "--channel=stable",  // Chrome version (stable/canary/beta/dev)
        "--viewport=1280x720" // Set initial viewport size
      ]
    }
  }
}
```

**Advanced Options:**
- `--browserUrl`: Connect to existing Chrome instance (workaround for sandbox limitations)
- `--wsEndpoint`: Direct WebSocket connection with auth headers
- `--proxyServer`: Configure proxy for Chrome
- `--categoryPerformance/Network/Emulation`: Toggle specific tool categories

#### Requirements

- **Node.js**: v20.19+ (LTS recommended)
- **Chrome**: Stable or newer
- **npm**: Latest version

#### Usage Examples for AI Agents

**Performance Analysis:**
```
User: "Check the performance of https://example.com"

Agent automatically:
1. Opens Chrome browser
2. Navigates to URL
3. Records performance trace
4. Analyzes metrics (LCP, FCP, CLS, TBT)
5. Provides actionable insights
```

**UI Testing:**
```
User: "Test the login form on staging site"

Agent automatically:
1. Navigates to staging URL
2. Fills username and password fields
3. Clicks submit button
4. Takes screenshot of result
5. Validates success/error state
```

**Responsive Design Testing:**
```
User: "Check mobile layout of our homepage"

Agent automatically:
1. Emulates iPhone 12 Pro
2. Navigates to homepage
3. Takes screenshot
4. Reports layout issues
5. Tests different device profiles
```

**Network Debugging:**
```
User: "Why is the API call failing?"

Agent automatically:
1. Opens browser with network monitoring
2. Reproduces the action
3. Inspects failed requests
4. Analyzes headers, status codes, payloads
5. Identifies root cause
```

**JavaScript Console Debugging:**
```
User: "Check for console errors on this page"

Agent automatically:
1. Opens page with console monitoring
2. Collects all console messages
3. Filters errors and warnings
4. Reports issues with context
```

#### Security Considerations

**IMPORTANT:** Chrome DevTools MCP exposes browser content to AI agents.

**Security Best Practices:**
1. **Avoid Sensitive Sites**: Don't browse sensitive data while MCP is connected
2. **Use Isolated Profiles**: Enable `--isolated` flag for temporary, auto-cleared profiles
3. **Review Shared Data**: All page content, DevTools info, and network details are shared with AI
4. **Secure Connections**: Use `--wsEndpoint` with auth headers for remote connections
5. **Sandbox Workarounds**: Use `--browserUrl` to connect to manually-started Chrome if needed

**Data Directory:**
- Default: `~/.cache/chrome-devtools-mcp/` (persistent profiles)
- Isolated: Temporary profiles auto-cleaned on close

#### Common Use Cases

| Task | MCP Tools Used | Benefit |
|------|----------------|---------|
| Performance auditing | Navigate, Record trace, Analyze | Automated Lighthouse-like insights |
| E2E testing | Click, Fill, Screenshot, Evaluate | Visual test automation |
| Debugging | Console, Network, DOM snapshot | Real-time issue diagnosis |
| Responsive QA | Emulate device, Screenshot | Multi-device validation |
| API testing | Navigate, Network inspect | Request/response analysis |

#### Integration with Development Workflow

```bash
# Example: Debug production issue
# Agent can now:

# 1. Open production URL
# 2. Reproduce user action
# 3. Capture network trace
# 4. Take screenshot of error
# 5. Analyze console logs
# 6. Identify failing API call
# 7. Suggest fix based on response data

# All automatically via natural language:
"Debug the checkout flow on production - users report payment failing"
```

#### Troubleshooting

**Issue: Chrome won't launch**
- **Cause**: MCP client sandbox restrictions
- **Solution**: Use `--browserUrl` to connect to manually-started Chrome:
  ```bash
  # Terminal 1: Start Chrome with remote debugging
  google-chrome --remote-debugging-port=9222

  # MCP config: Connect to existing instance
  "args": [..., "--browserUrl=http://localhost:9222"]
  ```

**Issue: Tools not appearing**
- **Cause**: Category disabled or Node.js version too old
- **Solution**: Check Node.js version (v20.19+) and enable categories:
  ```bash
  "args": [..., "--categoryPerformance", "--categoryNetwork"]
  ```

#### Resources

- **GitHub Repository**: https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Tool Reference**: `/docs/tool-reference.md`
- **Troubleshooting Guide**: `/docs/troubleshooting.md`
- **Changelog**: `/CHANGELOG.md`

### Adding More MCP Servers

MCP servers can be added for various capabilities:

**Database Integration:**
- PostgreSQL MCP for database queries
- MongoDB MCP for document operations
- Redis MCP for caching operations

**Development Tools:**
- Git MCP for advanced repository operations
- Docker MCP for container management
- Kubernetes MCP for cluster operations

**API Integration:**
- Slack MCP for team notifications
- GitHub MCP for issue/PR management
- Jira MCP for project tracking

**Configuration Pattern:**

```json
{
  "mcpServers": {
    "chrome-devtools": { "command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"] },
    "postgres": { "command": "npx", "args": ["-y", "postgres-mcp"] },
    "docker": { "command": "npx", "args": ["-y", "docker-mcp"] }
  }
}
```

---



---

## Pull Request Guidelines

### Branch Naming Convention

**CRITICAL**: Branch names must follow this pattern:
```
claude/<description>-<session-id>
```

**Example**: `claude/audit-app-template-01TgLdejKAri3hnuYLVScBPx`

**Why**: Git push authentication requires this format. Branches without `claude/` prefix and matching session ID will fail with 403 error.

### Commit Message Format

```bash
# Format: <type>: <description>
#
# Types:
#   feat:     New feature
#   fix:      Bug fix
#   docs:     Documentation changes
#   chore:    Maintenance (dependency updates, etc.)
#   refactor: Code refactoring
#   test:     Test additions/changes
#   security: Security improvements

# Examples:


git commit -m "docs: add comprehensive AGENTS.md for AI agent guidance"

```

### Pre-Push Checklist

```bash


# 2. Check git status
git status

# 3. Commit with proper message format
git add .
git commit -m "type: description"

# 4. Push to correct branch (use -u flag)
git push -u origin claude/<description>-<session-id>
```





### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview, quick start, architecture |
| `CHANGELOG.md` | Blueprint version history |
| `docs/APP_CHANGELOG_TEMPLATE.md` | Comprehensive changelog template for apps built from blueprint |
| `ARCHITECTURE.md` | System design decisions |
| `SECURITY.md` | Security policy and reporting |
| `CONTRIBUTING.md` | Contribution guidelines + CLA |

### Legal/IP Files

| File | Purpose |
|------|---------|
| `COPYRIGHT` | Ownership declaration (William Finger + third-party attributions) |
| `NOTICE` | Third-party attributions + CLA terms |
| `LICENSE` | MIT License text |



### Configuration Files

| File | Purpose |
|------|---------|
| `.nvmrc` | Node.js version (v20) |
| `.gitignore` | Git ignore patterns |
| `package.json` | Project metadata, npm scripts |

---

## Common Tasks



### Task 4: Create a Pull Request

```bash
# 1. Ensure all changes are committed
git status

# 2. Push to remote
git push -u origin claude/<description>-<session-id>

# 3. Use gh CLI to create PR (if available)
gh pr create --title "feat: [description]" --body "$(cat <<'EOF'
## Summary
- [Bullet point 1]
- [Bullet point 2]

## Test plan


- [ ] Checked for errors
EOF
)"

# 4. If gh CLI not available, inform user to create PR manually
```

---

## Security Considerations







---

## Troubleshooting



### Issue: Git push fails with 403

**Cause**: Branch name doesn't match required format.

**Solution**:
```bash
# Check current branch
git branch --show-current

# If not matching claude/<description>-<session-id>, create correct branch
git checkout -b claude/fix-issue-<session-id>
git cherry-pick <commit-hash>
git push -u origin claude/fix-issue-<session-id>
```



### Issue: npm version command fails

**Cause**: `npm version` creates commit and tag automatically.

**Solution**: Stage CHANGELOG.md first, then run `npm version`:
```bash
git add CHANGELOG.md
npm version minor -m "chore: release v%s"
git push origin main --tags
```

---

## Version History Context



### v0.1.0 - 2025-11-16
**INITIAL BLUEPRINT RELEASE**

Documentation-only release:
- Audit logging documentation
- Error handling patterns
- Security checklist

### v0.0.4 - 2025-11-16
Added code-first quick start option

### v0.0.3 - 2025-11-16
Complete security implementation guide

### v0.0.2 - 2025-11-15
PRD system documentation

### v0.0.1 - 2025-11-15
Initial comprehensive documentation

---

## Resources

- **Keep a Changelog**: https://keepachangelog.com/
- **Semantic Versioning**: https://semver.org/
- **Conventional Commits**: https://www.conventionalcommits.org/

---

## Questions or Issues?

For AI agents encountering problems:

1. **Check git status and branch name**: Must match `claude/<description>-<session-id>`
2. **Inform user**: Provide clear error description and suggested solutions

---

**Built with Product-Blueprint**
*This AGENTS.md file follows the agents.md specification for AI coding agent guidance.*
