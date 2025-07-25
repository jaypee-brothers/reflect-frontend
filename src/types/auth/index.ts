// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface College {
  id: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  date_joined: string;
  colleges: College[];
}

export interface LoginResponse {
  message: string;
  user: User;
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface AuthState {
  user: User | null;
  colleges: College[] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
