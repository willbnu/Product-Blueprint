import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Invalid email address');

/**
 * Password validation schema
 * - Minimum 6 characters
 */
export const passwordSchema = z
    .string()
    .min(6, 'Password must be at least 6 characters');

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

/**
 * Registration form validation schema
 */
export const registerSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

/**
 * User profile schema
 */
export const userProfileSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    displayName: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

// Export types inferred from schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
