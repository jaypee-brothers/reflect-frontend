import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginRequest, LoginResponse } from '../types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      colleges: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login action
      login: async (credentials: LoginRequest) => {
        set({ loading: true, error: null });

        try {
          const response = await fetch('http://localhost/college/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
          }

          const data: LoginResponse = await response.json();

          set({
            user: data.user,
            colleges: data.user.colleges,
            accessToken: data.tokens.access,
            refreshToken: data.tokens.refresh,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
          throw error;
        }
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          colleges: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },

      // Clear error action
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        colleges: state.colleges,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
