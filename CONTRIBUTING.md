# Contributing Guidelines

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/YOUR-FORK.git
cd YOUR-FORK

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-ORG/ORIGINAL-REPO.git
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates
- `chore/description` - Maintenance tasks

## Development Workflow

### 1. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 2. Run Tests Locally

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific project
pnpm nx test mobile

# Run e2e tests
pnpm e2e
```

### 3. Run Linting and Formatting

```bash
# Lint code
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Format code
pnpm format

# Type check
pnpm typecheck
```

### 4. Test Your Changes

```bash
# Start mobile app
pnpm dev:mobile

# Start web app
pnpm dev:web

# Build all apps
pnpm build
```

### 5. Keep Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch
git rebase upstream/main
```

## Pull Request Process

### 1. Before Submitting

Ensure your PR:
- [ ] Passes all tests (`pnpm test`)
- [ ] Has no linting errors (`pnpm lint`)
- [ ] Has no TypeScript errors (`pnpm typecheck`)
- [ ] Follows commit message conventions
- [ ] Includes tests for new features
- [ ] Updates documentation if needed
- [ ] Has a clear description

### 2. Creating the Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub:**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

3. **PR Title Format:**
   ```
   feat: add user profile screen
   fix: resolve login button not responding
   docs: update setup instructions
   ```

### 3. PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested your changes:
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manually tested on iOS
- [ ] Manually tested on Android
- [ ] Manually tested on Web

## Screenshots (if applicable)
Add screenshots or GIFs showing the changes.

## Related Issues
Fixes #123
Related to #456
```

### 4. Review Process

- **Automated Checks:** CI will run tests, linting, and builds
- **Code Review:** Maintainers will review your code
- **Requested Changes:** Address feedback and push updates
- **Approval:** Once approved, a maintainer will merge

### 5. After Merge

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull upstream main

# Delete your feature branch (optional)
git branch -d feature/your-feature-name
```

## Coding Standards

### TypeScript

```typescript
// ✅ Good: Use explicit types
interface UserProps {
  name: string;
  email: string;
  age?: number;
}

function greetUser(user: UserProps): string {
  return `Hello, ${user.name}!`;
}

// ❌ Bad: Avoid 'any'
function doSomething(data: any) {
  // ...
}
```

### React Components

```typescript
// ✅ Good: Named exports, typed props
interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export function Button({ onPress, title, disabled = false }: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </Pressable>
  );
}

// ❌ Bad: Default exports, untyped props
export default function Button({ onPress, title, disabled }) {
  // ...
}
```

### File Naming

- **Components:** PascalCase - `UserProfile.tsx`
- **Utilities:** camelCase - `formatDate.ts`
- **Hooks:** camelCase with 'use' prefix - `useAuth.ts`
- **Types:** PascalCase - `User.types.ts`
- **Tests:** Same as source + `.test` - `Button.test.tsx`

### Code Organization

```
component/
├── ComponentName.tsx        # Main component
├── ComponentName.test.tsx   # Tests
├── ComponentName.styles.ts  # Styles (if needed)
├── ComponentName.types.ts   # Types (if complex)
└── index.ts                 # Re-export
```

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { View, Text } from 'react-native';

// 2. Internal absolute imports
import { Button } from '@app/shared-ui';
import { useAuth } from '@app/data';

// 3. Relative imports
import { Header } from './Header';
import { styles } from './styles';

// 4. Types
import type { User } from './types';
```

## Commit Guidelines

### Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

**Examples:**

```bash
# Simple commit
git commit -m "feat: add user authentication"

# With scope
git commit -m "fix(mobile): resolve splash screen crash on iOS"

# With body and footer
git commit -m "feat(data): add pagination to user list

Implemented cursor-based pagination for better performance
with large datasets.

