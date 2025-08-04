import { create } from 'zustand';
import { studentAPI } from './student-api-service';
import { useUiStore } from 'src/stores/uiStore';

interface StudentSummary {
  name: string;
  email: string;
  qbankAttempted: number;
  totalHours: string;
  videosWatched: number;
  mcqsAttempted: number;
  testsTaken: number;
  overallAccuracy: number;
  avgScore: number;
}

interface LoginHeatmapDay {
  date: string;
  day: string;
  loggedIn: 1 | 0;
}

interface LoginHeatmap {
  lastLogin: string;
  heatmap: LoginHeatmapDay[];
}

interface VideoChartDay {
  date: string;
  minutes: number;
}

interface RecentVideo {
  content_id: string;
  title: string;
  duration: string;
  watched_secs: number;
  watched_at: string;
}

interface TestHistoryItem {
  id: number;
  testName: string;
  score: number;
  date: string;
  totalStudents: number;
}

interface TestSummary {
  overallAccuracy: number;
  avgScore: number;
}

interface StudentProfileState {
  summary: StudentSummary | null;
  loginHeatmap: LoginHeatmap | null;
  currentWeekOffset: number;
  videoChartData: VideoChartDay[];
  recentVideos: RecentVideo[];
  testSummary: TestSummary | null;
  testHistory: TestHistoryItem[];
  loading: {
    summary: boolean;
    loginHeatmap: boolean;
    videoActivity: boolean;
    testPerformance: boolean;
    recentVideos: boolean; // NEW
  };
  error: {
    summary: string | null;
    loginHeatmap: string | null;
    videoActivity: string | null;
    testPerformance: string | null;
    recentVideos: string | null; // NEW
  };
  fetchSummary: (userId?: string) => Promise<void>;
  fetchLoginHeatmap: (weekOffset?: number, userId?: string) => Promise<void>;
  setCurrentWeekOffset: (offset: number) => void;
  fetchVideoActivity: (
    start_date?: string,
    end_date?: string,
    userId?: string,
    selectedTimeRange?: string,
  ) => Promise<void>;
  fetchTestPerformance: (userId?: string, selectedTimeRange?: string) => Promise<void>;
  fetchRecentVideos: (userId?: string, selectedTimeRange?: string) => Promise<void>; // New action
}

