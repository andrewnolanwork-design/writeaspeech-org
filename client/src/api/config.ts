// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// HTTP request helper
export class ApiError extends Error {
  public status: number;
  public data?: any;
  
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Debug logging for payment requests
  if (endpoint.includes('payment')) {
    console.log('🌐 API Request:', { url, method: config.method, body: config.body });
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      0,
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
}

// GET request
export function apiGet<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
    headers,
  });
}

// POST request
export function apiPost<T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// PUT request
export function apiPut<T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// DELETE request
export function apiDelete<T>(
  endpoint: string,
  headers?: Record<string, string>
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
    headers,
  });
}
