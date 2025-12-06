# Designer Portfolio

A stunning, modern portfolio website for Product Designers built with React, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Modern dark theme with gradient accents
- 🌟 Smooth animations and micro-interactions
- 📱 Fully responsive design
- ⚡ Lightning-fast with Vite
- 🎯 SEO optimized

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout
│   ├── sections/        # Hero, Projects, About, Contact
│   └── ui/              # Reusable UI components
├── pages/
│   ├── Home.tsx         # Landing page
│   └── CaseStudy.tsx    # Project detail page
├── data/
│   └── projects.ts      # Project data
└── index.css            # Global styles
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette:

```js
colors: {
  accent: {
    purple: '#a855f7',
    pink: '#ec4899',
    blue: '#3b82f6',
  }
}
```

### Projects
Edit `src/data/projects.ts` to add your own projects.

### Content
Update the text in:
- `Hero.tsx` - Main headline and subtitle
- `About.tsx` - Bio, skills, and stats
- `Contact.tsx` - Contact information

## 📦 Tech Stack

- **React 18** - UI Library
- **Vite 6** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Framer Motion** - Animations
- **React Router 7** - Routing
- **Lucide React** - Icons
- **React Hook Form** - Form handling

## 📄 License

MIT License
