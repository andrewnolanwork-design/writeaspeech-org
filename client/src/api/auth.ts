import { apiGet, apiPost } from './config';

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  speechCount?: number;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface UserResponse {
  user: User;
}

// Register a new user
export async function register(userData: RegisterData): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/register', userData);
}

// Login with email and password
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/login', credentials);
}

// Login with Google
export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/google', { idToken });
}

// Logout user
export async function logout(): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/logout');
}

// Get current user profile
export async function getCurrentUser(): Promise<UserResponse> {
  return apiGet<UserResponse>('/auth/me');
}

// Local storage helpers for token management
export const tokenStorage = {
  get: (): string | null => {
    return localStorage.getItem('auth_token');
  },
  
  set: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },
  
  remove: (): void => {
    localStorage.removeItem('auth_token');
  },
};

// User data helpers
export const userStorage = {
  get: (): User | null => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },
  
  set: (user: User): void => {
    localStorage.setItem('user_data', JSON.stringify(user));
  },
  
  remove: (): void => {
    localStorage.removeItem('user_data');
  },
};

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = tokenStorage.get();
  const user = userStorage.get();
  return !!(token && user);
}

// Get auth header for API requests
export function getAuthHeader(): Record<string, string> {
  const token = tokenStorage.get();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Clear all auth data
export function clearAuthData(): void {
  tokenStorage.remove();
  userStorage.remove();
}
