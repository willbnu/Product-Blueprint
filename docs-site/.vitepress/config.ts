import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ChatGPT Workspace Blueprint',
  description: 'Production-ready full-stack app template with comprehensive architectural documentation',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'ChatGPT Workspace Blueprint' }],
    ['meta', { name: 'og:description', content: 'Production-ready full-stack app template' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Documentation Paths', link: '/paths/' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'GitHub', link: 'https://github.com/willbnu/ChatGPT-Workspace' }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started/' },
            { text: 'Template Usage', link: '/getting-started/template-usage' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Choose Your Path', link: '/paths/' },
          ]
        }
      ],

      '/paths/': [
        {
          text: 'Documentation Paths',
          items: [
            { text: 'Overview', link: '/paths/' },
            { text: '📱 Mobile-First', link: '/paths/mobile-first' },
            { text: '🌐 Web-First', link: '/paths/web-first' },
            { text: '🚀 Full-Stack', link: '/paths/full-stack' },
            { text: '🏥 Compliance-Heavy', link: '/paths/compliance-heavy' },
            { text: '⚡ Quick MVP', link: '/paths/quick-mvp' },
          ]
        }
      ],

      '/architecture/': [
        {
          text: 'Architecture & Design',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'System Architecture', link: '/architecture/system' },
            { text: 'Libraries', link: '/architecture/libraries' },
            { text: 'Tech Stack', link: '/architecture/tech-stack' },
          ]
        },
        {
          text: 'Platform Guides',
          items: [
            { text: 'Mobile Development', link: '/mobile/' },
            { text: 'Web Development', link: '/web/' },
            { text: 'Backend', link: '/backend/' },
          ]
        },
        {
          text: 'Security & Compliance',
          items: [
            { text: 'Security Implementation', link: '/security/' },
            { text: 'API Design', link: '/api/' },
          ]
        }
      ],

      '/prd/': [
        {
          text: 'PRD System',
          items: [
            { text: 'Overview', link: '/prd/' },
            { text: 'PRD Template', link: '/prd/template' },
            { text: 'Example: Todo App', link: '/prd/examples/todo-app' },
          ]
        }
      ],

      '/design-system/': [
        {
          text: 'Design System',
          items: [
            { text: 'Overview', link: '/design-system/' },
            { text: 'Design Tokens', link: '/design-system/tokens' },
            { text: 'Figma Integration', link: '/design-system/figma' },
            { text: 'Workflow', link: '/design-system/workflow' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/willbnu/ChatGPT-Workspace' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 William Finger'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/willbnu/ChatGPT-Workspace/edit/main/docs-site/:path',
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
