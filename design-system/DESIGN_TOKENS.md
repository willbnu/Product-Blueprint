# Design Tokens Reference

Complete reference for all design tokens in the system.

---

## What are Design Tokens?

Design tokens are the **visual design atoms** of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to maintain a scalable and consistent visual system.

**Example:**
```typescript
// ❌ Bad: Hard-coded
<View style={{ backgroundColor: '#3B82F6' }} />

// ✅ Good: Using token
<View style={{ backgroundColor: colors.primary[500] }} />
```

---

## Token Categories

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Shadows](#shadows)
5. [Border Radius](#border-radius)
6. [Z-Index](#z-index)

---

## Colors

### Color Palette Structure

Each color has **10 shades** (50-900) for maximum flexibility.

```typescript
// libs/@app/shared-ui/src/theme/colors.ts
export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',  // Base/main shade
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
};
```

### Brand Colors

#### Primary
**Purpose:** Main brand color, CTAs, active states

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#EFF6FF` | Lightest tint, backgrounds |
| 100 | `#DBEAFE` | Light backgrounds, hovers |
| 200 | `#BFDBFE` | Borders, dividers |
| 300 | `#93C5FD` | Subtle interactions |
| 400 | `#60A5FA` | Disabled states |
| **500** | **`#3B82F6`** | **Main brand color** ⭐ |
| 600 | `#2563EB` | Hover states |
| 700 | `#1D4ED8` | Active/pressed states |
| 800 | `#1E40AF` | Text on light backgrounds |
| 900 | `#1E3A8A` | Darkest shade |

#### Secondary
**Purpose:** Secondary actions, accents

```typescript
secondary: {
  500: '#8B5CF6',  // Purple
}
```

### Semantic Colors

#### Success
**Purpose:** Success messages, positive actions

```typescript
success: {
  50: '#F0FDF4',
  500: '#10B981',  // Main
  900: '#064E3B',
}
```

**Usage:**
- Checkmarks, confirmation icons
- Success toasts/alerts
- Positive status indicators

#### Error/Danger
**Purpose:** Error messages, destructive actions

```typescript
error: {
  50: '#FEF2F2',
  500: '#EF4444',  // Main
  900: '#7F1D1D',
}
```

**Usage:**
- Error messages
- Delete buttons
- Form validation errors

#### Warning
**Purpose:** Warning messages, caution

```typescript
warning: {
  50: '#FFFBEB',
  500: '#F59E0B',  // Main
  900: '#78350F',
}
```

**Usage:**
- Warning alerts
- Incomplete states
- Attention needed

#### Info
**Purpose:** Informational messages

```typescript
info: {
  50: '#EFF6FF',
  500: '#3B82F6',  // Same as primary
  900: '#1E3A8A',
}
```

### Neutral Colors

#### Gray Scale
**Purpose:** Text, borders, backgrounds

```typescript
gray: {
  50: '#F9FAFB',   // Lightest
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',  // Darkest
}
```

**Usage Guide:**

| Shade | Light Mode | Dark Mode |
|-------|------------|-----------|
| 50-200 | Backgrounds | Text |
| 300-400 | Borders, disabled text | Borders |
| 500-600 | Secondary text | Secondary text |
| 700-900 | Primary text | Backgrounds |

### Special Colors

```typescript
// Pure colors for special cases
white: '#FFFFFF',
black: '#000000',
transparent: 'transparent',
```

### Color Usage Guidelines

#### Text Colors (Light Mode)

```typescript
text: {
  primary: colors.gray[900],      // Main text
  secondary: colors.gray[600],    // Supporting text
  tertiary: colors.gray[500],     // Placeholder text
  disabled: colors.gray[400],     // Disabled text
  inverse: colors.white,          // Text on dark backgrounds
}
```

#### Background Colors (Light Mode)

```typescript
background: {
  primary: colors.white,          // Main background
  secondary: colors.gray[50],     // Secondary background
  tertiary: colors.gray[100],     // Cards, elevated surfaces
  inverse: colors.gray[900],      // Dark sections
}
```

#### Border Colors

```typescript
border: {
  default: colors.gray[200],
  hover: colors.gray[300],
  focus: colors.primary[500],
}
```

### Dark Mode Colors

```typescript
// Auto-generated or manually defined
darkColors = {
  // Invert the scale
  background: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    tertiary: colors.gray[700],
  },
  text: {
    primary: colors.gray[50],
    secondary: colors.gray[400],
  },
  // Brand colors stay the same or slightly adjusted
  primary: colors.primary,
};
```

---

## Typography

### Font Families

```typescript
fontFamily: {
  // System fonts (default)
  sans: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  }),

  // Monospace for code
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    web: '"SF Mono", Monaco, "Courier New", monospace',
  }),
}
```

**Custom Fonts:** Add in `apps/mobile/app.json` and import via `expo-font`.

### Font Sizes

```typescript
fontSize: {
  xs: 12,      // Very small text
  sm: 14,      // Small text
  base: 16,    // Body text (default) ⭐
  lg: 18,      // Large body
  xl: 20,      // Small headings
  '2xl': 24,   // H4
  '3xl': 30,   // H3
  '4xl': 36,   // H2
  '5xl': 48,   // H1
  '6xl': 60,   // Display
}
```

**Mobile Scaling:** Font sizes auto-scale based on device text settings.

### Font Weights

```typescript
fontWeight: {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
}
```

### Line Heights

```typescript
lineHeight: {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,    // Default ⭐
  relaxed: 1.625,
  loose: 2,
}
```

### Typography Scale

Pre-defined text styles:

```typescript
// Headings
h1: {
  fontSize: fontSize['5xl'],  // 48
  fontWeight: fontWeight.bold,
  lineHeight: lineHeight.tight,
},
h2: {
  fontSize: fontSize['4xl'],  // 36
  fontWeight: fontWeight.bold,
  lineHeight: lineHeight.tight,
},
h3: {
  fontSize: fontSize['3xl'],  // 30
  fontWeight: fontWeight.semibold,
  lineHeight: lineHeight.snug,
},
// ... h4, h5, h6

// Body
bodyLarge: {
  fontSize: fontSize.lg,      // 18
  lineHeight: lineHeight.relaxed,
},
body: {
  fontSize: fontSize.base,    // 16
  lineHeight: lineHeight.normal,
},
bodySmall: {
  fontSize: fontSize.sm,      // 14
  lineHeight: lineHeight.normal,
},

// Special
caption: {
  fontSize: fontSize.xs,      // 12
  color: colors.gray[600],
},
label: {
  fontSize: fontSize.sm,      // 14
  fontWeight: fontWeight.medium,
},
```

---

## Spacing

**Spacing Scale:** Based on 4px grid system

```typescript
spacing: {
  0: 0,
  px: 1,      // 1px
  0.5: 2,     // 2px
  1: 4,       // 4px
  1.5: 6,     // 6px
  2: 8,       // 8px
  2.5: 10,    // 10px
  3: 12,      // 12px
  3.5: 14,    // 14px
  4: 16,      // 16px ⭐ Base
  5: 20,      // 20px
  6: 24,      // 24px
  7: 28,      // 28px
  8: 32,      // 32px
  9: 36,      // 36px
  10: 40,     // 40px
  12: 48,     // 48px
  16: 64,     // 64px
  20: 80,     // 80px
  24: 96,     // 96px
}
```

### Spacing Usage Guide

| Value | Usage |
|-------|-------|
| 1-2 (4-8px) | Inner component spacing, tight layouts |
| 3-4 (12-16px) | Component padding, default gaps |
| 5-6 (20-24px) | Section spacing, card padding |
| 8-10 (32-40px) | Screen margins, large sections |
| 12-16 (48-64px) | Major sections, screen spacing |

---

## Shadows

### Elevation System (Material Design inspired)

```typescript
shadows: {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,  // Android
  },

  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  base: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },

  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 12,
  },
}
```

### Shadow Usage

| Level | Component |
|-------|-----------|
| `none` | Flat surfaces |
| `sm` | Subtle depth (badges) |
| `base` | Cards, buttons |
| `md` | Dropdowns, tooltips |
| `lg` | Modals, popovers |
| `xl` | Large modals, drawers |

---

## Border Radius

```typescript
borderRadius: {
  none: 0,
  sm: 4,      // Small elements
  base: 8,    // Default ⭐
  md: 12,     // Cards
  lg: 16,     // Large cards
  xl: 24,     // Modals
  '2xl': 32,  // Special cases
  '3xl': 48,  // Hero sections
  full: 9999, // Pills, avatars
}
```

### Border Radius Usage

| Value | Component |
|-------|-----------|
| `sm` | Badges, tags |
| `base` | Buttons, inputs |
| `md` | Cards |
| `lg` | Large cards, images |
| `xl` | Modals, sheets |
| `full` | Avatars, pills |

---

## Z-Index

**Layering system** for overlapping elements:

```typescript
zIndex: {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
}
```

---

## Using Tokens in Code

### React Native (Mobile)

```tsx
import { colors, spacing, typography, shadows } from '@app/shared-ui/theme';

<View
  style={{
    backgroundColor: colors.primary[500],
    padding: spacing[4],
    borderRadius: borderRadius.md,
    ...shadows.md,
  }}
>
  <Text
    style={{
      ...typography.h2,
      color: colors.text.primary,
    }}
  >
    Hello World
  </Text>
</View>
```

### With NativeWind (Recommended)

```tsx
<View className="bg-primary-500 p-4 rounded-md shadow-md">
  <Text className="text-2xl font-bold text-gray-900">
    Hello World
  </Text>
</View>
```

### React Web (Tailwind)

```tsx
<div className="bg-blue-500 p-4 rounded-md shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">
    Hello World
  </h2>
</div>
```

---

## Token Synchronization

### Figma → Code

1. **Export from Figma**
   - Use Tokens Studio plugin
   - Export as JSON

2. **Convert to TypeScript**
   ```bash
   pnpm run tokens:sync
   ```

3. **Review changes**
   ```bash
   git diff libs/@app/shared-ui/src/theme/
   ```

4. **Test components**
   ```bash
   pnpm test
   ```

### Automated Sync (Future)

- CI/CD integration
- Figma webhooks
- Auto-generate PRs

---

## Customization for New Apps

### Quick Customization

```typescript
// 1. Update primary brand color
colors.primary[500] = '#YOUR_BRAND_COLOR';

// 2. Generate shades automatically
// Use: https://uicolors.app/create

// 3. Update font family
typography.fontFamily.sans = 'Your Custom Font';

// 4. Adjust spacing scale if needed
// (Usually keep default)
```

### Advanced Customization

Create app-specific overrides:

```typescript
// apps/mobile/theme/overrides.ts
import { colors as baseColors } from '@app/shared-ui/theme';

export const appColors = {
  ...baseColors,
  brand: {
    ...baseColors.primary,
    // App-specific additions
    500: '#CUSTOM_COLOR',
  },
};
```

---

## Best Practices

### ✅ Do

- Use tokens consistently
- Follow the spacing scale
- Test in dark mode
- Check accessibility (contrast ratios)
- Document custom tokens

### ❌ Don't

- Hard-code colors
- Use arbitrary spacing
- Ignore semantic meaning
- Skip dark mode testing
- Create duplicate tokens

---

## Tools

- **Figma Plugins:** Tokens Studio, Contrast
- **Color Tools:** [UIColors](https://uicolors.app), [Coolors](https://coolors.co)
- **Accessibility:** [Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Next:** Use these tokens when building components (component documentation coming in future versions)