Closes #123"
```

### Commit Best Practices

- **One logical change per commit**
- **Write clear, descriptive messages**
- **Use present tense** ("add feature" not "added feature")
- **Reference issues** in commit footer
- **Keep commits focused and atomic**

## Testing Guidelines

### Unit Tests

```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );

    expect(getByText('Click me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} disabled />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

### Integration Tests

Test interactions between components and data fetching:

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  it('should fetch todos successfully', async () => {
    const { result } = renderHook(() => useTodos(), {
      wrapper: QueryClientProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(3);
  });
});
```

### E2E Tests

```typescript
// login.e2e.ts (Playwright for web)
import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=Welcome')).toBeVisible();
});
```

### Test Coverage

Aim for:
- **Utilities/Helpers:** 90%+ coverage
- **Components:** 80%+ coverage
- **Hooks:** 80%+ coverage
- **Integration:** Key user flows

## Documentation

### Code Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Using setTimeout to delay API call after user stops typing (debounce)
setTimeout(() => fetchData(), 300);

// ❌ Bad: Stating the obvious
// This sets the counter to 0
setCounter(0);
```

### JSDoc for Public APIs

```typescript
/**
 * Formats a date string to a human-readable format
 *
 * @param date - ISO 8601 date string
 * @param format - Output format ('short' | 'long')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15T10:30:00Z', 'short')
 * // Returns: "Jan 15, 2024"
 */
export function formatDate(
  date: string,
  format: 'short' | 'long' = 'short'
): string {
  // ...
}
```

### README Updates

When adding new features, update relevant documentation:
- Main README.md
- Feature-specific docs in `docs/`
- API documentation
- Setup instructions

## Getting Help

- **Questions:** Open a [GitHub Discussion](https://github.com/YOUR-ORG/YOUR-REPO/discussions)
- **Bugs:** Create an [Issue](https://github.com/YOUR-ORG/YOUR-REPO/issues)
- **Chat:** Join our [Discord/Slack] (if applicable)

## Recognition

Contributors will be:
- Listed in CHANGELOG.md for their contributions
- Mentioned in release notes for significant features
- Added to contributors list (via all-contributors bot)

## Intellectual Property and Contributor License Agreement

### Important Legal Notice

**By submitting a contribution to this project, you agree to the following terms:**

#### 1. Copyright Assignment

You grant **William Finger** (the project owner):

- A **perpetual, worldwide, non-exclusive, royalty-free, irrevocable copyright license** to:
  - Use, reproduce, modify, display, perform, sublicense, and distribute your contributions
  - Incorporate your contributions into the project
  - Relicense the project (including your contributions) under different terms if needed

#### 2. Patent Grant

You grant **William Finger**:

- A **perpetual, worldwide, non-exclusive, royalty-free, irrevocable patent license** to:
  - Make, have made, use, sell, offer for sale, import, and otherwise transfer your contributions
  - Practice any patent claims you own that are necessarily infringed by your contributions

#### 3. Ownership and Rights

- **William Finger retains full ownership** of this project and all contributions
- You retain copyright in your contributions, but grant the above licenses
- You may use your contributions in other projects (subject to the MIT license)

#### 4. Representations and Warranties

By contributing, you represent that:

- You have the **legal right** to grant the above licenses
- Your contribution is your **original work** or you have rights to submit it
- Your contribution does **not violate** any third-party intellectual property rights
- You are **not aware** of any patents that would be infringed by your contribution
- Your employer (if applicable) has **waived rights** to your contribution, or you are authorized to contribute



#### 6. No Compensation

You understand that:

- Contributions are **voluntary** and **unpaid**
- No compensation is owed for contributions
- Recognition will be provided as outlined in the "Recognition" section

#### 7. Third-Party Code

If your contribution includes third-party code:

- It must be under a **compatible open-source license** (MIT, Apache 2.0, BSD, ISC)
- You must clearly **identify** the third-party code and its license
- You must include the original **copyright notices** and **license text**
- You must update the **NOTICE** file with attribution

#### 8. Acceptance

Your submission of a pull request constitutes your **acceptance** of these terms.

If you **cannot agree** to these terms, please **do not submit** a contribution.

#### 9. Questions

For questions about these terms, please contact:
- **William Finger** via [GitHub Issues](https://github.com/willbnu/Product-Blueprint/issues)

### Why We Need This

This CLA ensures that:

- The project owner can **defend** the project legally
- The project can be **relicensed** if needed (e.g., for commercial use)
- **Patent protection** is maintained
- All contributors have **authorized** their contributions
- The project remains **free and open** for everyone

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (**MIT License**), and you accept the Contributor License Agreement terms above.

---

Thank you for contributing! 🎉
