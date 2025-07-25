// API Types - Simulating real backend API structure
// These interfaces represent what your Django APIs will return

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface FilterParams {
  search?: string;
  profs?: string[];
  timeRange?: string;
  category?: string;
  difficulty?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Institution Overview API Endpoints
export interface InstitutionStatsAPI {
  '/api/institution/overview/': {
    params: { timeRange?: string };
    response: ApiResponse<{
      summaryStats: {
        activatedLicenses: number;
        loginRate: number;
        avgTimeSpent: string;
        avgTestScore: number;
        avgTestAttempts: number;
      };
    }>;
  };
  '/api/institution/activity-heatmap/': {
    params: {
      timeRange?: string;
      days?: number;
      start_date?: string;
      end_date?: string;
      forceRefresh?: boolean;
    };
    response: ApiResponse<{
      heatmapData: Array<{
        date: string;
        day: string;
        intensity: number;
      }>;
    }>;
  };
}

// Students API Endpoints
export interface StudentsAPI {
  '/api/students/': {
    params: PaginationParams & FilterParams;
    response: ApiResponse<{
      students: Array<{
        id: number;
        name: string;
        email: string;
        professor: string;
        totalLogins: number;
        lastLogin: string;
        videosWatched: number;
        qbankAttempted: number;
        testsTaken: number;
        isActive: boolean;
        avgScore?: number;
        rank?: number;
      }>;
    }>;
  };
  '/api/students/red-zone/': {
    params: { type?: 'low-score' | 'inactive' | 'all' };
    response: ApiResponse<{
      lowScoreStudents: Array<{
        id: number;
        name: string;
        email: string;
        avgScore: number;
        testsAttempted: number;
      }>;
      inactiveStudents: Array<{
        id: number;
        name: string;
        email: string;
        daysSinceLogin: number;
      }>;
    }>;
  };
  '/api/students/top-performers/': {
    params: { limit?: number };
    response: ApiResponse<{
      students: Array<{
        id: number;
        name: string;
        email: string;
        rank: number;
        avgScore: number;
        testsAttempted: number;
        improvementTrend: 'up' | 'down' | 'stable';
        lastTestScore: number;
      }>;
    }>;
  };
}

// QBank & Tests API Endpoints
export interface QBankAPI {
  '/api/qbank/modules/': {
    params: PaginationParams & FilterParams;
    response: ApiResponse<{
      modules: Array<{
        id: number;
        name: string;
        attempts: number;
        avgScore: number;
        difficulty: 'Easy' | 'Medium' | 'Hard';
        completionRate: number;
        category?: string;
      }>;
    }>;
  };
  '/api/institution/qbank-insights/': {
    params: { type?: 'qbank' | 'test-series'; category?: string };
    response: ApiResponse<{
      qbanks: Array<{
        id: number;
        name: string;
        subject: string;
        avgScore: number;
        attempts: number;
        difficulty: 'Easy' | 'Medium' | 'Hard';
        category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical';
      }>;
      qbank_summary: {
        totalAttempts: number;
        avgScore: number;
        difficultyDistribution: {
          easy: number;
          medium: number;
          hard: number;
        };
      };
    }>;
  };
  '/api/test-insights/': {
    params: { type?: 'qbank' | 'test-series'; category?: string };
    response: ApiResponse<{
      tests: Array<{
        id: number;
        name: string;
        subject: string;
        avgScore: number;
        attempts: number;
        difficulty: 'Easy' | 'Medium' | 'Hard';
        category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical';
      }>;
      summary: {
        totalAttempts: number;
        avgScore: number;
        difficultyDistribution: {
          easy: number;
          medium: number;
          hard: number;
        };
      };
    }>;
  };
}

// Content API Endpoints
export interface ContentAPI {
  '/api/content/videos/': {
    params: PaginationParams & FilterParams;
    response: ApiResponse<{
      videos: Array<{
        id: number;
        title: string;
        views: number;
        duration: string;
        category: string;
        engagementRate: number;
      }>;
    }>;
  };
  '/api/content/analytics-summary/': {
    params: { timeRange?: string };
    response: ApiResponse<{
      videoStats: {
        totalViews: number;
        avgWatchTime: string;
        avgCompletion: number;
      };
      qbankStats: {
        totalAttempts: number;
        avgScore: number;
      };
    }>;
  };
}

// Table Management API Endpoints
export interface TableManagementAPI {
  // QBank Analytics Table
  '/api/qbank-modules/': {
    params: PaginationParams &
      FilterParams & {
        days?: number;
        college_id?: string;
        subject?: string;
        difficulty?: string;
      };
    response: ApiResponse<{
      qbank_modules: Array<{
        id: number;
        qbank_name: string;
        subject: string;
        difficulty: 'Easy' | 'Medium' | 'Hard';
        no_of_questions: number;
        total_attempts: number;
        total_completed: number;
        average_score: number;
        top_score: number;
        created_at: string;
        updated_at: string;
      }>;
      total_count: number;
      page_info: {
        current_page: number;
        total_pages: number;
        has_next: boolean;
        has_previous: boolean;
      };
    }>;
  };

  // User Management Table
  '/api/user-management/': {
    params: PaginationParams &
      FilterParams & {
        college_id?: string;
        status?: string;
      };
    response: ApiResponse<{
      users: Array<{
        id: number;
        user_name: string;
        email: string;
        last_login: string;
        status: 'Active' | 'Inactive' | 'Suspended';
        tests_completed: number;
        avg_score: number;
        join_date: string;
      }>;
      total_count: number;
      page_info: {
        current_page: number;
        total_pages: number;
        has_next: boolean;
        has_previous: boolean;
      };
    }>;
  };

  // Test Series Management Table
  '/api/test-series/': {
    params: PaginationParams &
      FilterParams & {
        days?: number;
        college_id?: string;
        subject?: string;
        status?: string;
      };
    response: ApiResponse<{
      test_series: Array<{
        serial_number: number;
        series_id: string;
        series_name: string;
        subject: string;
        total_tests: number;
        total_students: number;
        avg_score: number;
        completion_rate: number;
        duration: string;
        status: 'Active' | 'Completed' | 'Draft' | 'Inactive';
        created_at: string;
        updated_at: string;
      }>;
      current_page: number;
      total_pages: number;
      total_count: number;
      has_next: boolean;
      has_previous: boolean;
    }>;
  };

  // Video Content Management Table
  '/api/video-content-management/': {
    params: PaginationParams &
      FilterParams & {
        days?: number;
        college_id?: string;
        subject?: string;
        status?: string;
        category?: string;
        instructor?: string;
      };
    response: ApiResponse<{
      videos: Array<{
        id: number;
        video_title: string;
        instructor: string;
        subject: string;
        duration: string;
        views: number;
        likes: number;
        avg_rating: number;
        upload_date: string;
        status: 'Published' | 'Under Review' | 'Draft' | 'Private';
        category: 'Lecture' | 'Tutorial' | 'Case Study' | 'Educational';
      }>;
      total_count: number;
      page_info: {
        current_page: number;
        total_pages: number;
        has_next: boolean;
        has_previous: boolean;
      };
    }>;
  };
}

// Combined API Interface
export interface InstitutionalAPI
  extends InstitutionStatsAPI,
    StudentsAPI,
    QBankAPI,
    ContentAPI,
    TableManagementAPI {}
