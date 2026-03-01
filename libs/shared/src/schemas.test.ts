import { describe, it, expect } from 'vitest';
import {
  emailSchema,
  passwordSchema,
  loginSchema,
  registerSchema,
  userProfileSchema,
} from './schemas';

describe('emailSchema', () => {
  it('should accept valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@example.com',
      'user+tag@example.org',
      'user@subdomain.example.com',
    ];

    validEmails.forEach((email) => {
      const result = emailSchema.safeParse(email);
      expect(result.success).toBe(true);
    });
  });

  it('should reject invalid email addresses', () => {
    const invalidEmails = [
      'plainstring',
      '@example.com',
      'user@',
      'user@example',
      '',
    ];

    invalidEmails.forEach((email) => {
      const result = emailSchema.safeParse(email);
      expect(result.success).toBe(false);
    });
  });
});

describe('passwordSchema', () => {
  it('should accept passwords with 6 or more characters', () => {
    const validPasswords = ['123456', 'password123', 'P@ssw0rd!', '      '];

    validPasswords.forEach((password) => {
      const result = passwordSchema.safeParse(password);
      expect(result.success).toBe(true);
    });
  });

  it('should reject passwords with fewer than 6 characters', () => {
    const invalidPasswords = ['', '1', '12345'];

    invalidPasswords.forEach((password) => {
      const result = passwordSchema.safeParse(password);
      expect(result.success).toBe(false);
    });
  });

  it('should return correct error message for short passwords', () => {
    const result = passwordSchema.safeParse('12345');
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters');
    }
  });
});

describe('loginSchema', () => {
  it('should accept valid login input', () => {
    const validInput = {
      email: 'user@example.com',
      password: 'password123',
    };

    const result = loginSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject login with invalid email', () => {
    const invalidInput = {
      email: 'not-an-email',
      password: 'password123',
    };

    const result = loginSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject login with short password', () => {
    const invalidInput = {
      email: 'user@example.com',
      password: '12345',
    };

    const result = loginSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject login with missing fields', () => {
    const missingEmail = { password: 'password123' };
    const missingPassword = { email: 'user@example.com' };
    const empty = {};

    expect(loginSchema.safeParse(missingEmail).success).toBe(false);
    expect(loginSchema.safeParse(missingPassword).success).toBe(false);
    expect(loginSchema.safeParse(empty).success).toBe(false);
  });
});

describe('registerSchema', () => {
  it('should accept valid registration input', () => {
    const validInput = {
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = registerSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject registration with mismatched passwords', () => {
    const invalidInput = {
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'different123',
    };

    const result = registerSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);

    if (!result.success) {
      const confirmPasswordIssue = result.error.issues.find(
        (issue) => issue.path[0] === 'confirmPassword'
      );
      expect(confirmPasswordIssue?.message).toBe('Passwords do not match');
    }
  });

  it('should reject registration with invalid email', () => {
    const invalidInput = {
      email: 'not-an-email',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = registerSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject registration with short password', () => {
    const invalidInput = {
      email: 'user@example.com',
      password: '12345',
      confirmPassword: '12345',
    };

    const result = registerSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});

describe('userProfileSchema', () => {
  const validProfile = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'user@example.com',
    displayName: 'John Doe',
    avatarUrl: 'https://example.com/avatar.png',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  it('should accept valid user profile', () => {
    const result = userProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('should accept profile without optional fields', () => {
    const minimalProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'user@example.com',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    const result = userProfileSchema.safeParse(minimalProfile);
    expect(result.success).toBe(true);
  });

  it('should reject profile with invalid UUID', () => {
    const invalidProfile = {
      ...validProfile,
      id: 'not-a-uuid',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('should reject profile with invalid email', () => {
    const invalidProfile = {
      ...validProfile,
      email: 'not-an-email',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('should reject profile with invalid avatar URL', () => {
    const invalidProfile = {
      ...validProfile,
      avatarUrl: 'not-a-url',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('should reject profile with invalid datetime', () => {
    const invalidProfile = {
      ...validProfile,
      createdAt: 'not-a-datetime',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });
});
