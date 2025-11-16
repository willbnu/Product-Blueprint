# Design-to-Code Workflow

Complete workflow for going from Figma designs to production code.

---

## Overview

This workflow ensures **smooth handoffs** between designers and developers, maintaining design consistency and code quality.

```
Figma Design → Review → Token Sync → Implementation → QA → Ship ✅
```

---

## The Workflow

### Phase 1: Design (Designers)

#### 1.1 Create Designs in Figma

**What to do:**
```
1. Use design tokens (colors, typography, spacing)
2. Build with components from library
3. Design all states (default, hover, active, disabled, loading, error)
4. Include edge cases (empty states, long text, no data)
5. Design for both light and dark mode
6. Consider responsive behavior
```

**Deliverables:**
- [ ] All screens designed
- [ ] All states covered
- [ ] Edge cases handled
- [ ] Dark mode variants (if applicable)
- [ ] Prototype connections made

#### 1.2 Self-Review Checklist

Before handoff, verify:

**Design Consistency:**
- [ ] Using color styles (no hardcoded colors)
- [ ] Using text styles (no custom formatting)
- [ ] Following spacing grid (4, 8, 16, 24...)
- [ ] Components properly used
- [ ] Naming is clear and consistent

**Completeness:**
- [ ] All screens designed
- [ ] All user flows connected
- [ ] Loading states designed
- [ ] Empty states designed
- [ ] Error states designed
- [ ] Success states designed

**Accessibility:**
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Touch targets ≥ 44×44px (mobile)
- [ ] Alt text for images/icons noted

**Documentation:**
- [ ] Component descriptions added
- [ ] Complex interactions explained
- [ ] Edge cases noted
- [ ] Any technical constraints mentioned

---

### Phase 2: Design Review (Team)

#### 2.1 Stakeholder Review

**Process:**
```
1. Share Figma link with stakeholders
2. Present designs in meeting or async
3. Gather feedback via comments
4. Iterate based on feedback
5. Get final approval
```

**Tools:**
- Figma comments
- Loom video walkthroughs
- Slack/email for async feedback

#### 2.2 Technical Feasibility Review

**With developers:**
```
1. Review complex interactions
2. Confirm API data availability
3. Discuss performance implications
4. Identify technical risks
5. Adjust designs if needed
```

**Questions to ask:**
- Is this interaction technically feasible?
- Do we have the required data?
- Are there performance concerns?
- Will this work on all platforms?
- Are there any edge cases we missed?

---

### Phase 3: Handoff Preparation (Designers)

#### 3.1 Export Design Tokens (if changed)

**If you updated colors, typography, or spacing:**

```bash
# In Figma:
1. Open Tokens Studio plugin
2. Select updated tokens
3. Export as JSON
4. Save to: design-system/tokens/

# Share with developers:
"Hey team, I've updated the primary color.
New tokens exported to design-system/tokens/colors.json"
```

#### 3.2 Export Assets

**Icons & Images:**
```
# Mobile (React Native):
- Export @1x, @2x, @3x (PNG)
- Or export as SVG

# Web:
- Export as SVG (preferred)
- Or optimized PNG

# Naming:
icon-name@3x.png  (mobile)
icon-name.svg     (web)
```

**Where to save:**
```
apps/mobile/assets/icons/
apps/mobile/assets/images/
apps/web/public/icons/
apps/web/public/images/
```

#### 3.3 Create Handoff Document

**Example handoff:**
```markdown
## New Feature: User Profile Screen

**Figma Link:** [Profile Screen Frame](https://figma.com/...)

**What's New:**
- Profile header with avatar and name
- Edit button (top-right)
- Stats section (followers, following, posts)
- Bio section
- Settings button

**Interactions:**
- Tap avatar → Open full-screen photo
- Tap Edit → Navigate to Edit Profile
- Tap Stats → Navigate to Stats Detail
- Pull to refresh → Reload profile

**Edge Cases:**
- No avatar → Show default avatar
- Long bio → Truncate with "Read more"
- No followers → Show "0 followers"

**Assets:**
- Default avatar: /assets/default-avatar.png
- Settings icon: /assets/icons/settings.svg

**Notes:**
- Avatar should be cached
- Bio supports Markdown links
- Stats update in real-time

**Data Required:**
- User name, bio, avatar URL
- Follower/following counts
- Post count
```

---

### Phase 4: Implementation (Developers)

#### 4.1 Review Designs

**What to check:**
```
1. Open Figma file
2. Review all screens
3. Check interactions in prototype
4. Note any questions
5. Tag designer in comments if unclear
```

