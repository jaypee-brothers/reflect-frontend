// API Service for Student Profile
import { apiInterceptor } from '../../utils/apiInterceptor';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/college/api';

class StudentAPIService {
  // Get college ID from auth store or UI store (copied from InstitutionalAPIService)
  private getCollegeId(): string | null {
    try {
      const uiStorage = localStorage.getItem('ui-storage');
      if (uiStorage) {
        const uiParsed = JSON.parse(uiStorage);
        const selectedCollege = uiParsed.state?.selectedCollege;
        if (selectedCollege) {
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
    return '6853b31b09db62797f220f7c';
  }

  // Get start_date and end_date from UI store or params
  private getDateParams(customParams?: Record<string, any>) {
    let startDate = customParams?.start_date || '';
    let endDate = customParams?.end_date || '';
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
    if (!startDate || !endDate) {
      const fallbackEndDate = new Date();
      const fallbackStartDate = new Date();
      fallbackStartDate.setDate(fallbackEndDate.getDate() - 7);
      startDate = startDate || fallbackStartDate.toISOString().split('T')[0];
      endDate = endDate || fallbackEndDate.toISOString().split('T')[0];
    }
    return { start_date: startDate, end_date: endDate };
  }

  private buildQueryParams(customParams?: Record<string, any>) {
    const collegeId = this.getCollegeId() || '';
    const { start_date, end_date } = this.getDateParams(customParams);
    const { start_date: _sd, end_date: _ed, ...otherCustomParams } = customParams || {};
    // Convert all values to string for URLSearchParams
    const params: Record<string, string> = {
      college_id: collegeId,
      start_date: start_date || '',
      end_date: end_date || '',
      ...Object.fromEntries(
        Object.entries(otherCustomParams).map(([k, v]) => [k, v == null ? '' : String(v)]),
      ),
    };
    return params;
  }

  async getSummary(params: { user_id: string; [key: string]: any }) {
    try {
      const { user_id, ...rest } = params;
      const queryParams = this.buildQueryParams(rest);
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await apiInterceptor.get(
        `${baseURL}/student/summary/${user_id}/?${queryString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching student summary:', error);
      return null;
    }
  }

  async getLoginHeatmap(params: { start_date?: string; end_date?: string; user_id: string }) {
    try {
      const { user_id, ...rest } = params;
      const queryParams = this.buildQueryParams(rest);
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await apiInterceptor.get(
        `${baseURL}/student/login-activity/${user_id}/?${queryString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching login heatmap:', error);
      return null;
    }
  }

  async getVideoActivity(params: { start_date: string; end_date: string; user_id: string }) {
    try {
      const { user_id, ...rest } = params;
      const queryParams = this.buildQueryParams(rest);
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await apiInterceptor.get(
        `${baseURL}/student/video-activity/${user_id}/?${queryString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching video activity:', error);
      return null;
    }
  }

  async getTestPerformance(params: { user_id: string; [key: string]: any }) {
    try {
      const { user_id, ...rest } = params;
      const queryParams = this.buildQueryParams(rest);
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await apiInterceptor.get(
        `${baseURL}/student/test-performance/${user_id}/?${queryString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching test performance:', error);
      return null;
    }
  }

  // New: Fetch recent videos from a separate API endpoint
  async getRecentVideos(params: { user_id: string; start_date: string; end_date: string }) {
    try {
      const { user_id, start_date, end_date } = params;
      // No college_id needed for this endpoint
      const response = await apiInterceptor.get(
        `${baseURL}/recent-watched-videos/${user_id}/?start_date=${start_date}&end_date=${end_date}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching recent videos:', error);
      return null;
    }
  }
}

export const studentAPI = new StudentAPIService();
export default studentAPI;
