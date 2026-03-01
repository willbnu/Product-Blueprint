import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Product-Blueprint',
  description: 'Production-ready full-stack app template with comprehensive architectural documentation',

  // Ignore dead links - PRD templates reference example schemas that are placeholders
  ignoreDeadLinks: true,

  // Vite config to handle SSR properly - externalize vue packages
  vite: {
    ssr: {
      external: ['vue', 'vue/server-renderer']
    },
    build: {
      rollupOptions: {
        external: ['vue', 'vue/server-renderer']
      }
    }
  },

  // Use parent directory as source - this allows VitePress to read existing markdown files
  srcDir: '../',
  // Exclude node_modules and other non-documentation directories
  srcExclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.git/**',
    '**/tools/**',
    '**/.toon/**',
    '**/ANALYSIS_SUMMARY.md',
    '**/CHANGELOG.md',
    '**/apps/**',
    '**/libs/**',
    '**/.github/**',
    '**/.idx/**',
    '**/.antigravity/**',
    '**/.claude/**',
    '**/AGENTS.md',
    '**/CODE_OF_CONDUCT.md',
    '**/SECURITY.md',
    '**/LICENSE*',
    '**/COPYRIGHT*',
    '**/NOTICE*',
    '**/CONTRIBUTING.md',
  ],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Product-Blueprint' }],
    ['meta', { name: 'og:description', content: 'Production-ready full-stack app template' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/docs-site/' },
      { text: 'Getting Started', link: '/GETTING_STARTED' },
      { text: 'Documentation Paths', link: '/docs/paths/' },
      { text: 'Architecture', link: '/ARCHITECTURE' },
      { text: 'GitHub', link: 'https://github.com/willbnu/Product-Blueprint' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/README' },
            { text: 'Getting Started', link: '/GETTING_STARTED' },
            { text: 'Template Usage', link: '/TEMPLATE_USAGE' },
            { text: 'Setup Guide', link: '/SETUP' },
            { text: 'Choose Your Path', link: '/docs/paths/' },
          ]
        },
        {
          text: 'Documentation Paths',
          items: [
            { text: 'Overview', link: '/docs/paths/' },
            { text: '📱 Mobile-First', link: '/docs/paths/mobile-first-app' },
            { text: '🌐 Web-First', link: '/docs/paths/web-first-app' },
            { text: '🚀 Full-Stack', link: '/docs/paths/full-stack-app' },
            { text: '🏥 Compliance-Heavy', link: '/docs/paths/compliance-heavy-app' },
            { text: '⚡ Quick MVP', link: '/docs/paths/quick-mvp' },
          ]
        },
        {
          text: 'Architecture & Design',
          items: [
            { text: 'Architecture Overview', link: '/ARCHITECTURE' },
            { text: 'Libraries', link: '/docs/LIBRARIES' },
            { text: 'Environment Variables', link: '/docs/ENVIRONMENT' },
          ]
        },
        {
          text: 'Platform Guides',
          items: [
            { text: 'Mobile Development', link: '/docs/MOBILE' },
            { text: 'Web Development', link: '/docs/WEB' },
            { text: 'Backend (Supabase)', link: '/docs/BACKEND' },
            { text: 'API Design', link: '/docs/API' },
          ]
        },
        {
          text: 'Security & Quality',
          items: [
            { text: 'Security Implementation', link: '/docs/SECURITY_IMPLEMENTATION' },
            { text: 'Testing Strategy', link: '/TESTING' },
            { text: 'CI/CD Pipelines', link: '/docs/CICD' },
          ]
        },
        {
          text: 'PRD System',
          items: [
            { text: 'PRD Workflow', link: '/prd/' },
            { text: 'PRD Template', link: '/prd/templates/prd-template' },
            { text: 'Example: Todo App', link: '/prd/examples/todo-app-prd' },
          ]
        },
        {
          text: 'Design System',
          items: [
            { text: 'Overview', link: '/design-system/' },
            { text: 'Web Interface Guidelines', link: '/design-system/WEB_INTERFACE_GUIDELINES' },
            { text: 'Design Tokens', link: '/design-system/DESIGN_TOKENS' },
            { text: 'Figma Integration', link: '/design-system/FIGMA' },
            { text: 'Workflow', link: '/design-system/WORKFLOW' },
          ]
        },
        {
          text: 'Operations',
          items: [
            { text: 'Development Guide', link: '/DEVELOPMENT' },
            { text: 'Deployment', link: '/DEPLOYMENT' },
            { text: 'Troubleshooting', link: '/TROUBLESHOOTING' },
          ]
        },
        {
          text: 'Contributing',
          items: [
            { text: 'Contributing Guidelines', link: '/CONTRIBUTING' },
            { text: 'Code of Conduct', link: '/CODE_OF_CONDUCT' },
            { text: 'Security Policy', link: '/SECURITY' },
            { text: 'Roadmap', link: '/ROADMAP' },
            { text: 'Changelog', link: '/CHANGELOG' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/willbnu/Product-Blueprint' }
    ],

    footer: {
      message: 'Proprietary Software - All Rights Reserved',
      copyright: 'Copyright © 2025-2026 William Finger'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/willbnu/Product-Blueprint/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
