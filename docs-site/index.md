---
layout: home

hero:
  name: Product
  text: Blueprint
  tagline: Production-ready full-stack app template with comprehensive architectural documentation for Expo (mobile) and React (web)
  image:
    src: /logo.svg
    alt: Product-Blueprint
  actions:
    - theme: brand
      text: Get Started
      link: /GETTING_STARTED
    - theme: alt
      text: Choose Your Path
      link: /docs/paths/
    - theme: alt
      text: View on GitHub
      link: https://github.com/willbnu/Product-Blueprint

features:
  - icon: 📱
    title: Cross-Platform Ready
    details: Build for iOS, Android, and web from a single codebase with Expo and React
    link: /ARCHITECTURE

  - icon: 🔐
    title: Security-First
    details: Enterprise-grade security patterns with RLS, audit logging, and compliance guidance
    link: /docs/SECURITY_IMPLEMENTATION

  - icon: 📚
    title: Comprehensive Documentation
    details: 9,000+ lines of documentation covering architecture, security, testing, and deployment
    link: /ARCHITECTURE

  - icon: 🚀
    title: PRD-First Workflow
    details: Plan before you code with comprehensive PRD templates and examples
    link: /prd/

  - icon: 🎨
    title: Design System
    details: Token-based design system with Figma integration for consistent UX
    link: /design-system/

  - icon: 🧪
    title: Testing Strategies
    details: Complete testing guide with Jest, Testing Library, Playwright, and Detox
    link: /TESTING

  - icon: 📖
    title: Documentation Paths
    details: Guided journeys for mobile, web, full-stack, compliance, and MVP development
    link: /docs/paths/

  - icon: 🏥
    title: Compliance Ready
    details: HIPAA, GDPR, SOC 2, and PCI DSS compliance patterns and checklists
    link: /docs/SECURITY_IMPLEMENTATION

  - icon: ⚡
    title: Modern Tech Stack
    details: Expo, React, Vite, Supabase, Nx, TypeScript, and more
    link: /ARCHITECTURE
---

## 🎯 What is This?

This is an **architectural blueprint and documentation repository** that provides comprehensive guidance for building production-ready, full-stack applications.

**Currently (v0.1.0):** Documentation-only blueprint with patterns, best practices, and architectural guidance.

**Coming (v1.0.0):** Working code, runnable apps, and complete Nx workspace.

## 🚀 Quick Start

### 1. Create Your Repository

This is a **GitHub Template Repository**. Click "Use this template" to create your own repository:

[Create from Template →](https://github.com/willbnu/Product-Blueprint/generate)

### 2. Choose Your Path

Follow a guided documentation journey based on what you're building:

- [📱 Mobile-First Application](/docs/paths/mobile-first-app) - 3-4 weeks to MVP
- [🌐 Web-First Application](/docs/paths/web-first-app) - 2-3 weeks to MVP
- [🚀 Full-Stack Application](/docs/paths/full-stack-app) - 4-6 weeks to MVP
- [🏥 Compliance-Heavy Application](/docs/paths/compliance-heavy-app) - 5-8 weeks to MVP
- [⚡ Quick MVP](/docs/paths/quick-mvp) - 1-2 weeks to prototype

### 3. Build Your App

Use this blueprint's documentation as your reference guide while building.

## 🛠️ Tech Stack

### Frontend
- **Mobile:** Expo (SDK 50+) + React Native
- **Web:** React 18 + Vite 5
- **Styling:** NativeWind (mobile) + Tailwind CSS (web)
- **State:** Zustand + MMKV
- **Data:** TanStack Query v5

### Backend
- **Database:** Supabase (PostgreSQL 15+)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Serverless:** Edge Functions (Deno)
- **API:** tRPC

### DevOps
- **Monorepo:** Nx 18+
- **Package Manager:** pnpm 8+
- **CI/CD:** GitHub Actions

## 📚 Learn More

- [Getting Started Guide](/GETTING_STARTED)
- [Documentation Paths](/docs/paths/)
- [Architecture Overview](/ARCHITECTURE)
- [Security Implementation](/docs/SECURITY_IMPLEMENTATION)
- [PRD System](/prd/)

## 📄 License

Released under the [MIT License](https://github.com/willbnu/Product-Blueprint/blob/main/LICENSE).

Copyright © 2025 [William Finger](https://github.com/willbnu)
