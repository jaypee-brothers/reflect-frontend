// API Interceptor - Handles automatic token refresh and request retries
import { useAuthStore } from '../stores/authStore';

interface ApiRequestConfig {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

class ApiInterceptor {
  private baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/college/api';
  private maxRetries = 1;

  async request<T = any>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { url, method = 'GET', headers = {}, body } = config;

    // Get a valid token (auto-refresh if needed)
    const token = await useAuthStore.getState().getValidToken();

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add authorization header if token exists
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    // Construct full URL
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    try {
      const response = await fetch(fullUrl, fetchOptions);

      // If unauthorized, try to refresh token and retry once
      if (response.status === 401 && this.maxRetries > 0) {
        console.log('Received 401, attempting token refresh...');

        // Try to refresh the token
        const newToken = await useAuthStore.getState().refreshAccessToken();

        if (newToken) {
          // Retry the request with the new token
          requestHeaders['Authorization'] = `Bearer ${newToken}`;
          fetchOptions.headers = requestHeaders;

          const retryResponse = await fetch(fullUrl, fetchOptions);

          return {
            data: await this.parseResponse(retryResponse),
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            headers: retryResponse.headers,
          };
        } else {
          // Refresh failed, logout user and redirect to login
          useAuthStore.getState().logout();

          // Redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }

          throw new Error('Authentication failed. Please login again.');
        }
      }

      // Handle other error responses
      if (!response.ok) {
        const errorData = await this.parseResponse(response);
        throw new Error(errorData?.message || `Request failed with status ${response.status}`);
      }

      return {
        data: await this.parseResponse(response),
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  private async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  }

  // Convenience methods
  async get<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'GET', headers });
  }

  async post<T = any>(
    url: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'POST', body, headers });
  }

  async put<T = any>(
    url: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'PUT', body, headers });
  }

  async delete<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'DELETE', headers });
  }

  async patch<T = any>(
    url: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'PATCH', body, headers });
  }
}

// Export a singleton instance
export const apiInterceptor = new ApiInterceptor();
