# Testing Strategy

Comprehensive testing guide for unit, integration, and end-to-end testing across all platforms.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Types](#test-types)
- [Testing Stack](#testing-stack)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Testing Best Practices](#testing-best-practices)
- [Mocking](#mocking)
- [CI/CD Integration](#cicd-integration)
- [Coverage](#coverage)

## Testing Philosophy

### The Testing Pyramid

```
        ╱╲
       ╱E2E╲          ← Few, slow, high confidence
      ╱━━━━━━╲
     ╱  Integ ╲       ← Some, medium speed
    ╱━━━━━━━━━━╲
   ╱    Unit    ╲     ← Many, fast, low-level
  ╱━━━━━━━━━━━━━━╲
```

**Our Approach:**
- **70% Unit Tests:** Fast, isolated component/function tests
- **20% Integration Tests:** Test component interactions and data fetching
- **10% E2E Tests:** Critical user journeys only

### Key Principles

1. **Write tests first** (when possible) - TDD approach
2. **Test behavior, not implementation** - Refactoring shouldn't break tests
3. **Keep tests simple** - Tests should be easier to understand than the code
4. **Fail fast** - Tests should fail clearly when something breaks
5. **Maintain tests** - Treat test code with same care as production code

## Test Types

### Unit Tests
- **What:** Single function/component in isolation
- **When:** Every utility, hook, component
- **Speed:** <1ms per test
- **Example:** Button renders with correct text

### Integration Tests
- **What:** Multiple components working together
- **When:** Complex interactions, data flows
- **Speed:** ~100ms per test
- **Example:** Form validation with API call

### E2E Tests
- **What:** Full user flows end-to-end
- **When:** Critical business paths
- **Speed:** ~5-10s per test
- **Example:** User signup → login → dashboard

## Testing Stack

### Unit & Integration

| Platform | Framework | Utilities | Mocking |
|----------|-----------|-----------|---------|
| **Mobile** | Jest | @testing-library/react-native | MSW |
| **Web** | Jest | @testing-library/react | MSW |
| **Libraries** | Jest | Node test utils | Jest mocks |

### E2E

| Platform | Framework | Runtime |
|----------|-----------|---------|
| **Mobile (iOS)** | Detox | Simulator |
| **Mobile (Android)** | Detox | Emulator |
| **Web** | Playwright | Chromium/Firefox/WebKit |

## Unit Testing

### Testing Components

#### React Native Component (Mobile)

```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );

    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <Button title="Submit" onPress={mockPress} />
    );

    fireEvent.press(getByText('Submit'));

    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <Button title="Submit" onPress={mockPress} disabled />
    );

    fireEvent.press(getByText('Submit'));

    expect(mockPress).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Submit" onPress={() => {}} loading />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(queryByText('Submit')).toBeNull();
  });
});
```

#### React Component (Web)

```typescript
// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('validates email format', async () => {
    render(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    await userEvent.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });
});
```

### Testing Hooks

```typescript
// useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('starts with no user', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('updates user on login', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).toEqual({
      email: 'test@example.com',
      id: expect.any(String),
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('clears user on logout', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

### Testing Utilities

```typescript
// formatDate.test.ts
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats date in short format', () => {
    const date = '2024-01-15T10:30:00Z';
    expect(formatDate(date, 'short')).toBe('Jan 15, 2024');
  });

  it('formats date in long format', () => {
    const date = '2024-01-15T10:30:00Z';
    expect(formatDate(date, 'long')).toBe('January 15, 2024');
  });

  it('handles invalid dates gracefully', () => {
    expect(formatDate('invalid', 'short')).toBe('Invalid Date');
  });
});
```

## Integration Testing

### Testing with TanStack Query

```typescript
// useTodos.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTodos } from './useTodos';
import { server } from '../mocks/server';
import { rest } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useTodos', () => {
  it('fetches todos successfully', async () => {
    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toHaveLength(3);
    expect(result.current.data[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      completed: expect.any(Boolean),
    });
  });

  it('handles errors gracefully', async () => {
    server.use(
      rest.get('*/todos', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
  });
});
```

### Testing Forms

```typescript
// TodoForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  it('creates new todo on submit', async () => {
    const mockOnCreate = jest.fn();
    render(<TodoForm onCreateTodo={mockOnCreate} />);

    const input = screen.getByPlaceholderText(/add a todo/i);
    fireEvent.changeText(input, 'Buy groceries');

    const submitButton = screen.getByRole('button', { name: /add/i });
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith({
        title: 'Buy groceries',
        completed: false,
      });
    });

    // Input should be cleared
    expect(input.props.value).toBe('');
  });

  it('shows validation error for empty input', async () => {
    render(<TodoForm onCreateTodo={() => {}} />);

    const submitButton = screen.getByRole('button', { name: /add/i });
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeTruthy();
    });
  });
});
```

## E2E Testing

### Mobile E2E (Detox)

#### Setup

```javascript
// .detoxrc.js
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/YourApp.app',
      build: 'xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Debug -sdk iphonesimulator',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15 Pro',
      },
    },
  },
  configurations: {
    'ios.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
  },
};
```

#### Test Example

```typescript
// e2e/login.test.ts
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully with valid credentials', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();

    await waitFor(element(by.text('Welcome')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show error with invalid credentials', async () => {
    await element(by.id('email-input')).typeText('wrong@example.com');
    await element(by.id('password-input')).typeText('wrongpass');
    await element(by.id('login-button')).tap();

    await waitFor(element(by.text('Invalid credentials')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
```

### Web E2E (Playwright)

#### Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'pnpm dev:web',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### Test Example

```typescript
// e2e/todo-app.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Todo Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/todos');
  });

  test('should create a new todo', async ({ page }) => {
    await page.fill('[placeholder="Add a todo"]', 'Buy groceries');
    await page.press('[placeholder="Add a todo"]', 'Enter');

    await expect(page.locator('text=Buy groceries')).toBeVisible();
  });

  test('should mark todo as complete', async ({ page }) => {
    // Create a todo first
    await page.fill('[placeholder="Add a todo"]', 'Test task');
    await page.press('[placeholder="Add a todo"]', 'Enter');

    // Mark as complete
    await page.click('[data-testid="todo-checkbox"]');

    await expect(page.locator('[data-testid="todo-item"]')).toHaveClass(
      /completed/
    );
  });

  test('should delete a todo', async ({ page }) => {
    // Create a todo
    await page.fill('[placeholder="Add a todo"]', 'Task to delete');
    await page.press('[placeholder="Add a todo"]', 'Enter');

    // Delete it
    await page.click('[data-testid="delete-button"]');

    await expect(page.locator('text=Task to delete')).not.toBeVisible();
  });
});
```

## Testing Best Practices

### 1. AAA Pattern (Arrange-Act-Assert)

```typescript
it('should calculate total price', () => {
  // Arrange
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];

  // Act
  const total = calculateTotal(items);

  // Assert
  expect(total).toBe(35);
});
```

### 2. Use Descriptive Test Names

```typescript
// ❌ Bad
it('works', () => {});

