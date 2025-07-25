// API Service - Connected to Django backend
import { ApiResponse, PaginationParams, FilterParams } from './api-types';
import { apiInterceptor } from '../../utils/apiInterceptor';

class InstitutionalAPIService {
  private baseURL = process.env.BASE_URL;

  // Get college ID from auth store or UI store
  private getCollegeId(): string | null {
    try {
      // First, try to get selected college from UI store
      const uiStorage = localStorage.getItem('ui-storage');
      if (uiStorage) {
        const uiParsed = JSON.parse(uiStorage);
        const selectedCollege = uiParsed.state?.selectedCollege;

        if (selectedCollege) {
          // Get college ID from auth store colleges list
          const authStorage = localStorage.getItem('auth-storage');
          if (authStorage) {
            const authParsed = JSON.parse(authStorage);
            const colleges = authParsed.state?.colleges;
            if (colleges && colleges.length > 0) {
              const matchedCollege = colleges.find(
                (college: any) => college.name === selectedCollege,
              );
              if (matchedCollege) {
                return matchedCollege.id;
              }
            }
          }
        }
      }

      // Fallback: Get first college ID from auth store
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        const colleges = parsed.state?.colleges;
        if (colleges && colleges.length > 0) {
          return colleges[0].id;
        }
      }
    } catch (error) {
      console.error('Error getting college ID:', error);
    }
    // Fallback to default college ID
    return '6853b31b09db62797f220f7c';
  }

  // Get auth token from store
  private getAuthToken(): string | null {
    // Try to get token from localStorage (Zustand persist)
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.accessToken || null;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return null;
  }

  // Build standard query parameters with college_id and date range
  private buildQueryParams(customParams?: Record<string, any>): Record<string, any> {
    const collegeId = this.getCollegeId();

    // Get date range from custom params first, then UI store, then default
    let startDate = customParams?.start_date || '';
    let endDate = customParams?.end_date || '';

    // If no custom dates provided, get from UI store
    if (!startDate || !endDate) {
      try {
        const uiStorage = localStorage.getItem('ui-storage');
        if (uiStorage) {
          const uiParsed = JSON.parse(uiStorage);
          startDate = startDate || uiParsed.state?.startDate || '';
          endDate = endDate || uiParsed.state?.endDate || '';
        }
      } catch (error) {
        console.error('Error getting date range from UI store:', error);
      }
    }

    // Fallback to default date range (past 7 days) if not available
    if (!startDate || !endDate) {
      const fallbackEndDate = new Date();
      const fallbackStartDate = new Date();
      fallbackStartDate.setDate(fallbackEndDate.getDate() - 7);

      startDate = startDate || fallbackStartDate.toISOString().split('T')[0];
      endDate = endDate || fallbackEndDate.toISOString().split('T')[0];
    }

    const defaultParams = {
      college_id: collegeId,
      start_date: startDate,
      end_date: endDate,
    };

    // Remove custom date params from the final params to avoid duplication
    const { start_date, end_date, ...otherCustomParams } = customParams || {};

    return {
      ...defaultParams,
      ...otherCustomParams,
    };
  }

  // Handle API authentication errors and token refresh
  private async handleAuthError(response: Response): Promise<boolean> {
    if (response.status === 401) {
      // Token might be expired, try to refresh or redirect to login
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          const refreshToken = parsed.state?.refreshToken;

          if (refreshToken) {
            // Attempt token refresh
            const refreshResponse = await fetch(`${this.baseURL}/token/refresh/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              // Update the stored token
              parsed.state.accessToken = refreshData.access;
              localStorage.setItem('auth-storage', JSON.stringify(parsed));
              return true; // Indicate retry is possible
            }
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }

      // Clear auth state and redirect to login
      localStorage.removeItem('auth-storage');
      window.location.href = '/auth/login';
    }
    return false;
  }

  // API call method using the interceptor for automatic token refresh
  private async apiCall<T>(
    endpoint: string,
    params?: Record<string, any>,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
  ): Promise<ApiResponse<T>> {
    try {
      // Clean the endpoint
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      
      // For GET requests, add params as query parameters
      let url = cleanEndpoint;
      if (method === 'GET' && params) {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== null) {
            if (Array.isArray(params[key])) {
              params[key].forEach((value: string) => searchParams.append(key, value));
            } else {
              searchParams.append(key, params[key].toString());
            }
          }
        });
        url += `?${searchParams.toString()}`;
      }

      // For non-GET requests, merge params with body
      let requestBody = body;
      if (method !== 'GET' && params) {
        requestBody = { ...params, ...body };
      }

      // Use the interceptor which handles token refresh automatically
      const response = await apiInterceptor.request<T>({
        url,
        method,
        body: requestBody,
      });

      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

        const response = await fetch(url.toString(), requestConfig);

        if (!response.ok) {
          // Handle auth errors and retry if token was refreshed
          if (attempts === 0 && (await this.handleAuthError(response))) {
            attempts++;
            continue;
          }

          let errorMessage = 'API request failed';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.detail || errorMessage;
          } catch {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();

        return {
          success: true,
          data: data.data,
          message: 'Data fetched successfully',
          count: data.count || (Array.isArray(data) ? data.length : undefined),
        };
      } catch (error) {
        console.error(`API call failed for ${endpoint} (attempt ${attempts + 1}):`, error);

        if (attempts === maxAttempts - 1) {
          return {
            success: false,
            data: {} as T,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
          };
        }
      }
      attempts++;
    }

    return {
      success: false,
      data: {} as T,
      message: 'Max retry attempts reached',
    };
  }

  // Institution Overview APIs
  async getInstitutionOverview(params?: { timeRange?: string; days?: number }) {
    const queryParams = this.buildQueryParams({
      days: params?.days || 14,
      ...params,
    });
    return this.apiCall('/institution/overview/', queryParams, 'GET');
  }

  // Remove separate heatmap endpoint since it's now included in overview
  async getActivityHeatmap(params?: {
    timeRange?: string;
    days?: number;
    start_date?: string;
    end_date?: string;
  }) {
    const queryParams = this.buildQueryParams({
      days: params?.days || 7,
      ...params,
    });
    const result = await this.apiCall('/institution/activity-heatmap/', queryParams, 'GET');
    return result;
  }

  // Students APIs
  async getStudents(params?: PaginationParams & FilterParams) {
    const queryParams = this.buildQueryParams(params);
    return this.apiCall('/student-metrics/', queryParams, 'GET');
  }

  // Inactive Users API - New endpoint
  async getInactiveUsers(params?: PaginationParams & { min_inactive_days?: number }) {
    const collegeId = this.getCollegeId();
    const queryParams = this.buildQueryParams({ ...params, college_id: collegeId });
    return this.apiCall('/inactive-users/', queryParams, 'GET');
  }

  // Low Score Users API - Placeholder for future implementation
  async getLowScoreUsers(params?: PaginationParams & { min_score_threshold?: number }) {
    const collegeId = this.getCollegeId();
    const queryParams = this.buildQueryParams({ ...params, college_id: collegeId });
    return this.apiCall('/low-score-students/', queryParams, 'GET');
  }

  async getTopPerformers(params?: { limit?: number }) {
    const queryParams = this.buildQueryParams(params);
    return this.apiCall('/top-performers/', queryParams, 'GET');
  }

  // QBank APIs
  async getQBankModules(params?: { start_date?: string; end_date?: string; [key: string]: any }) {
    const queryParams = this.buildQueryParams(params);
    return this.apiCall('/qbank/modules/', queryParams, 'GET');
  }

  // QBank Insights API
  async getQbankInsights(params?: { category?: string }) {
    const queryParams = this.buildQueryParams({ ...params });
    return this.apiCall('/institution/qbank-insights/', { ...queryParams, type: 'qbank' }, 'GET');
  }

  // Test Series Insights API
  async getTestSeriesInsights(params?: { category?: string }) {
    const queryParams = this.buildQueryParams({ ...params });
    return this.apiCall('/test-insights/', { ...queryParams, type: 'test-series' }, 'GET');
  }

  // Content APIs
  async getVideoContent(params?: PaginationParams & FilterParams) {
    const queryParams = this.buildQueryParams(params);
    return this.apiCall('/content/videos/', queryParams, 'GET');
  }

  async getContentAnalyticsSummary(params?: { timeRange?: string }) {
    const queryParams = this.buildQueryParams(params);
    return this.apiCall('/content/analytics-summary/', queryParams, 'GET');
  }

  // Table Management APIs
  // QBank Analytics Table API
  async getQBankAnalyticsTable(
    params?: PaginationParams &
      FilterParams & {
        days?: number;
        subject?: string;
        difficulty?: string;
      },
  ) {
    const queryParams = this.buildQueryParams({
      days: params?.days || 14,
      page: params?.page || 1,
      page_size: params?.limit || 10,
      search: params?.search || '',
      subject: params?.subject || '',
      difficulty: params?.difficulty || '',
      ...params,
    });
    return this.apiCall('/qbank-modules/', queryParams, 'GET');
  }

  // User Management Table API
  async getUserManagementTable(
    params?: PaginationParams &
      FilterParams & {
        status?: string;
      },
  ) {
    const queryParams = this.buildQueryParams({
      page: params?.page || 1,
      page_size: params?.limit || 10,
      search: params?.search || '',
      status: params?.status || '',
      ...params,
    });
    return this.apiCall('/user-management/', queryParams, 'GET');
  }

  // Test Series Management Table API
  async getTestSeriesManagementTable(
    params?: PaginationParams &
      FilterParams & {
        days?: number;
        test_type?: string;
        difficulty_level?: string;
      },
  ) {
    const queryParams = this.buildQueryParams({
      days: params?.days || 14,
      page: params?.page || 1,
      page_size: params?.limit || 10,
      search: params?.search || '',
      test_type: params?.test_type || '',
      difficulty_level: params?.difficulty_level || '',
      ...params,
    });
    return this.apiCall('/test-series/', queryParams, 'GET');
  }

  // Video Content Management Table API
  async getVideoContentManagementTable(
    params?: PaginationParams &
      FilterParams & {
        days?: number;
        subject?: string;
        status?: string;
        category?: string;
        instructor?: string;
      },
  ) {
    const queryParams = this.buildQueryParams({
      page: params?.page || 1,
      page_size: params?.limit || 10,
      search: params?.search || '',
      subject: params?.subject || '',
      status: params?.status || '',
      category: params?.category || '',
      instructor: params?.instructor || '',
      ...params,
    });
    return this.apiCall('/video-contents/', queryParams, 'GET');
  }
}

// Export singleton instance
export const institutionalAPI = new InstitutionalAPIService();
export default institutionalAPI;
