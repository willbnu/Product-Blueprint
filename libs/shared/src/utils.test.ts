import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, formatDate, sleep, truncate, generateId } from './utils';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should only execute once for multiple rapid calls', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the debounced function', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset timer on subsequent calls', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    vi.advanceTimersByTime(200);
    debouncedFn();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('formatDate', () => {
  it('should format Date objects', () => {
    const date = new Date('2024-01-15');
    const result = formatDate(date);
    // Result depends on locale, but should contain the year
    expect(result).toContain('2024');
  });

  it('should format date strings', () => {
    const result = formatDate('2024-06-20');
    expect(result).toContain('2024');
  });

  it('should handle invalid dates gracefully', () => {
    const result = formatDate('invalid-date');
    // Invalid dates result in "Invalid Date" being formatted
    expect(result).toContain('Invalid');
  });
});

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should resolve after specified milliseconds', async () => {
    const promise = sleep(1000);

    vi.advanceTimersByTime(500);
    // Promise should still be pending
    let resolved = false;
    promise.then(() => { resolved = true; });

    vi.advanceTimersByTime(500);
    await Promise.resolve();
    expect(resolved).toBe(true);
  });

  it('should resolve immediately with 0ms', async () => {
    vi.useRealTimers();
    const promise = sleep(0);
    await expect(promise).resolves.toBeUndefined();
    vi.useFakeTimers();
  });
});

describe('truncate', () => {
  it('should not truncate short strings', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('should truncate long strings with ellipsis', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('should handle empty strings', () => {
    expect(truncate('', 10)).toBe('');
  });

  it('should handle exact length strings', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('should handle length of 0', () => {
    expect(truncate('Hello', 0)).toBe('...');
  });
});

describe('generateId', () => {
  it('should generate a string', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
  });

  it('should generate non-empty IDs', () => {
    const id = generateId();
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate unique IDs', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    // All 100 IDs should be unique
    expect(ids.size).toBe(100);
  });

  it('should only contain alphanumeric characters', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});