#### 4.2 Sync Design Tokens (if updated)

**If designer exported new tokens:**

```bash
# 1. Pull latest tokens
git pull origin main

# 2. Run sync script (if available)
pnpm tokens:sync

# 3. Review changes
git diff libs/@app/shared-ui/src/theme/

# 4. Update components if needed
```

#### 4.3 Implement Components

**Using Figma Inspect:**
```
1. Click element in Figma
2. Open "Inspect" panel (right side)
3. View CSS/React Native styles
4. Copy values (don't paste directly!)
5. Use design tokens instead
```

**Example:**

**Figma shows:**
```
background: #3B82F6
padding: 16px 12px
border-radius: 8px
```

**Your code (using tokens):**
```tsx
import { colors, spacing, borderRadius } from '@app/shared-ui/theme';

<Pressable
  style={{
    backgroundColor: colors.primary[500],  // Not #3B82F6
    padding: spacing[4],                   // Not 16px
    borderRadius: borderRadius.md,         // Not 8px
  }}
>
```

#### 4.4 Handle Edge Cases

**Always implement:**
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Long text handling
- [ ] No data scenarios
- [ ] Offline behavior

#### 4.5 Test on All Platforms

```bash
# Mobile
pnpm mobile:ios       # Test on iOS simulator
pnpm mobile:android   # Test on Android emulator

# Web
pnpm dev:web          # Test in Chrome
# Test in Safari, Firefox

# Check:
- [ ] Correct colors
- [ ] Proper spacing
- [ ] Smooth animations
- [ ] All interactions work
- [ ] Responsive behavior
```

---

### Phase 5: Design QA (Designers)

#### 5.1 Review Implementation

**Checklist:**
```
Visual:
- [ ] Colors match design
- [ ] Typography matches
- [ ] Spacing is correct
- [ ] Borders/shadows match
- [ ] Images/icons correct

Interactions:
- [ ] Animations smooth
- [ ] Transitions correct
- [ ] Touch targets adequate
- [ ] Hover states work (web)
- [ ] Loading states show

Edge Cases:
- [ ] Long text handled
- [ ] Empty states show
- [ ] Error states show
- [ ] Responsive works
```

#### 5.2 Provide Feedback

**Good feedback:**
```markdown
✅ Good:
"The primary button color should be #3B82F6 (Primary/500),
currently it's showing #60A5FA (Primary/400).
See Figma frame 'Buttons' for reference."

❌ Bad:
"Button color is wrong"
```

**Where to provide:**
- GitHub PR comments
- Figma comments (tag developer)
- Slack/communication tool
- Bug tracker (for issues)

#### 5.3 Approve or Request Changes

**If everything looks good:**
```
"Looks great! Approved ✅
Small note: the spacing on the profile header
looks slightly tight on smaller phones, but not blocking."
```

**If changes needed:**
```
"Almost there! A few things:
1. Button shadow should be 'Shadow/Medium' not 'Shadow/Large'
2. Title text should be H2 (30px) not H3 (24px)
3. Missing error state for failed image load

Otherwise looking good!"
```

---

### Phase 6: Iteration (Designers + Developers)

#### 6.1 Refine Based on Feedback

**Common iterations:**
- Adjust spacing
- Tweak colors
- Refine animations
- Handle new edge cases
- Improve performance

#### 6.2 Update Designs (Designers)

**If implementation reveals issues:**
```
1. Update Figma designs
2. Note what changed
3. Notify team of updates
4. Re-export if tokens changed
```

#### 6.3 Update Code (Developers)

```
1. Make requested changes
2. Test again
3. Request re-review
4. Iterate until approved
```

---

### Phase 7: Ship (Everyone)

#### 7.1 Final Checks

**Designers:**
- [ ] All feedback addressed
- [ ] Design matches implementation
- [ ] Edge cases handled
- [ ] Animations smooth
- [ ] Accessible

**Developers:**
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Performance acceptable
- [ ] Works on all platforms
- [ ] No console errors

#### 7.2 Deploy

```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "feat: add user profile screen

- Implement profile header with avatar
- Add stats section (followers, following, posts)
- Handle edge cases (no avatar, long bio)
- Add loading and error states
- Tested on iOS, Android, Web

Design: https://figma.com/..."

# Create PR
gh pr create

# After approval
git push
```

#### 7.3 Monitor

**After shipping:**
- Watch error tracking (Sentry)
- Check analytics (PostHog)
- Monitor user feedback
- Track performance metrics

