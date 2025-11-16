# Design System

**A scalable, cross-platform design system for mobile and web applications.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Structure](#structure)
- [Design Tokens](#design-tokens)
- [Figma Templates](#figma-templates)
- [Component Library](#component-library)
- [Workflow](#workflow)
- [Customization](#customization)

---

## Overview

This design system provides a **complete foundation** for building consistent, beautiful UIs across mobile and web platforms.

### What's Included

- ✅ **Design Tokens** - Colors, typography, spacing, shadows
- ✅ **Figma Templates** - Pre-built components and screens
- ✅ **Component Library** - React Native + Web components
- ✅ **Documentation** - Guidelines and best practices
- ✅ **Sync System** - Figma → Code token synchronization

### Key Principles

1. **Cross-Platform First** - Works on iOS, Android, and Web
2. **Token-Based** - Single source of truth for design values
3. **Accessible** - WCAG 2.1 AA compliant
4. **Themeable** - Dark/light mode built-in
5. **Scalable** - Easy to extend and customize

---

## Quick Start

### For Designers

```bash
# 1. Duplicate Figma Template
Visit: [Figma Template Link]
Click: "Duplicate to your drafts"

# 2. Customize for Your App
- Update brand colors
- Adjust typography
- Customize components
- Export design tokens

# 3. Share with Developers
Export tokens or share Figma link
```

### For Developers

```bash
# 1. Design tokens are already in the codebase
cd libs/@app/shared-ui/src/theme/

# 2. Customize tokens for your app
# Edit: colors.ts, typography.ts, spacing.ts

# 3. Use in components
import { colors, spacing } from '@app/shared-ui/theme';
```

---

## Structure

```
design-system/
├── README.md                    # This file
│
├── DESIGN_TOKENS.md            # Complete token reference
├── COMPONENTS.md               # Component library docs
├── FIGMA.md                    # Figma setup guide
├── WORKFLOW.md                 # Design-to-code process
├── GUIDELINES.md               # UI/UX best practices
│
├── figma/
│   ├── template-link.md        # Link to Figma template
│   ├── plugins.md              # Recommended Figma plugins
│   └── export-guide.md         # How to export from Figma
│
├── tokens/
│   ├── colors.json             # Exportable color tokens
│   ├── typography.json         # Typography tokens
│   ├── spacing.json            # Spacing scale
│   └── shadows.json            # Shadow/elevation tokens
│
└── components/
    ├── button.md               # Button documentation
    ├── input.md                # Input documentation
    ├── card.md                 # Card documentation
    └── ...                     # More components
```

---

## Design Tokens

**Design tokens** are the atomic values of your design system.

### Token Categories

| Category | Location | Platform |
|----------|----------|----------|
| **Colors** | `theme/colors.ts` | Mobile + Web |
| **Typography** | `theme/typography.ts` | Mobile + Web |
| **Spacing** | `theme/spacing.ts` | Mobile + Web |
| **Shadows** | `theme/shadows.ts` | Mobile + Web |
| **Borders** | `theme/borders.ts` | Mobile + Web |

### Example: Color Tokens

```typescript
// libs/@app/shared-ui/src/theme/colors.ts
export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',  // Main brand color
    900: '#1E3A8A',
  },
  // ... more colors
};
```

**📖 Complete Reference:** [DESIGN_TOKENS.md](./DESIGN_TOKENS.md)

---

## Figma Templates

We provide **pre-built Figma templates** that sync with the code.

### Template Structure

```
Figma Template
├── 🎨 Design Tokens (Colors, Typography, Spacing)
├── 📱 Mobile Components (iOS, Android)
├── 💻 Web Components (Desktop, Tablet)
├── 📄 Screen Templates (Login, Dashboard, etc.)
└── 📚 Examples (Todo App, Social App, etc.)
```

### How to Use

1. **Duplicate Template**
   - [Link to Figma Template]
   - File → Duplicate to your drafts

2. **Customize Brand**
   - Update color styles
   - Replace logo/icons
   - Adjust typography

3. **Design Screens**
   - Use components from library
   - Follow layout guidelines
   - Maintain token usage

4. **Export Tokens**
   - Use Figma plugin (Tokens Studio)
   - Or manually copy values to code

**📖 Detailed Guide:** [FIGMA.md](./FIGMA.md)

---

## Component Library

Our component library is built with:

- **React Native** for mobile (iOS + Android)
- **React** for web
- **NativeWind/Tailwind** for styling
- **Shared components** where possible

### Available Components

**Form Components:**
- Button, Input, Checkbox, Radio, Select, Switch, Slider

**Layout Components:**
- Container, Stack, Grid, Card, Divider

**Navigation:**
- Tab Bar, Header, Menu, Drawer

**Feedback:**
- Alert, Toast, Modal, Loading, Progress

**Data Display:**
- Avatar, Badge, Chip, List, Table

**📖 Component Docs:** [COMPONENTS.md](./COMPONENTS.md)

### Usage Example

```tsx
import { Button, Input, Card } from '@app/shared-ui';

function LoginScreen() {
  return (
    <Card>
      <Input
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
      />
      <Input
        label="Password"
        secureTextEntry
      />
      <Button
        title="Sign In"
        variant="primary"
        onPress={handleLogin}
      />
    </Card>
  );
}
```

---

## Workflow

### Design → Code Process

```
1. Design in Figma
   ↓
2. Review with Team
   ↓
3. Export Tokens (if changed)
   ↓
4. Update Code Tokens
   ↓
5. Implement Components
   ↓
6. QA & Refinement
```

**📖 Complete Workflow:** [WORKFLOW.md](./WORKFLOW.md)

---

## Customization

### For Each New App

#### 1. Update Brand Colors

```typescript
// libs/@app/shared-ui/src/theme/colors.ts
export const colors = {
  primary: {
    // Change to your brand color
    500: '#YOUR_BRAND_COLOR',
  },
};
```

#### 2. Update Typography

```typescript
// libs/@app/shared-ui/src/theme/typography.ts
export const typography = {
  fontFamily: {
    // Use your custom fonts
    sans: 'YourCustomFont',
  },
};
```

#### 3. Customize Components

Extend base components:

```tsx
// your-app/components/AppButton.tsx
import { Button } from '@app/shared-ui';

export function AppButton(props) {
  return (
    <Button
      {...props}
      // Add app-specific defaults
      className="shadow-lg rounded-xl"
    />
  );
}
```

#### 4. Add App-Specific Components

```bash
# Add to your app, not shared-ui
apps/mobile/components/SpecialFeature.tsx
apps/web/components/SpecialFeature.tsx
```

---

## Best Practices

### ✅ Do's

- **Use design tokens** instead of hardcoded values
- **Follow spacing scale** (4, 8, 16, 24, 32...)
- **Test on all platforms** (iOS, Android, Web)
- **Support dark mode** from day one
- **Make it accessible** (screen readers, contrast)

### ❌ Don'ts

- **Don't hardcode colors** - use tokens
- **Don't use random spacing** - use scale
- **Don't ignore accessibility** - it matters
- **Don't skip dark mode** - users expect it
- **Don't break token system** - maintain consistency

---

## Tools & Resources

### Figma Plugins (Recommended)

- **Tokens Studio** - Export design tokens
- **Figma to Code** - Generate component code
- **Contrast** - Check color accessibility
- **Iconify** - Access thousands of icons

### Development Tools

- **Storybook** - Component playground (coming soon)
- **React Native Debugger** - Debug mobile UI
- **Browser DevTools** - Inspect web components

### References

- [Figma Best Practices](https://www.figma.com/best-practices/)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/format/)
- [Material Design](https://m3.material.io/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

## Contributing

### Adding New Components

1. Design in Figma first
2. Get approval from design team
3. Implement in code
4. Add documentation
5. Submit PR

### Updating Tokens

1. Update Figma styles
2. Export new tokens
3. Update code tokens
4. Test all components
5. Submit PR

---

## Support

- **Questions:** Open a [Discussion](https://github.com/YOUR-ORG/YOUR-REPO/discussions)
- **Bug Reports:** Create an [Issue](https://github.com/YOUR-ORG/YOUR-REPO/issues)
- **Design Reviews:** Tag @design-team in PR

---

## Next Steps

1. **Read:** [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - Understand tokens
2. **Setup:** [FIGMA.md](./FIGMA.md) - Get Figma template
3. **Build:** [COMPONENTS.md](./COMPONENTS.md) - Use components
4. **Learn:** [WORKFLOW.md](./WORKFLOW.md) - Master the process

---

**Ready to design?** Start with our [Figma Template](./FIGMA.md)!
