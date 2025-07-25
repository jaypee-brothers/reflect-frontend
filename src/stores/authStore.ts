import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { AuthState, LoginRequest, LoginResponse } from '../types/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/college/api';

interface AuthStore extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshAccessToken: () => Promise<string | null>;
  getValidToken: () => Promise<string | null>;
  isTokenExpired: (token: string) => boolean;
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
          const response = await fetch(`${baseURL}/login/`, {
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

      // Check if token is expired
      isTokenExpired: (token: string): boolean => {
        try {
          const decoded: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decoded.exp < currentTime;
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      },

      // Refresh access token using refresh token
      refreshAccessToken: async (): Promise<string | null> => {
        const { refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
          console.log('No refresh token available');
          return null;
        }

        try {
          const response = await fetch(`${baseURL}/token/refresh/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (!response.ok) {
            console.error('Token refresh failed:', response.status);
            // If refresh fails, logout the user
            useAuthStore.getState().logout();
            return null;
          }

          const data = await response.json();
          const newAccessToken = data.access;

          // Update the access token in the store
          set((state) => ({
            ...state,
            accessToken: newAccessToken,
          }));

          console.log('Token refreshed successfully');
          return newAccessToken;
        } catch (error) {
          console.error('Error refreshing token:', error);
          useAuthStore.getState().logout();
          return null;
        }
      },

      // Get a valid token (refresh if necessary)
      getValidToken: async (): Promise<string | null> => {
        const { accessToken, isTokenExpired } = useAuthStore.getState();

        if (!accessToken) {
          console.log('No access token available');
          return null;
        }

        // Check if current token is expired
        if (isTokenExpired(accessToken)) {
          console.log('Access token expired, attempting refresh...');
          return await useAuthStore.getState().refreshAccessToken();
        }

        return accessToken;
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