---

## Communication Best Practices

### Daily Standups

**Designers share:**
- "Working on checkout flow designs"
- "Need feedback on color contrast for buttons"
- "Will have onboarding screens ready by Friday"

**Developers share:**
- "Implementing profile screen from Figma"
- "Question: Should loading indicator be fullscreen or inline?"
- "Profile screen ready for design QA"

### Async Communication

**Use:**
- Figma comments for design questions
- GitHub PR comments for code review
- Slack for quick questions
- Email for detailed explanations

**Example Figma Comment:**
```
@developer: For this modal, should it be dismissible
by tapping outside? Or only via the X button?

Also, what happens if the API call fails? Should we
show error in-modal or navigate back?
```

---

## Tools Integration

### Figma → GitHub

**Link designs in PRs:**
```markdown
## Design Reference
Figma: https://figma.com/file/abc123/Screen-Name

## Implementation Notes
- Followed design specs exactly
- Used design tokens for all values
- Implemented all states (loading, error, empty)
- Tested on iOS, Android, Web

## Screenshots
[Attach screenshots comparing design vs implementation]
```

### Figma → Project Management

**Link in tickets:**
```
Title: Implement User Profile Screen
Labels: design-ready, mobile, web

Design: https://figma.com/...
Assets: Exported to /assets/profile/

Acceptance Criteria:
- [ ] Matches Figma design
- [ ] All interactions work
- [ ] Edge cases handled
- [ ] Passes design QA
```

---

## Common Scenarios

### Scenario 1: Designer Updates Mid-Sprint

**Problem:** Designer realizes color needs to change

**Solution:**
```
Designer:
1. Update Figma
2. Export new tokens
3. Message team: "Updated primary color in Figma.
   New tokens in /design-system/tokens/.
   Affects buttons and links."

Developer:
1. Pull new tokens
2. Run sync script
3. Review affected components
4. Test changes
5. Confirm with designer
```

### Scenario 2: Developer Finds Edge Case

**Problem:** Developer discovers case not in design

**Solution:**
```
Developer:
"@designer Found an edge case: What should happen
when user has 0 followers? Current design shows number,
but should we show different messaging?"

Designer:
1. Design the edge case
2. Update Figma
3. Share link
4. Developer implements
```

### Scenario 3: Design Not Technically Feasible

**Problem:** Proposed interaction is too complex

**Solution:**
```
Developer:
"This animation would require 3rd party library
and add 500KB to bundle. Can we simplify?"

Designer + Developer:
1. Discuss alternatives
2. Designer proposes simpler version
3. Get stakeholder approval
4. Implement simpler version
```

---

## Measuring Success

### Design Quality Metrics

- Design-to-implementation match: >95%
- Edge cases handled: 100%
- Accessibility score: AA compliant
- Design QA approval time: <1 day

### Process Metrics

- Handoff clarity: Minimal questions
- Iteration rounds: ≤2 per feature
- Rework: <10% of time
- Designer-developer collaboration: Weekly sync

---

## Templates

### Design Handoff Template

```markdown
## Feature Name

**Figma:** [Link]
**Ticket:** [Jira/GitHub link]

**Overview:**
[1-2 sentence description]

**Screens:**
- Screen 1: [Link to frame]
- Screen 2: [Link to frame]

**Interactions:**
- Action → Result
- Action → Result

**Edge Cases:**
- Case 1: [What to show]
- Case 2: [What to show]

**Assets:**
- [List exported assets]

**Data Required:**
- [List API endpoints/data]

**Notes:**
- [Any special considerations]

**Questions for Dev:**
- [Any open questions]
```

### Developer Feedback Template

```markdown
## Implementation Review

**PR:** #123
**Design:** [Figma link]

**Implemented:**
- [x] Feature 1
- [x] Feature 2
- [x] All states (loading, error, empty)

**Deviations:**
- Used slightly different animation timing (300ms vs 500ms)
  for better performance. Still feels smooth.

**Questions:**
- Avatar loading indicator - should it pulse or spin?
- Max bio length - should we truncate at 200 or 300 chars?

**Screenshots:**
Attached showing: design vs implementation
```

---

## Next Steps

1. **Review this workflow** with your team
2. **Customize** for your needs
3. **Try it** on next feature
4. **Iterate** based on feedback
5. **Document learnings** for future

---

**Remember:** Good design-to-code workflow is about **clear communication**, **mutual respect**, and **shared ownership** of quality. 🤝
