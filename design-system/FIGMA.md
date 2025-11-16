# Figma Setup & Templates

Complete guide for setting up and using Figma with this app template.

---

## 📋 Table of Contents

- [Figma Template](#figma-template)
- [Setup Process](#setup-process)
- [File Structure](#file-structure)
- [Design Tokens in Figma](#design-tokens-in-figma)
- [Component Library](#component-library)
- [Screen Templates](#screen-templates)
- [Plugins](#recommended-plugins)
- [Export & Handoff](#export--handoff)
- [Best Practices](#best-practices)

---

## Figma Template

### Template Links

**Main Template (Duplicate This):**
```
🔗 [App Template - Design System]
https://www.figma.com/community/file/YOUR-TEMPLATE-ID

Click "Get a copy" to duplicate to your drafts
```

**What's Included:**
- ✅ Complete design token library
- ✅ Mobile components (iOS + Android)
- ✅ Web components (Desktop + Tablet)
- ✅ Screen templates (20+ screens)
- ✅ Example apps (Todo, Social, E-commerce)
- ✅ Icon library
- ✅ Illustration templates

---

## Setup Process

### Step 1: Duplicate Template

```bash
1. Visit Figma Template link above
2. Click "Get a copy" or "Duplicate to your drafts"
3. Rename file to your app name
4. Move to your team workspace (if applicable)
```

### Step 2: Customize for Your App

#### Update Brand Colors

```
1. Open "🎨 Design Tokens" page
2. Navigate to "Colors" section
3. Select primary color style
4. Update to your brand color
5. Click "Update style"
```

Figma will automatically update all components using that color!

#### Update Typography

```
1. Go to "Typography" section
2. Update font family (if using custom fonts)
3. Adjust font sizes if needed
4. Update text styles
```

#### Update Logo & Assets

```
1. Replace logo in "Assets" page
2. Update app icon
3. Add custom illustrations
4. Import brand imagery
```

### Step 3: Share with Team

```
1. Click "Share" in top-right
2. Add team members
3. Set permissions:
   - Designers: Can edit
   - Developers: Can view
   - Stakeholders: Can view
```

---

## File Structure

### Page Organization

```
📄 Figma File Structure
│
├── 📖 README & Guidelines
│   └── How to use this template
│
├── 🎨 Design Tokens
│   ├── Colors (Styles)
│   ├── Typography (Text Styles)
│   ├── Spacing (Grid)
│   ├── Shadows (Effects)
│   └── Border Radius
│
├── 📦 Components
│   ├── Mobile Components
│   │   ├── Buttons
│   │   ├── Inputs
│   │   ├── Cards
│   │   └── ...
│   └── Web Components
│       ├── Buttons
│       ├── Inputs
│       └── ...
│
├── 📱 Mobile Screens
│   ├── Authentication
│   ├── Onboarding
│   ├── Dashboard
│   └── ...
│
├── 💻 Web Screens
│   ├── Landing
│   ├── Dashboard
│   └── ...
│
└── 📚 Examples
    ├── Todo App
    ├── Social App
    └── E-commerce App
```

---

## Design Tokens in Figma

### Color Styles

**How to Create:**
```
1. Select a shape
2. Click color picker
3. Click "+" icon
4. Name: "Primary/500"
5. Create all shades (50-900)
```

**Naming Convention:**
```
Color Category/Shade
├── Primary/50
├── Primary/100
├── ...
└── Primary/900

Semantic/Variant
├── Success/Base
├── Error/Base
└── Warning/Base
```

### Text Styles

**Structure:**
```
Heading/H1
Heading/H2
Body/Large
Body/Default
Body/Small
Caption/Default
Label/Default
```

**Properties:**
- Font family
- Font size
- Font weight
- Line height
- Letter spacing

### Effect Styles (Shadows)

```
Shadow/None
Shadow/Small
Shadow/Base
Shadow/Medium
Shadow/Large
Shadow/Extra Large
```

---

## Component Library

### Component Anatomy

Every component should have:

1. **Variants** - Different states and sizes
2. **Auto Layout** - Responsive sizing
3. **Properties** - Configurable options
4. **Documentation** - Usage notes

### Example: Button Component

```
Button Component
│
├── Variants:
│   ├── Size (Small, Medium, Large)
│   ├── Variant (Primary, Secondary, Outline)
│   └── State (Default, Hover, Pressed, Disabled)
│
├── Properties:
│   ├── Text (String)
│   ├── Icon (Boolean)
│   └── Loading (Boolean)
│
└── Auto Layout:
    ├── Direction: Horizontal
    ├── Padding: 16px (h) × 12px (v)
    └── Gap: 8px
```

### Creating Platform-Specific Components

**Mobile vs Web Differences:**

| Aspect | Mobile | Web |
|--------|--------|-----|
| **Touch Targets** | Min 44×44px | Min 24×24px |
| **Spacing** | Larger (easier to tap) | Tighter |
| **Navigation** | Tab bar, drawers | Top nav, sidebar |
| **Interactions** | Tap, swipe, long-press | Click, hover, right-click |

---

## Screen Templates

### Available Templates

**Authentication:**
- Login
- Sign Up
- Forgot Password
- Email Verification
- Onboarding (3 screens)

**Main App:**
- Dashboard/Home
- Profile
- Settings
- Notifications
- Search

**Feature Screens:**
- List View
- Detail View
- Create/Edit Form
- Empty States
- Error States

### Using Templates

```
1. Navigate to "Mobile Screens" or "Web Screens"
2. Select template you need
3. Duplicate frame (Cmd+D)
4. Customize content
5. Connect frames with prototyping
```

### Creating Prototypes

```
1. Select frame
2. Click prototype tab (right panel)
3. Click "+" on element
4. Drag to target frame
5. Choose interaction:
   - On Tap → Navigate to
   - Transition: Smart Animate
   - Duration: 300ms
```

---

## Recommended Plugins

### Essential Plugins

#### 1. Tokens Studio for Figma
**Purpose:** Export design tokens to JSON

```
Install: Figma → Plugins → Browse → Search "Tokens Studio"

Usage:
1. Open plugin
2. Select tokens
3. Export as JSON
4. Import into codebase
```

#### 2. Figma to Code
**Purpose:** Generate React/React Native code

```
Usage:
1. Select component
2. Run plugin
3. Copy generated code
4. Paste into your project
```

#### 3. Contrast
**Purpose:** Check color accessibility

```
Usage:
1. Select text element
2. Run plugin
3. Check WCAG compliance
4. Adjust colors if needed
```

#### 4. Iconify
**Purpose:** Access 100k+ icons

```
Usage:
1. Open plugin
2. Search for icon
3. Insert into design
4. Resize and color
```

### Nice-to-Have Plugins

- **Content Reel** - Realistic placeholder content
- **Unsplash** - Free stock photos
- **Remove BG** - Remove image backgrounds
- **Arc** - Easy curved text
- **Chart** - Generate data visualizations

---

## Export & Handoff

### Export for Development

#### Option 1: Figma Inspect (Built-in)

```
Developers can:
1. Open Figma file (view mode)
2. Click "Inspect" tab
3. Select any element
4. Copy CSS/React Native styles
```

#### Option 2: Export Assets

```
For Designers:
1. Select asset (icon, image)
2. Add export settings (bottom-right)
   - iOS: @1x, @2x, @3x (PNG)
   - Android: MDPI, HDPI, XHDPI, XXHDPI (PNG)
   - Web: SVG or optimized PNG
3. Click "Export [Name]"
```

#### Option 3: Design Tokens Export

```
Using Tokens Studio plugin:
1. Open plugin
2. Select all tokens
3. Export as JSON
4. Save to: design-system/tokens/
5. Run sync script: pnpm tokens:sync
```

### Handoff Checklist

**Before handing off to developers:**

- [ ] All designs finalized and approved
- [ ] Components use design tokens (no one-off values)
- [ ] Text uses text styles
- [ ] Colors use color styles
- [ ] Spacing follows grid system
- [ ] Assets exported in all required sizes
- [ ] Prototypes show all interactions
- [ ] Edge cases designed (loading, empty, error)
- [ ] Dark mode variants created (if applicable)
- [ ] Accessibility notes added (if needed)

---

## Best Practices

### Design System Consistency

#### ✅ Do

- **Use styles** for all colors and text
- **Create components** for reusable elements
- **Follow spacing grid** (4px, 8px, 16px...)
- **Name layers clearly** for developers
- **Document component usage** in descriptions
- **Version control** major changes

#### ❌ Don't

- **Hard-code colors** - always use styles
- **Detach from components** without reason
- **Use random spacing** - stick to grid
- **Leave layers unnamed** - name everything
- **Make one-off components** - reuse existing
- **Skip documentation** - explain complex patterns

### Organization

#### Layer Naming

```
✅ Good:
├── Button/Primary/Default
├── Icon/Arrow/Right
└── Text/Heading/H1

❌ Bad:
├── Rectangle 123
├── Group 45
└── Frame 89
```

#### Frame Structure

```
Screen Name
├── Navigation/Header
├── Content
│   ├── Section/Hero
│   ├── Section/Features
│   └── Section/CTA
└── Navigation/Footer
```

### Collaboration

#### Designer → Developer Handoff

```
1. Share Figma link (view access)
2. Tag developer in comments for questions
3. Explain complex interactions
4. Note any technical constraints
5. Be available for questions
```

#### Design Reviews

```
1. Share link to specific frame
2. Add comments explaining decisions
3. Request feedback with @mentions
4. Mark resolved when addressed
```

---

## Workflow Integration

### Design → Code Process

```
1. DESIGN
   ├── Create/update designs in Figma
   ├── Use design tokens and components
   └── Get approval from stakeholders

2. DOCUMENTATION
   ├── Add component descriptions
   ├── Note interactions and states
   └── Export tokens if changed

3. HANDOFF
   ├── Share Figma link with devs
   ├── Export assets
   └── Answer dev questions

4. IMPLEMENTATION
   ├── Dev implements in code
   ├── Uses Figma inspect for specs
   └── References design tokens

5. REVIEW
   ├── Designer reviews implementation
   ├── Notes any discrepancies
   └── Dev refines until perfect

6. QA
   ├── Test on all platforms
   ├── Check responsiveness
   └── Verify interactions
```

---

## Figma to Code Examples

### Button Component

**In Figma:**
```
Component: Button/Primary/Medium
├── Auto Layout (Horizontal)
│   ├── Padding: 16px × 12px
│   ├── Gap: 8px
│   └── Border Radius: 8px
├── Fill: Primary/500 (#3B82F6)
└── Text: "Button Text" (Body/Medium)
```

**In Code (React Native):**
```tsx
<Pressable
  style={{
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderRadius: 8,
    backgroundColor: colors.primary[500],
  }}
>
  <Text style={typography.bodyMedium}>
    Button Text
  </Text>
</Pressable>
```

**With NativeWind:**
```tsx
<Pressable className="flex-row px-4 py-3 gap-2 rounded-lg bg-primary-500">
  <Text className="text-base font-medium">Button Text</Text>
</Pressable>
```

---

## Resources

### Figma Resources

- [Figma Learn](https://help.figma.com/) - Official documentation
- [Figma Community](https://www.figma.com/community) - Templates and plugins
- [Figma Best Practices](https://www.figma.com/best-practices/)

### Design Systems Examples

- [Material Design](https://m3.material.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Ant Design](https://ant.design/)
- [Polaris (Shopify)](https://polaris.shopify.com/)

### YouTube Tutorials

- [Figma for Beginners](https://www.youtube.com/c/Figma)
- [Design Systems in Figma](https://www.youtube.com/watch?v=EK-pHkc5EL4)

---

## Troubleshooting

### Common Issues

**Q: Developers say colors don't match**
- A: Ensure using color styles, not raw hex values
- Check if dark mode colors were considered

**Q: Components break when duplicated**
- A: Reset overrides or create instances properly
- Check auto layout constraints

**Q: Export sizes are wrong**
- A: Verify export settings (@1x, @2x, @3x)
- Check frame size before exporting

**Q: Prototypes don't work**
- A: Check connections in prototype mode
- Verify interaction triggers are set

---

## Next Steps

1. **[Duplicate Figma Template](#figma-template)**
2. **[Customize for Your App](#setup-process)**
3. **[Export Design Tokens](./DESIGN_TOKENS.md)**
4. **[Start Designing Screens](#screen-templates)**
5. **[Handoff to Development](./WORKFLOW.md)**

---

**Questions?** Tag @design-team in GitHub Discussions or Figma comments!
