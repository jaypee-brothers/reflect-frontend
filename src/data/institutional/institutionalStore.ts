import { create } from 'zustand';
import {
  Student,
  InstitutionSummaryStats,
  HeatmapDataPoint,
  VideoContent,
  QBankModule,
  RedZoneStudent,
  InactiveUser,
  qbankInsights,
  QBankAnalyticsData,
  UserManagementData,
  TestSeriesManagementData,
  VideoContentManagementData,
  TablePaginationInfo,
} from '../institutionalConstants';
import { institutionalAPI } from './api-service';
import { PaginationParams, FilterParams } from './api-types';

// API-First Zustand Store - Simulates real Django backend integration
// Each method corresponds to a specific API endpoint

interface InstitutionalState {
  // Data states - organized by API endpoint
  institutionStats: {
    data: InstitutionSummaryStats | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  activityHeatmap: {
    data: HeatmapDataPoint[] | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  students: {
    data: Student[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
    totalCount: number;
    currentPage: number;
    hasNext: boolean;
  };

  inactiveUsers: {
    data: InactiveUser[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  lowScoreUsers: {
    data: RedZoneStudent[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  topStudents: {
    data: Student[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  qbankModules: {
    data: QBankModule[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  testSeriesInsights: {
    data: {
      summary: {
        totalAttempts: number;
        avgScore: number;
        difficultyDistribution: {
          easy: number;
          medium: number;
          hard: number;
        };
      };
    } | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  qbankInsights: {
    data: qbankInsights | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  videoContent: {
    data: VideoContent[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  contentSummary: {
    data: {
      video_analytics: {
        total_views: number;
        avg_watch_time: string;
        avg_completion_rate: number;
        top_watched_videos: any[];
      };
      qbank_analytics: {
        total_attempts: number;
        avg_score: number;
        completion_rate: number;
        top_performing_modules: any[];
      };
      overall_summary: {
        avg_total_watched_time: string;
        avg_video_watch_percent: number;
        avg_qbank_accuracy: number;
        total_qbank_attempts: number;
      };
    } | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
  };

  // Table Management States
  qbankAnalyticsTable: {
    data: QBankAnalyticsData[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
    totalCount: number;
    currentPage: number;
    pagination: TablePaginationInfo | null;
    lastLimit: number;
  };

  userManagementTable: {
    data: UserManagementData[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
    totalCount: number;
    currentPage: number;
    pagination: TablePaginationInfo | null;
    lastLimit: number;
  };

  testSeriesManagementTable: {
    data: TestSeriesManagementData[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
    totalCount: number;
    currentPage: number;
    pagination: TablePaginationInfo | null;
    lastLimit: number;
  };

  videoContentManagementTable: {
    data: VideoContentManagementData[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
    totalCount: number;
    currentPage: number;
    pagination: TablePaginationInfo | null;
    lastLimit: number;
  };

  // Actions - Each corresponds to an API endpoint
  fetchInstitutionStats: (params?: { timeRange?: string }) => Promise<void>;
  fetchActivityHeatmap: (params?: {
    timeRange?: string;
    days?: number;
    start_date?: string;
    end_date?: string;
    forceRefresh?: boolean;
  }) => Promise<void>;
  fetchStudents: (params?: PaginationParams & FilterParams) => Promise<void>;
  fetchInactiveUsers: (params?: PaginationParams & { min_inactive_days?: number }) => Promise<void>;
  fetchLowScoreUsers: (
    params?: PaginationParams & { min_score_threshold?: number },
  ) => Promise<void>;
  fetchTopStudents: (params?: { limit?: number }) => Promise<void>;
  fetchQBankModules: (params?: PaginationParams & FilterParams) => Promise<void>;

  fetchQbankInsights: (params?: {
    type?: 'qbank' | 'test-series';
    category?: string;
  }) => Promise<void>;
  fetchVideoContent: (params?: PaginationParams & FilterParams) => Promise<void>;
  fetchContentSummary: (params?: { timeRange?: string }) => Promise<void>;

  // Table Management Actions
  fetchQBankAnalyticsTable: (
    params?: PaginationParams &
      FilterParams & {
        days?: number;
        subject?: string;
        difficulty?: string;
      },
  ) => Promise<void>;
  fetchUserManagementTable: (
    params?: PaginationParams &
      FilterParams & {
        status?: string;
      },
  ) => Promise<void>;
  fetchTestSeriesManagementTable: (
    params?: PaginationParams &
      FilterParams & {
        days?: number;
        subject?: string;
        status?: string;
      },
  ) => Promise<void>;
  fetchVideoContentManagementTable: (
    params?: PaginationParams &
      FilterParams & {
        days?: number;
        subject?: string;
        status?: string;
        category?: string;
        instructor?: string;
      },
  ) => Promise<void>;

  // Utility actions
  clearCache: (endpoint?: string) => void;
  refreshAll: () => Promise<void>;
}

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper to check if data is fresh
const isCacheFresh = (lastFetched: number | null): boolean => {
  if (!lastFetched) return false;
  return Date.now() - lastFetched < CACHE_DURATION;
};

export const useInstitutionalStore = create<InstitutionalState>((set, get) => ({
  // Initial state for all endpoints
  institutionStats: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  activityHeatmap: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  students: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
    totalCount: 0,
    currentPage: 1,
    hasNext: false,
  },

  inactiveUsers: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  lowScoreUsers: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  topStudents: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  qbankModules: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  testSeriesInsights: {
    data: {
      summary: {
        totalAttempts: 0,
        avgScore: 0,
        difficultyDistribution: {
          easy: 0,
          medium: 0,
          hard: 0,
        },
      },
    },
    loading: false,
    error: null,
    lastFetched: null,
  },

  qbankInsights: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  videoContent: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  contentSummary: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Table Management Initial States
  qbankAnalyticsTable: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
    totalCount: 0,
    currentPage: 1,
    pagination: null,
    lastLimit: 10,
  },

  userManagementTable: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
    totalCount: 0,
    currentPage: 1,
    pagination: null,
    lastLimit: 10,
  },

  testSeriesManagementTable: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
    totalCount: 0,
    currentPage: 1,
    pagination: null,
    lastLimit: 10,
  },

  videoContentManagementTable: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
    totalCount: 0,
    currentPage: 1,
    pagination: null,
    lastLimit: 10,
  },

  // API Methods
  fetchInstitutionStats: async (params = {}) => {
    const state = get().institutionStats;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      institutionStats: { ...state.institutionStats, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getInstitutionOverview(params);
      if (response.success) {
        set(() => ({
          institutionStats: {
            data: (response.data as any).summaryStats,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch institution stats');
      }
    } catch (error) {
      set((state) => ({
        institutionStats: {
          ...state.institutionStats,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchActivityHeatmap: async (params = {}) => {
    const state = get().activityHeatmap;
    // Allow forced refresh for heatmap navigation by checking forceRefresh parameter
    const forceRefresh = (params as any).forceRefresh;

    if (state.loading || (!forceRefresh && isCacheFresh(state.lastFetched) && state.data)) {
      console.log('⏭️ Skipping API call - already loading or cache is fresh');
      return;
    }

    set((state) => ({
      activityHeatmap: { ...state.activityHeatmap, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getActivityHeatmap(params);
      if (response.success) {
        set(() => ({
          activityHeatmap: {
            data: (response.data as any).heatmapData,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch activity heatmap');
      }
    } catch (error) {
      console.log('❌ API error:', error);
      set((state) => ({
        activityHeatmap: {
          ...state.activityHeatmap,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchStudents: async (params = {}) => {
    const state = get().students;
    if (state.loading) return;

    set((state) => ({
      students: { ...state.students, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getStudents(params);
      if (response.success) {
        set(() => ({
          students: {
            data: (response.data as any).students,
            loading: false,
            error: null,
            lastFetched: Date.now(),
            totalCount: (response.data as any).totalCount || (response.data as any).students.length,
            currentPage: (response.data as any).currentPage || 1,
            hasNext: (response.data as any).hasNext || false,
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch students');
      }
    } catch (error) {
      set((state) => ({
        students: {
          ...state.students,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchInactiveUsers: async (params = {}) => {
    const state = get().inactiveUsers;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data?.length)) return;

    set((state) => ({
      inactiveUsers: { ...state.inactiveUsers, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getInactiveUsers(params);
      if (response.success) {
        set(() => ({
          inactiveUsers: {
            data: (response.data as any)?.inactive_users,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch inactive users');
      }
    } catch (error) {
      set((state) => ({
        inactiveUsers: {
          ...state.inactiveUsers,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchLowScoreUsers: async (params = {}) => {
    const state = get().lowScoreUsers;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data?.length)) return;

    set((state) => ({
      lowScoreUsers: { ...state.lowScoreUsers, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getLowScoreUsers(params);
      if (response.success) {
        // Map the API response to our interface format
        const lowScoreUsers =
          (response.data as any)?.map((user: any) => ({
            id: user.user_id,
            name: user.name,
            totalAssessments: user.total_assessments || user.total_attempts, // Use total_assessments instead of email
            avgScore: Math.round(user.average_score), // Round to nearest integer
            testsAttempted: user.total_attempts,
          })) || [];

        set(() => ({
          lowScoreUsers: {
            data: lowScoreUsers,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch low score users');
      }
    } catch (error) {
      set((state) => ({
        lowScoreUsers: {
          ...state.lowScoreUsers,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchTopStudents: async (params = {}) => {
    const state = get().topStudents;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      topStudents: { ...state.topStudents, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getTopPerformers(params);
      if (response.success) {
        // Map the API response to our interface format
        const topStudents =
          (response.data as any)?.map((student: any, index: number) => ({
            user_id: student.user_id,
            name: student.name,
            email: student.email,
            avgScore: Math.round(student.average_score), // Round to nearest integer
            testsAttempted: student.total_assessments,
            rank: index + 1, // Calculate rank based on order (API returns sorted data)
            improvementTrend: 'stable', // Default value since not provided by API
            lastTestScore: Math.round(student.average_score), // Use average as last score
          })) || [];

        set(() => ({
          topStudents: {
            data: topStudents,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch top students');
      }
    } catch (error) {
      set((state) => ({
        topStudents: {
          ...state.topStudents,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchQBankModules: async (params = {}) => {
    const state = get().qbankModules;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      qbankModules: { ...state.qbankModules, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getQBankModules(params);

      if (response.success) {
        set(() => ({
          qbankModules: {
            data: (response.data as any).modules,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch QBank modules');
      }
    } catch (error) {
      set((state) => ({
        qbankModules: {
          ...state.qbankModules,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchQbankInsights: async (params = {}) => {
    const state = get().qbankInsights;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data)) return;
    set((state) => ({
      qbankInsights: { ...state.qbankInsights, loading: true, error: null },
    }));
    try {
      const response = await institutionalAPI.getQbankInsights(params);
      if (response.success) {
        set(() => ({
          qbankInsights: {
            data: response.data as qbankInsights,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch qbank insights');
      }
    } catch (error) {
      set((state) => ({
        qbankInsights: {
          ...state.qbankInsights,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchVideoContent: async (params = {}) => {
    const state = get().videoContent;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      videoContent: { ...state.videoContent, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getVideoContent(params);
      if (response.success) {
        set(() => ({
          videoContent: {
            data: (response.data as any).data.videos,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch video content');
      }
    } catch (error) {
      set((state) => ({
        videoContent: {
          ...state.videoContent,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchContentSummary: async (params = {}) => {
    const state = get().contentSummary;
    if (state.loading || (isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      contentSummary: { ...state.contentSummary, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getContentAnalyticsSummary(params);
      if (response.success) {
        set(() => ({
          contentSummary: {
            data: {
              video_analytics: (response.data as any).video_analytics,
              qbank_analytics: (response.data as any).qbank_analytics,
              overall_summary: (response.data as any).overall_summary,
            },
            loading: false,
            error: null,
            lastFetched: Date.now(),
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch content summary');
      }
    } catch (error) {
      set((state) => ({
        contentSummary: {
          ...state.contentSummary,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  // Table Management Methods
  fetchQBankAnalyticsTable: async (params = {}) => {
    const state = get().qbankAnalyticsTable;

    // Don't use cache for pagination - always allow API calls when page/limit changes
    const hasPageParams = params && ('page' in params || 'limit' in params);
    if (state.loading || (!hasPageParams && isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      qbankAnalyticsTable: { ...state.qbankAnalyticsTable, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getQBankAnalyticsTable(params);

      if (response.success) {
        const apiData = response.data as any;

        // Map the API response to our interface format
        const modules =
          apiData.modules?.map((module: any) => ({
            serial_number: module.serial_number,
            qbank_id: module.qbank_id,
            name: module.name,
            module: module.module,
            total_attempts: module.total_attempts,
            avg_accuracy: module.avg_accuracy,
            difficulty: module.difficulty,
          })) || [];

        const pagination = {
          current_page: apiData.currentPage || 1,
          total_pages: apiData.totalPages || 1,
          total_count: apiData.totalCount || modules.length,
          has_next: apiData.hasNext || false,
          has_previous: apiData.hasPrevious || false,
        };

        set(() => ({
          qbankAnalyticsTable: {
            data: modules,
            loading: false,
            error: null,
            lastFetched: Date.now(),
            totalCount: apiData.totalCount || modules.length,
            currentPage: apiData.currentPage || 1,
            pagination,
            lastLimit: params.limit || state.lastLimit || 10,
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch QBank analytics');
      }
    } catch (error) {
      set((state) => ({
        qbankAnalyticsTable: {
          ...state.qbankAnalyticsTable,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchUserManagementTable: async (params = {}) => {
    const state = get().userManagementTable;
    if (state.loading) return; // Only prevent multiple simultaneous calls

    set((state) => ({
      userManagementTable: { ...state.userManagementTable, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getUserManagementTable(params);

      if (response.success && response.data) {
        // Type assertion for the actual API response structure
        const apiData = response.data as any;

        // Map the API response to our interface format
        const users =
          apiData.users?.map((user: any) => ({
            id: user.user_id || user.id,
            user_name: user.name,
            email: user.email,
            last_login: user.last_activity_timestamp || user.created_at,
            status: user.last_activity_timestamp
              ? new Date(user.last_activity_timestamp) >
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
                ? 'Active'
                : 'Inactive'
              : 'Inactive',
            tests_completed: user.grand_test_attempts || 0,
            avg_score: user.avg_grand_test_score || 0,
            join_date: user.created_at,
          })) || [];

        // Use the pagination data from the API response data section
        const pagination = {
          current_page: apiData.currentPage || 1,
          total_pages: apiData.totalPages || 1,
          total_count: apiData.totalCount || users.length,
          has_next: apiData.hasNext || false,
          has_previous: apiData.hasPrevious || false,
        };

        set(() => ({
          userManagementTable: {
            data: users,
            loading: false,
            error: null,
            lastFetched: Date.now(),
            totalCount: apiData.totalCount || users.length,
            currentPage: apiData.currentPage || 1,
            pagination,
            lastLimit: params.limit || state.lastLimit || 10,
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch user management data');
      }
    } catch (error) {
      console.error('Error in fetchUserManagementTable:', error);
      set((state) => ({
        userManagementTable: {
          ...state.userManagementTable,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchTestSeriesManagementTable: async (params = {}) => {
    const state = get().testSeriesManagementTable;

    // Don't use cache for pagination - always allow API calls when page/limit changes
    const hasPageParams = params && ('page' in params || 'limit' in params);
    if (state.loading || (!hasPageParams && isCacheFresh(state.lastFetched) && state.data)) return;

    set((state) => ({
      testSeriesManagementTable: { ...state.testSeriesManagementTable, loading: true, error: null },
    }));

    try {
      const response = await institutionalAPI.getTestSeriesManagementTable(params);

      if (response.success) {
        const apiData = response.data as any;

        // Map the API response to our interface format
        const testSeries =
          apiData.test_series?.map((series: any, index: number) => ({
            serial_number: index + 1, // Generate serial number
            title: series.title,
            total_students: series.total_students,
            average_score: series.average_score,
            start_date: series.start_date,
            test_type: series.test_type,
            difficulty_level: series.difficulty_level,
          })) || [];

        const pagination = {
          current_page: apiData.currentPage || 1,
          total_pages: apiData.totalPages || 1,
          total_count: apiData.totalCount || testSeries.length,
          has_next: apiData.hasNext || false,
          has_previous: apiData.hasPrevious || false,
        };

        set(() => ({
          testSeriesManagementTable: {
            data: testSeries,
            loading: false,
            error: null,
            lastFetched: Date.now(),
            totalCount: apiData.totalCount || testSeries.length,
            currentPage: apiData.currentPage || 1,
            pagination,
            lastLimit: params.limit || state.lastLimit || 10,
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch test series management data');
      }
    } catch (error) {
      set((state) => ({
        testSeriesManagementTable: {
          ...state.testSeriesManagementTable,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  fetchVideoContentManagementTable: async (params = {}) => {
    const state = get().videoContentManagementTable;

    // Don't use cache for pagination - always allow API calls when page/limit changes
    const isPaginationCall = params.page || params.limit;
    const shouldSkipCache = isPaginationCall || params.search !== undefined;

    if (
      state.loading ||
      (!shouldSkipCache && isCacheFresh(state.lastFetched) && state.data.length > 0)
    )
      return;

    set((state) => ({
      videoContentManagementTable: {
        ...state.videoContentManagementTable,
        loading: true,
        error: null,
      },
    }));

    try {
      const response = await institutionalAPI.getVideoContentManagementTable(params);
      if (response.success) {
        const apiData = response.data as any;

        // Map the API response to our interface format
        const videos =
          apiData.videos?.map((video: any) => ({
            serial_number: video.serial_number,
            content_id: video.content_id,
            title: video.title,
            duration: video.duration,
            duration_seconds: video.duration_seconds,
            views: video.views,
          })) || [];

        const pagination = {
          current_page: apiData.currentPage || 1,
          total_pages: apiData.totalPages || 1,
          total_count: apiData.totalCount || videos.length,
          has_next: apiData.hasNext || false,
          has_previous: apiData.hasPrevious || false,
        };

        set(() => ({
          videoContentManagementTable: {
            data: videos,
            loading: false,
            error: null,
            lastFetched: Date.now(),
            totalCount: apiData.totalCount || videos.length,
            currentPage: apiData.currentPage || 1,
            pagination,
            lastLimit: params.limit || state.lastLimit || 10,
          },
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch video content management data');
      }
    } catch (error) {
      set((state) => ({
        videoContentManagementTable: {
          ...state.videoContentManagementTable,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  },

  // Utility actions
  clearCache: (endpoint) => {
    // Note: For simplicity, clearing all cache when endpoint is specified
    if (endpoint) {
      set((state) => ({
        institutionStats: { ...state.institutionStats, data: null, lastFetched: null },
        activityHeatmap: { ...state.activityHeatmap, data: null, lastFetched: null },
        students: { ...state.students, data: [], lastFetched: null },
        inactiveUsers: { ...state.inactiveUsers, data: [], lastFetched: null },
        lowScoreUsers: { ...state.lowScoreUsers, data: [], lastFetched: null },
        topStudents: { ...state.topStudents, data: [], lastFetched: null },
        qbankModules: { ...state.qbankModules, data: [], lastFetched: null },
        testSeriesInsights: { ...state.testSeriesInsights, data: null, lastFetched: null },
        qbankInsights: { ...state.qbankInsights, data: null, lastFetched: null },
        videoContent: { ...state.videoContent, data: [], lastFetched: null },
        contentSummary: { ...state.contentSummary, data: null, lastFetched: null },
        qbankAnalyticsTable: { ...state.qbankAnalyticsTable, data: [], lastFetched: null },
        userManagementTable: { ...state.userManagementTable, data: [], lastFetched: null },
        testSeriesManagementTable: {
          ...state.testSeriesManagementTable,
          data: [],
          lastFetched: null,
        },
        videoContentManagementTable: {
          ...state.videoContentManagementTable,
          data: [],
          lastFetched: null,
        },
      }));
    } else {
      set({
        institutionStats: {
          data: null,
          loading: false,
          error: null,
          lastFetched: null,
        },
        activityHeatmap: {
          data: null,
          loading: false,
          error: null,
          lastFetched: null,
        },
        students: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
          totalCount: 0,
          currentPage: 1,
          hasNext: false,
        },
        inactiveUsers: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
        },
        lowScoreUsers: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
        },
        topStudents: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
        },
        qbankModules: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
        },
        testSeriesInsights: {
          data: {
            summary: {
              totalAttempts: 0,
              avgScore: 0,
              difficultyDistribution: {
                easy: 0,
                medium: 0,
                hard: 0,
              },
            },
          },
          loading: false,
          error: null,
          lastFetched: null,
        },
        qbankInsights: {
          data: null,
          loading: false,
          error: null,
          lastFetched: null,
        },
        videoContent: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
        },
        contentSummary: {
          data: null,
          loading: false,
          error: null,
          lastFetched: null,
        },
        qbankAnalyticsTable: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
          totalCount: 0,
          currentPage: 1,
          pagination: null,
          lastLimit: 10,
        },
        userManagementTable: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
          totalCount: 0,
          currentPage: 1,
          pagination: null,
          lastLimit: 10,
        },
        testSeriesManagementTable: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
          totalCount: 0,
          currentPage: 1,
          pagination: null,
          lastLimit: 10,
        },
        videoContentManagementTable: {
          data: [],
          loading: false,
          error: null,
          lastFetched: null,
          totalCount: 0,
          currentPage: 1,
          pagination: null,
          lastLimit: 10,
        },
      });
    }
  },

  refreshAll: async () => {
    const store = get();
    try {
      // Get current pagination state for each table
      const userTable = store.userManagementTable;
      const qbankTable = store.qbankAnalyticsTable;
      const testSeriesTable = store.testSeriesManagementTable;
      const videoTable = store.videoContentManagementTable;

      // Use current page and last used limit (if available) for each table
      const userPage = userTable.pagination?.current_page || userTable.currentPage || 1;
      const userLimit = userTable.lastLimit || 10;
      const qbankPage = qbankTable.pagination?.current_page || qbankTable.currentPage || 1;
      const qbankLimit = qbankTable.lastLimit || 10;
      const testSeriesPage =
        testSeriesTable.pagination?.current_page || testSeriesTable.currentPage || 1;
      const testSeriesLimit = testSeriesTable.lastLimit || 10;
      const videoPage = videoTable.pagination?.current_page || videoTable.currentPage || 1;
      const videoLimit = videoTable.lastLimit || 10;

      await Promise.all([
        store.fetchInstitutionStats(),
        store.fetchActivityHeatmap(),
        store.fetchStudents(),
        store.fetchInactiveUsers(),
        store.fetchLowScoreUsers(),
        store.fetchTopStudents(),
        store.fetchQbankInsights(),
        store.fetchQBankModules(),
        store.fetchVideoContent(),
        store.fetchContentSummary(),
        // Table fetches with current pagination
        store.fetchQBankAnalyticsTable({ page: qbankPage, limit: qbankLimit }),
        store.fetchUserManagementTable({ page: userPage, limit: userLimit }),
        store.fetchTestSeriesManagementTable({ page: testSeriesPage, limit: testSeriesLimit }),
        store.fetchVideoContentManagementTable({ page: videoPage, limit: videoLimit }),
      ]);
    } catch (error) {
      console.error('Failed to refresh all data:', error);
    }
  },
}));
