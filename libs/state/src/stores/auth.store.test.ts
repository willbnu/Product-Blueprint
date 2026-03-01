import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './auth.store';
import type { User, Session } from '@supabase/supabase-js';

// Mock user and session
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00Z',
} as User;

const mockSession = {
  access_token: 'test-token',
  refresh_token: 'test-refresh',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockUser,
} as Session;

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      user: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
    });
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setUser', () => {
    it('should set user and update isAuthenticated', () => {
      const { setUser } = useAuthStore.getState();

      setUser(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should clear user when set to null', () => {
      const { setUser } = useAuthStore.getState();

      setUser(mockUser);
      setUser(null);

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setSession', () => {
    it('should set session and derive user', () => {
      const { setSession } = useAuthStore.getState();

      setSession(mockSession);

      const state = useAuthStore.getState();
      expect(state.session).toEqual(mockSession);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should clear session when set to null', () => {
      const { setSession } = useAuthStore.getState();

      setSession(mockSession);
      setSession(null);

      const state = useAuthStore.getState();
      expect(state.session).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setLoading', () => {
    it('should update isLoading state', () => {
      const { setLoading } = useAuthStore.getState();

      setLoading(true);
      expect(useAuthStore.getState().isLoading).toBe(true);

      setLoading(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      const { setSession, reset } = useAuthStore.getState();

      setSession(mockSession);
      reset();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
