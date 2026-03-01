/**
 * Shared Utility Functions
 *
 * These are ready-to-use utility functions for projects built from this blueprint.
 * They are exported for convenience even if not currently used in the main apps.
 *
 * Usage:
 *   import { debounce, formatDate, sleep, truncate, generateId } from '@pb/shared';
 */

/**
 * Debounce function - delays execution until after a pause in calls
 * @example
 *   const debouncedSearch = debounce((query) => fetchResults(query), 300);
 *   debouncedSearch('test'); // Will only execute after 300ms of no calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Format date to locale string
 * @example
 *   formatDate(new Date()) // "Mar 1, 2026"
 *   formatDate('2024-01-15') // "Jan 15, 2024"
 */
export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Sleep utility - pauses execution for specified milliseconds
 * @example
 *   await sleep(1000); // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate string with ellipsis
 * @example
 *   truncate('Hello World', 8) // "Hello..."
 */
export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

/**
 * Generate random ID - useful for temporary keys
 * @example
 *   generateId() // "k5j2x9m3n4p"
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}
