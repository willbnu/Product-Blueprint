/**
 * API Response wrapper type
 */
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}

/**
 * Pagination params
 */
export interface PaginationParams {
    page: number;
    limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

/**
 * Auth user type (minimal, for both platforms)
 */
export interface AuthUser {
    id: string;
    email: string;
    createdAt: string;
}

/**
 * App theme type
 */
export type Theme = 'light' | 'dark' | 'system';
