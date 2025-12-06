# 🚀 Getting Started

**Welcome to the Product-Blueprint.** This template is designed to adapt to your role.
Select your persona below to jump to your tailored path.

---

## 👤 Who are you?

### [👩‍💼 Product Manager](#-path-product-manager)
*Focus: Requirements, User Stories, Planning*
### [👨‍💻 Frontend Developer](#-path-frontend-developer)
*Focus: UI/UX, Mobile (Expo), Web (React), Design System*
### [⚙️ Backend Developer](#-path-backend-developer)
*Focus: Database (Supabase), API, Security, Performance*
### [🛡️ Compliance Officer](#-path-compliance-officer)
*Focus: Audit Logs, Security Policies, Risk Management*

---

## 👩‍💼 Path: Product Manager
**Goal**: Define *what* to build before writing code.

1.  **Understand the Workflow**: Read the [PRD-First Workflow Guide](./prd/README.md).
2.  **Scaffold a New Project**:
    *   (Coming soon) Run `node tools/scaffold-prd.js "my-new-app"` to auto-generate templates.
    *   Or copy `prd/templates/` manually.
3.  **Draft the Main Documents**:
    *   `00-product-brief.md`: The elevator pitch.
    *   `01-user-stories.md`: "As a user, I want to..."
4.  **Review & Sign-off**: Use GitHub Pull Requests to get approval on the *docs* first.

---

## 👨‍💻 Path: Frontend Developer
**Goal**: Build pixel-perfect, accessible interfaces.

1.  **Setup Environment**: Follow [SETUP.md](./SETUP.md) to install Node.js v20+, pnpm, and Expo Go.
2.  **Explore the Design System**:
    *   Read [FIGMA.md](./design-system/FIGMA.md) for design tokens.
    *   Check `libs/@app/shared-ui` for reusable components.
3.  **Start the Dev Servers**:
    ```bash
    pnpm dev:mobile  # iOS/Android
    pnpm dev:web     # React Web
    ```
4.  **Development Workflow**:
    *   Read [MOBILE.md](./docs/MOBILE.md) for Expo specific patterns.
    *   Read [WEB.md](./docs/WEB.md) for Vite/React patterns.

---

## ⚙️ Path: Backend Developer
**Goal**: Architect a secure, scalable data layer.

1.  **Database & Auth Setup**:
    *   Read [BACKEND.md](./docs/BACKEND.md) for Supabase architecture.
    *   **NEW**: Use the **Pre-built Schema Patterns**:
        *   [`auth.sql`](./prd/schemas/auth.sql) - Users & Profiles linked to Supabase Auth.
        *   [`audit_logs.sql`](./prd/schemas/audit_logs.sql) - Immutable logs structure.
        *   [`user_profiles.sql`](./prd/schemas/user_profiles.sql) - RBAC roles setup.
2.  **API Strategy**:
    *   We use Supabase "Row Level Security" (RLS) instead of a traditional backend API middleware.
    *   Read [SECURITY_IMPLEMENTATION.md](./docs/SECURITY_IMPLEMENTATION.md) for RLS best practices.
3.  **Local Dev**:
    ```bash
    pnpm supabase:start
    pnpm db:migrate
    ```

---

## 🛡️ Path: Compliance Officer
**Goal**: Ensure security, privacy, and auditability.

1.  **Security Review**:
    *   Review [SECURITY.md](./SECURITY.md) for the incident response policy.
    *   Validate the [RBAC Schema](./prd/schemas/user_profiles.sql).
2.  **Audit Logging**:
    *   Ensure the [`audit_logs.sql`](./prd/schemas/audit_logs.sql) pattern is deployed.
    *   Verify "No Delete" policies are active in RLS.
3.  **Code Governance**:
    *   Check [CONTRIBUTING.md](./CONTRIBUTING.md) for code review standards.
    *   Ensure CI/CD enforces linting and testing ([CICD.md](./docs/CICD.md)).

---

## ⚡ Quick Links
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: The 10,000ft view.
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**: Solutions to common problems.
- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: How to go to production.

---
*Built with Product-Blueprint v2.0.0*
