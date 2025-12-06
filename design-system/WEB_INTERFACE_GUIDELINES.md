# Web Interface Guidelines

> **Purpose**: A comprehensive list of details that make a good web interface.
>
> **Source**: Adapted from [Rauno Freiberg's Interface Guidelines](https://interfaces.rauno.me/)
>
> **Use with**: Reference these guidelines when writing design requirements in your [PRD](../prd/templates/prd-template.md) to ensure high-quality implementation.

---

## Table of Contents

- [Introduction](#introduction)
- [Interactivity](#interactivity)
- [Typography](#typography)
- [Motion](#motion)
- [Touch](#touch)
- [Optimizations](#optimizations)
- [Accessibility](#accessibility)
- [Design](#design)
- [Quick Reference Checklist](#quick-reference-checklist)
- [Using with PRD Templates](#using-with-prd-templates)
- [Using with Figma](#using-with-figma)

---

## Introduction

This document outlines a non-exhaustive list of details that make a good web interface. It is a living document, periodically updated based on learnings. Some of these may be subjective, but most apply to all websites.

The [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/) spec is deliberately not duplicated in this document. However, some accessibility guidelines may be pointed out.

> **💡 For Implementation**: See [Web Development Guide](../docs/WEB.md) for technical implementation details.

---

## Interactivity

> **Design Brief Requirement**: Include these interaction specifications in your design requirements to ensure responsive, intuitive interfaces.

### Form Elements

- **Input Labels**: Clicking the input label should focus the input field
- **Form Submission**: Inputs should be wrapped with a `<form>` to submit by pressing Enter
- **Input Types**: Inputs should have an appropriate `type` like `password`, `email`, etc
- **Input Attributes**: Inputs should disable `spellcheck` and `autocomplete` attributes most of the time
- **Form Validation**: Inputs should leverage HTML form validation by using the `required` attribute when appropriate
- **Input Decorations**: Input prefix and suffix decorations, such as icons, should be absolutely positioned on top of the text input with padding, not next to it, and trigger focus on the input

### Interactive Elements

- **Immediate Feedback**: Toggles should immediately take effect, not require confirmation
- **Prevent Duplicates**: Buttons should be disabled after submission to avoid duplicate network requests
- **User Selection**: Interactive elements should disable `user-select` for inner content
- **Pointer Events**: Decorative elements (glows, gradients) should disable `pointer-events` to not hijack events
- **Touch Targets**: Interactive elements in a vertical or horizontal list should have no dead areas between each element, instead, increase their `padding`

---

## Typography

> **Design Brief Requirement**: Specify these typography requirements for professional, legible text rendering.

### Font Rendering Quality

- **Antialiasing**: Fonts should have `-webkit-font-smoothing: antialiased` applied for better legibility
- **Text Rendering**: Fonts should have `text-rendering: optimizeLegibility` applied for better legibility
- **Font Subsetting**: Fonts should be subset based on the content, alphabet or relevant language(s)

### Font Weight Guidelines

- **No Hover Shifts**: Font weight should not change on hover or selected state to prevent layout shift
- **Minimum Weight**: Font weights below 400 should not be used
- **Heading Weights**: Medium sized headings generally look best with a font weight between 500-600

### Responsive Typography

- **Fluid Sizing**: Adjust values fluidly by using CSS [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), e.g. `clamp(48px, 5vw, 72px)` for the `font-size` of a heading
- **Tabular Figures**: Where available, tabular figures should be applied with `font-variant-numeric: tabular-nums`, particularly in tables or when layout shifts are undesirable, like in timers
- **iOS Text Sizing**: Prevent text resizing unexpectedly in landscape mode on iOS with `-webkit-text-size-adjust: 100%`

> **Reference**: See [Design Tokens](./DESIGN_TOKENS.md) for typography scale and implementation.

---

## Motion

> **Design Brief Requirement**: Define animation requirements that feel immediate and purposeful, not decorative.

### Animation Timing

- **Theme Switching**: Switching themes should not trigger transitions and animations on elements[^1]
- **Immediate Feel**: Animation duration should not be more than 200ms for interactions to feel immediate
- **Proportional Scale**: Animation values should be proportional to the trigger size:
  - Don't animate dialog scale in from 0 → 1, fade opacity and scale from ~0.8
  - Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so

### Purposeful Animation

- **Frequent Actions**: Actions that are frequent and low in novelty should avoid extraneous animations:[^2]
  - Opening a right click menu
  - Deleting or adding items from a list
  - Hovering trivial buttons

### Performance

- **CPU/GPU Offload**: Looping animations should pause when not visible on the screen to offload CPU and GPU usage
- **Smooth Scrolling**: Use `scroll-behavior: smooth` for navigating to in-page anchors, with an appropriate offset

---

## Touch

> **Design Brief Requirement**: Ensure interfaces work seamlessly across touch and pointer devices.

### Touch-Specific Behavior

- **No Hover Flash**: Hover states should not be visible on touch press, use `@media (hover: hover)`[^3]
- **Prevent iOS Zoom**: Font size for inputs should not be smaller than 16px to prevent iOS zooming on focus
- **Auto Focus**: Inputs should not auto focus on touch devices as it will open the keyboard and cover the screen
- **Video Autoplay**: Apply `muted` and `playsinline` to `<video />` tags to auto play on iOS

### Touch Gestures

- **Custom Gestures**: Disable `touch-action` for custom components that implement pan and zoom gestures to prevent interference from native behavior like zooming and scrolling
- **Tap Highlight**: Disable the default iOS tap highlight with `-webkit-tap-highlight-color: rgba(0,0,0,0)`, but always replace it with an appropriate alternative

> **Note**: Minimum touch target size should be 44×44px per [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/layout).

---

## Optimizations

> **Design Brief Requirement**: Specify performance targets for rendering and animations.

### Rendering Performance

- **Blur Performance**: Large `blur()` values for `filter` and `backdrop-filter` may be slow
- **Prevent Banding**: Scaling and blurring filled rectangles will cause banding, use radial gradients instead
- **GPU Rendering**: Sparingly enable GPU rendering with `transform: translateZ(0)` for unperformant animations
- **Will-Change**: Toggle `will-change` on unperformant scroll animations for the duration of the animation[^4]

### Resource Management

- **Video Performance**: Auto-playing too many videos on iOS will choke the device, pause or even unmount off-screen videos
- **Direct DOM Updates**: Bypass React's render lifecycle with refs for real-time values that can commit to the DOM directly[^5]
- **Adaptive Loading**: [Detect and adapt](https://github.com/GoogleChromeLabs/react-adaptive-hooks) to the hardware and network capabilities of the user's device

> **Reference**: See [Web Development Guide - Web Vitals](../docs/WEB.md#web-vitals-and-performance) for Core Web Vitals targets.

---

## Accessibility

> **Design Brief Requirement**: Ensure keyboard navigability, screen reader support, and WCAG compliance.

### Interactive Accessibility

- **Disabled Elements**: Disabled buttons should not have tooltips, they are not accessible[^6]
- **Focus Rings**: Box shadow should be used for focus rings, not outline which won't respect radius[^7]
- **Keyboard Navigation**: Focusable elements in a sequential list should be navigable with ↑ ↓
- **Keyboard Deletion**: Focusable elements in a sequential list should be deletable with ⌘ Backspace
- **Menu Triggers**: To open immediately on press, dropdown menus should trigger on `mousedown`, not `click`

### Visual Accessibility

- **Favicons**: Use a svg favicon with a style tag that adheres to the system theme based on `prefers-color-scheme`
- **ARIA Labels**: Icon only interactive elements should define an explicit `aria-label`
- **Tooltip Content**: Tooltips triggered by hover should not contain interactive content
- **Images**: Images should always be rendered with `<img>` for screen readers and ease of copying from the right click menu
- **Illustrations**: Illustrations built with HTML should have an explicit `aria-label` instead of announcing the raw DOM tree to people using screen readers
- **Gradient Text**: Gradient text should unset the gradient on `::selection` state

### Advanced Patterns

- **Nested Menus**: When using nested menus, use a "prediction cone" to prevent the pointer from accidentally closing the menu when moving across other elements

> **Reference**: See [Web Development Guide - Accessibility](../docs/WEB.md#accessibility-a11y) for implementation details.

---

## Design

> **Design Brief Requirement**: Specify these UX patterns for intuitive, feedback-rich interfaces.

### User Feedback

- **Optimistic Updates**: Optimistically update data locally and roll back on server error with feedback
- **Server-Side Redirects**: Authentication redirects should happen on the server before the client loads to avoid janky URL changes
- **Selection Styling**: Style the document selection state with `::selection`

### Contextual Feedback

- **Relative Feedback**: Display feedback relative to its trigger:
  - Show a temporary inline checkmark on a successful copy, not a notification
  - Highlight the relevant input(s) on form error(s)
- **Empty States**: Empty states should prompt to create a new item, with optional templates

---

## Quick Reference Checklist

### Essential Requirements for Every Web Interface

**Interactivity**:
- [ ] Input labels focus their respective fields when clicked
- [ ] Forms submit on Enter key press
- [ ] Buttons disabled after submission to prevent duplicates
- [ ] Interactive elements have proper touch targets (no dead zones)

**Typography**:
- [ ] Font smoothing applied (`-webkit-font-smoothing: antialiased`)
- [ ] Text rendering optimized (`text-rendering: optimizeLegibility`)
- [ ] Font weights stay consistent (no hover weight changes)
- [ ] Responsive sizing using `clamp()` for fluid typography
- [ ] Tabular figures for numeric content (`font-variant-numeric: tabular-nums`)

**Motion**:
- [ ] Animation durations under 200ms for immediate feel
- [ ] Theme switches don't trigger element transitions
- [ ] Frequent actions avoid extraneous animations
- [ ] Looping animations pause when off-screen

**Touch**:
- [ ] Hover states hidden on touch devices (`@media (hover: hover)`)
- [ ] Input font size ≥16px to prevent iOS zoom
- [ ] No auto-focus on touch devices
- [ ] Videos have `muted` and `playsinline` for iOS autoplay

**Optimizations**:
- [ ] Large blur values avoided or optimized
- [ ] GPU rendering used sparingly
- [ ] Off-screen videos paused or unmounted
- [ ] Adaptive loading for different device capabilities

**Accessibility**:
- [ ] Focus rings use box-shadow (respects border-radius)
- [ ] Sequential lists navigable with arrow keys
- [ ] Icon-only elements have `aria-label`
- [ ] Images use `<img>` tag for screen readers
- [ ] Disabled buttons don't have tooltips

**Design**:
- [ ] Optimistic updates with error rollback
- [ ] Server-side auth redirects
- [ ] Feedback shown relative to trigger
- [ ] Empty states prompt action

---

## Using with PRD Templates

When writing a PRD using the [PRD Template](../prd/templates/prd-template.md), reference specific sections of this guide in your design requirements:

**Example Design Requirements Section**:

---

## Using with Figma

When working with the [Figma templates](./FIGMA.md), use these guidelines to:

1. **Set Component Specs**: Specify touch target sizes, spacing, typography in Figma
2. **Document Interactions**: Add interaction notes using Figma comments
3. **Define States**: Create variants for hover, focus, active, disabled states
4. **Accessibility Annotations**: Document contrast ratios and alt text in designs
5. **Performance Notes**: Add notes about animation timing and optimization

> **💡 Tip**: Share this document with your design team so they can reference it while creating Figma designs.

---

## Footnotes

[^1]: Switching between dark mode or light mode will trigger transitions on elements that are meant for explicit interactions like hover. We can [disable transitions temporarily](https://paco.me/writing/disable-theme-transitions) to prevent this. For Next.js, use [next-themes](https://github.com/pacocoursey/next-themes) which prevents transitions out of the box.

[^2]: This is a matter of taste but some interactions just feel better with no motion. For example, the native macOS right click menu only animates out, not in, due to the frequent usage of it.

[^3]: Most touch devices on press will temporarily flash the hover state, unless explicitly only defined for pointer devices with [`@media (hover: hover)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover).

[^4]: Use [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) as a last resort to improve performance. Pre-emptively throwing it on elements for better performance may have the opposite effect.

[^5]: This might be controversial but sometimes it can be beneficial to manipulate the DOM directly. For example, instead of relying on React re-rendering on every wheel event, we can track the delta in a ref and update relevant elements directly in the callback.

[^6]: Disabled buttons do not appear in tab order in the DOM so the tooltip will never be announced for keyboard users and they won't know why the button is disabled.

[^7]: As of 2023, Safari will not take the border radius of an element into account when defining custom outline styles. [Safari 16.4](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes) has added support for `outline` following the curve of border radius. However, keep in mind that not everyone updates their OS immediately.

---

## Additional Resources

- [Web Development Guide](../docs/WEB.md) - Technical implementation
- [Design System](./README.md) - Design tokens and Figma templates
- [PRD Template](../prd/templates/prd-template.md) - Product requirements
- [Accessibility Guide](../docs/WEB.md#accessibility-a11y) - WCAG implementation
- [Original Source](https://interfaces.rauno.me/) - Rauno Freiberg's guidelines

---

**Credits**: This document is adapted from [Rauno Freiberg's Interface Guidelines](https://interfaces.rauno.me/), with additions and modifications for the Product-Blueprint. The original work is an excellent resource for interface design best practices.