export const useStudentProfileStore = create<StudentProfileState>((set, get) => ({
  summary: null,
  loginHeatmap: null,
  currentWeekOffset: 0,
  videoChartData: [],
  recentVideos: [],
  testSummary: null,
  testHistory: [],
  loading: {
    summary: false,
    loginHeatmap: false,
    videoActivity: false,
    testPerformance: false,
    recentVideos: false, // NEW
  },
  error: {
    summary: null,
    loginHeatmap: null,
    videoActivity: null,
    testPerformance: null,
    recentVideos: null, // NEW
  },
  fetchSummary: async (userId?: string) => {
    set((state) => ({
      loading: { ...state.loading, summary: true },
      error: { ...state.error, summary: null },
    }));
    try {
      if (!userId) {
        throw new Error('user_id is required');
      }
      const data = await studentAPI.getSummary({ user_id: userId });
      set({ summary: data, loading: { ...get().loading, summary: false } });
    } catch (e: any) {
      set({
        error: { ...get().error, summary: e?.message || 'Failed to fetch summary' },
        loading: { ...get().loading, summary: false },
      });
    }
  },
  fetchLoginHeatmap: async (weekOffset = get().currentWeekOffset, userId?: string) => {
    set((state) => ({
      loading: { ...state.loading, loginHeatmap: true },
      error: { ...state.error, loginHeatmap: null },
    }));
    try {
      if (!userId) {
        throw new Error('user_id is required');
      }
      // Calculate start and end date for the week
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + weekOffset * 7);
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6);
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      const data = await studentAPI.getLoginHeatmap({
        start_date: start,
        end_date: end,
        user_id: userId,
      });
      // Support both array and object response
      let loginHeatmap: LoginHeatmap;
      if (Array.isArray(data)) {
        loginHeatmap = { lastLogin: '', heatmap: data };
      } else {
        loginHeatmap = data;
      }
      set({ loginHeatmap, loading: { ...get().loading, loginHeatmap: false } });
    } catch (e: any) {
      set({
        error: { ...get().error, loginHeatmap: e?.message || 'Failed to fetch login heatmap' },
        loading: { ...get().loading, loginHeatmap: false },
      });
    }
  },
  setCurrentWeekOffset: (offset) => {
    set({ currentWeekOffset: offset });
  },
  fetchVideoActivity: async (start_date?: string, end_date?: string, userId?: string) => {
    set((state) => ({
      loading: { ...state.loading, videoActivity: true },
      error: { ...state.error, videoActivity: null },
    }));
    try {
      if (!start_date || !end_date) {
        throw new Error('start_date and end_date are required');
      }
      if (!userId) {
        throw new Error('user_id is required');
      }
      const params = { start_date, end_date, user_id: userId };
      const fetchedData = await studentAPI.getVideoActivity(params);
      const data = fetchedData?.data;
      set({
        videoChartData: data?.daily_hours || [],
        loading: { ...get().loading, videoActivity: false },
      });
    } catch (e: any) {
      set({
        error: { ...get().error, videoActivity: e?.message || 'Failed to fetch video activity' },
        loading: { ...get().loading, videoActivity: false },
      });
    }
  },
  fetchTestPerformance: async (userId?: string, selectedTimeRange?: string) => {
    const uiStore = useUiStore.getState();
    const timeRange = selectedTimeRange || uiStore.selectedTimeRange;
    let start = uiStore.startDate;
    let end = uiStore.endDate;
    if (timeRange === '7days') {
      // fallback to last 7 days
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);
      start = startDate.toISOString().split('T')[0];
      end = endDate.toISOString().split('T')[0];
    }
    set((state) => ({
      loading: { ...state.loading, testPerformance: true },
      error: { ...state.error, testPerformance: null },
    }));
    try {
      if (!userId) {
        throw new Error('user_id is required');
      }
      const fetchedData = await studentAPI.getTestPerformance({
        user_id: userId,
        start_date: start,
        end_date: end,
      });
      const data = fetchedData.data;
      set({
        testSummary: data.summary || null,
        testHistory: data.testHistory || [],
        loading: { ...get().loading, testPerformance: false },
      });
    } catch (e: any) {
      set({
        error: {
          ...get().error,
          testPerformance: e?.message || 'Failed to fetch test performance',
        },
        loading: { ...get().loading, testPerformance: false },
      });
    }
  },
  fetchRecentVideos: async (userId?: string, selectedTimeRange?: string) => {
    const uiStore = useUiStore.getState();
    const timeRange = selectedTimeRange || uiStore.selectedTimeRange;
    let start = uiStore.startDate;
    let end = uiStore.endDate;
    if (timeRange === '7days') {
      // fallback to last 7 days
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);
      start = startDate.toISOString().split('T')[0];
      end = endDate.toISOString().split('T')[0];
    }
    set((state) => ({
      loading: { ...state.loading, recentVideos: true },
      error: { ...state.error, recentVideos: null },
    }));
    try {
      if (!start || !end) {
        throw new Error('start_date and end_date are required');
      }
      if (!userId) {
        throw new Error('user_id is required');
      }
      const data = await studentAPI.getRecentVideos({
        user_id: userId,
        start_date: start,
        end_date: end,
      });
      set({
        recentVideos: data?.recent_videos || [],
        loading: { ...get().loading, recentVideos: false },
      });
    } catch (e: any) {
      set({
        error: { ...get().error, recentVideos: e?.message || 'Failed to fetch recent videos' },
        loading: { ...get().loading, recentVideos: false },
      });
    }
  },
}));