// ✅ Good
it('should display error message when email is invalid', () => {});
```

### 3. Test One Thing at a Time

```typescript
// ❌ Bad - testing multiple things
it('handles user interactions', () => {
  // Tests button click
  // Tests form submission
  // Tests navigation
  // Tests data fetching
});

// ✅ Good - focused tests
it('should submit form when button is clicked', () => {});
it('should navigate to dashboard after successful login', () => {});
it('should fetch user data on mount', () => {});
```

### 4. Avoid Testing Implementation Details

```typescript
// ❌ Bad - testing internal state
expect(component.state.isOpen).toBe(true);

// ✅ Good - testing user-visible behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

### 5. Use Test IDs Sparingly

```typescript
// ✅ Prefer accessible queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByText(/welcome/i);

// ⚠️ Use testID only when necessary
screen.getByTestId('complex-component');
```

## Mocking

### MSW (Mock Service Worker)

```typescript
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('*/todos', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', title: 'Test todo 1', completed: false },
        { id: '2', title: 'Test todo 2', completed: true },
      ])
    );
  }),

  rest.post('*/todos', async (req, res, ctx) => {
    const newTodo = await req.json();
    return res(
      ctx.json({
        id: '3',
        ...newTodo,
      })
    );
  }),
];

// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// jest.setup.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Mocking Supabase

```typescript
// __mocks__/@supabase/supabase-js.ts
export const supabase = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: {}, error: null }),
  })),
  auth: {
    signIn: jest.fn().mockResolvedValue({ data: {}, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
  },
};
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Run linting
        run: pnpm lint

      - name: Run type checking
        run: pnpm typecheck

      - name: Run unit tests
        run: pnpm test --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Coverage

### Coverage Goals

- **Utilities:** 90%+ coverage
- **Components:** 80%+ coverage
- **Hooks:** 80%+ coverage
- **Integration:** 70%+ coverage

### Generating Reports

```bash
# Run tests with coverage
pnpm test --coverage

# View HTML report
open coverage/lcov-report/index.html
```

### Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
  ],
};
```

## Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Specific project
pnpm nx test mobile
pnpm nx test web

# E2E tests
pnpm e2e

# Mobile E2E
pnpm mobile:e2e:ios
pnpm mobile:e2e:android

# Web E2E
pnpm web:e2e

# Affected tests only
pnpm nx affected:test
```

---

For more information:
- [Development Workflow](./DEVELOPMENT.md)
- [CI/CD Guide](./docs/CICD.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
