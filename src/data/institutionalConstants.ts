// ================================================================
// INSTITUTIONAL DASHBOARD DATA CONSTANTS
// ================================================================
// Single source of truth for all institutional dashboard components
// Reduces redundancy and provides consistent data across components

// PHASE 2: Use JSON mock data instead of in-file generators
// Comment out or remove in-file data generators and use imports from JSON files via jsonLoader
// Example for students:
// import students from './institutional/students.json';
// For now, keep type definitions and utility functions here for type safety and color logic

// ================================================================
// TYPE DEFINITIONS
// ================================================================

// Base Student interface - used across multiple components
export interface Student {
  user_id: number;
  name: string;
  email: string;
  professor: string;
  totalLogins: number;
  lastLogin: string;
  videosWatched: number;
  qbankAttempted: number;
  testsTaken: number;
  isActive: boolean;
  // Optional fields for specific use cases
  daysSinceLogin?: number;
  avgScore?: number;
  testsAttempted?: number;
  rank?: number;
  improvementTrend?: 'up' | 'down' | 'stable';
  lastTestScore?: number;
}

// Institution Overview Types
export interface InstitutionSummaryStats {
  activatedLicenses: number;
  loginRate: number;
  avgTimeSpent: string;
  avgTestScore: number;
  avgTestAttempts: number;
}

export interface HeatmapDataPoint {
  date: string;
  day: string;
  intensity: number; // 0-4 scale
  loginCount?: number; // Optional for detailed heatmap
}

// QBank & Test Types
export interface MedicalTestData {
  id: number;
  name: string;
  subject: string;
  avgScore: number;
  attempts: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dateCreated: string;
  category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical';
}

// Content Types
export interface VideoContent {
  id: number;
  title: string;
  views: number;
  duration: string;
  category: string;
  engagementRate: number;
}

export interface QBankModule {
  id: number;
  name: string;
  attempts: number;
  avgScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completionRate: number;
}

// Add RedZoneStudent interface for type safety
export interface RedZoneStudent {
  id: number;
  name: string;
  totalAssessments?: number; // Changed from email to total_assessments
  daysSinceLogin?: number;
  avgScore?: number;
  testsAttempted?: number;
}

// Inactive Users interface for new API
export interface InactiveUser {
  serial_number: number;
  user_id: string | null;
  nid: string | null;
  name: string;
  email: string;
  days_since_login: number;
  last_login: string;
  videos_watched: number;
  qbank_attempted: number;
  tests_taken: number;
}

export interface qbankInsights {
  qbanks: Array<{
    id: number;
    subject_name: string;
    average_accuracy_score: number;
    attempts: number;
    assessment_ids: string[];
    user_ids: string[];
  }>;
  qbank_summary: {
    average_score: number;
    total_attempts: number;
    difficulty_distribution: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
}

// Table Management Types
export interface QBankAnalyticsData {
  serial_number: number;
  qbank_id: string;
  name: string;
  module: string;
  total_attempts: number;
  avg_accuracy: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UserManagementData {
  id: number;
  user_name: string;
  email: string;
  last_login: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  tests_completed: number;
  avg_score: number;
  join_date: string;
}

export interface TestSeriesManagementData {
  serial_number: number;
  title: string;
  total_students: number;
  average_score: number;
  start_date: string;
  test_type: string;
  difficulty_level: 'Easy' | 'Medium' | 'Hard';
}

export interface VideoContentManagementData {
  serial_number: number;
  content_id: string;
  title: string;
  duration: string;
  duration_seconds: number;
  views: number;
}

export interface TablePaginationInfo {
  current_page: number;
  total_pages: number;
  total_count: number;
  has_next: boolean;
  has_previous: boolean;
}

// ================================================================
// SHARED CONSTANTS
// ================================================================

// Professor list for consistent filtering
export const PROFS = ['prof 1', 'prof 2', 'prof 3', 'prof 4'];

// Score thresholds for consistent categorization
export const SCORE_THRESHOLDS = {
  RED_ZONE: 50,
  YELLOW_ZONE: 70,
  GREEN_ZONE: 90,
};

// Activity thresholds
export const ACTIVITY_THRESHOLDS = {
  INACTIVE_DAYS: 14,
  CRITICAL_INACTIVE_DAYS: 21,
};

// ================================================================
// DATA GENERATORS - Realistic Mock Data
// ================================================================

// Generate consistent student data for all components
export const generateInstitutionalStudents = (): Student[] => {
  const firstNames = [
    'Aaditya',
    'Ishita',
    'Arjun',
    'Priya',
    'Rahul',
    'Sneha',
    'Vikram',
    'Anita',
    'Ravi',
    'Deepika',
    'Amit',
    'Pooja',
    'Rajesh',
    'Sunita',
    'Deepak',
    'Neha',
    'Suresh',
    'Priti',
    'Manoj',
    'Kavitha',
    'Rohit',
    'Meera',
    'Kiran',
    'Nisha',
  ];

  const lastNames = [
    'Sharma',
    'Patel',
    'Kumar',
    'Gupta',
    'Singh',
    'Desai',
    'Verma',
    'Mehta',
    'Reddy',
    'Jain',
    'Yadav',
    'Iyer',
    'Shah',
    'Agarwal',
    'Malhotra',
    'Chopra',
  ];

  const students: Student[] = [];

  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@medcollege.edu`;

    // Generate realistic engagement data
    const totalLogins = Math.floor(Math.random() * 70) + 10; // 10-80 logins
    const videosWatched = Math.floor(Math.random() * 200) + 50; // 50-250 videos
    const qbankAttempted = Math.floor(Math.random() * 120) + 20; // 20-140 attempts
    const testsTaken = Math.floor(Math.random() * 25) + 5; // 5-30 tests

    // Generate last login (recent activity)
    const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
    const lastLogin = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    // Calculate derived fields
    const avgScore = Math.floor(Math.random() * 40) + 60; // 60-100% average
    const daysSinceLogin = daysAgo;
    const isActive = daysAgo <= 7; // Active if logged in within 7 days

    students.push({
      user_id: i + 1,
      name,
      email,
      professor: PROFS[Math.floor(Math.random() * PROFS.length)],
      totalLogins,
      lastLogin,
      videosWatched,
      qbankAttempted,
      testsTaken,
      isActive,
      daysSinceLogin,
      avgScore,
      testsAttempted: testsTaken,
      rank: i + 1, // Will be recalculated for top students
      improvementTrend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
      lastTestScore: Math.min(100, avgScore + Math.floor(Math.random() * 20) - 10),
    });
  }

  return students;
};

// Generate institution overview data
export const generateInstitutionOverview = (
  timeRange: string,
): {
  summaryStats: InstitutionSummaryStats;
  heatmapData: HeatmapDataPoint[];
} => {
  // Adjust stats based on time range
  const multiplier = timeRange === '7days' ? 1 : timeRange === '1month' ? 0.95 : 0.9;

  const summaryStats: InstitutionSummaryStats = {
    activatedLicenses: Math.floor(250 * multiplier),
    loginRate: Math.floor(82 * multiplier),
    avgTimeSpent: `${Math.floor(15 * multiplier)}h`,
    avgTestScore: 90.4,
    avgTestAttempts: 14.6,
  };

  // Generate heatmap data
  const days = timeRange === '7days' ? 7 : timeRange === '1month' ? 30 : 90;
  const heatmapData: HeatmapDataPoint[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    heatmapData.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      intensity: Math.floor(Math.random() * 5), // 0-4 intensity levels
    });
  }

  return { summaryStats, heatmapData };
};

// Generate content analytics data
export const generateContentAnalytics = (): {
  videos: VideoContent[];
  qbankModules: QBankModule[];
} => {
  const videos: VideoContent[] = [
    {
      id: 1,
      title: 'Introduction to Human Anatomy',
      views: 1284,
      duration: '45:30',
      category: 'Anatomy',
      engagementRate: 89,
    },
    {
      id: 2,
      title: 'Cardiovascular System Overview',
      views: 1156,
      duration: '52:15',
      category: 'Physiology',
      engagementRate: 92,
    },
    {
      id: 3,
      title: 'Pathophysiology Basics',
      views: 998,
      duration: '38:45',
      category: 'Pathology',
      engagementRate: 87,
    },
    {
      id: 4,
      title: 'Pharmacology Principles',
      views: 876,
      duration: '41:20',
      category: 'Pharmacology',
      engagementRate: 85,
    },
    {
      id: 5,
      title: 'Biochemistry of Metabolism',
      views: 754,
      duration: '49:10',
      category: 'Biochemistry',
      engagementRate: 91,
    },
  ];

  const qbankModules: QBankModule[] = [
    {
      id: 1,
      name: 'Anatomy MCQs',
      attempts: 2456,
      avgScore: 78,
      difficulty: 'Hard',
      completionRate: 85,
    },
    {
      id: 2,
      name: 'Physiology Problem Set',
      attempts: 2234,
      avgScore: 82,
      difficulty: 'Medium',
      completionRate: 92,
    },
    {
      id: 3,
      name: 'Pathology Quiz Bank',
      attempts: 2098,
      avgScore: 75,
      difficulty: 'Hard',
      completionRate: 78,
    },
    {
      id: 4,
      name: 'Pharmacology Tests',
      attempts: 1887,
      avgScore: 80,
      difficulty: 'Medium',
      completionRate: 88,
    },
    {
      id: 5,
      name: 'Biochemistry Assessments',
      attempts: 1654,
      avgScore: 84,
      difficulty: 'Easy',
      completionRate: 94,
    },
  ];

  return { videos, qbankModules };
};

// ================================================================
// COMPONENT-SPECIFIC DATA GETTERS
// ================================================================

// Get students for engagement component with filtering
export const getStudentEngagementData = (selectedProfs: string[] = [], searchTerm: string = '') => {
  let students = generateInstitutionalStudents();

  // Filter by profs
  if (selectedProfs.length > 0) {
    students = students.filter((student) => selectedProfs.includes(student.professor));
  }

  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    students = students.filter(
      (student) =>
        student.name.toLowerCase().includes(term) || student.email.toLowerCase().includes(term),
    );
  }

  return {
    students,
    totalVideosWatched: students.reduce((sum, s) => sum + s.videosWatched, 0),
    totalQbankAttempted: students.reduce((sum, s) => sum + s.qbankAttempted, 0),
    totalTestsTaken: students.reduce((sum, s) => sum + s.testsTaken, 0),
  };
};

// Get red zone students (categorized)
export const getRedZoneStudentsData = () => {
  const allStudents = generateInstitutionalStudents();

  const lowScoreStudents = allStudents
    .filter((student) => student.avgScore! < SCORE_THRESHOLDS.RED_ZONE)
    .slice(0, 10);

  const noLoginStudents = allStudents
    .filter((student) => student.daysSinceLogin! >= ACTIVITY_THRESHOLDS.INACTIVE_DAYS)
    .slice(0, 8);

  return {
    lowScoreStudents,
    noLoginStudents,
  };
};

// Get top performing students
export const getTopStudentsData = () => {
  const allStudents = generateInstitutionalStudents();

  return allStudents
    .filter((student) => student.avgScore! >= SCORE_THRESHOLDS.GREEN_ZONE)
    .sort((a, b) => b.avgScore! - a.avgScore!)
    .slice(0, 10)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
};

// ================================================================
// UTILITY FUNCTIONS
// ================================================================

// Color coding for scores
export const getScoreColor = (score: number): string => {
  if (score < SCORE_THRESHOLDS.RED_ZONE) return 'bg-red-100 text-red-800';
  if (score < SCORE_THRESHOLDS.YELLOW_ZONE) return 'bg-orange-100 text-orange-800';
  return 'bg-green-100 text-green-800';
};

// Color coding for inactive days
export const getInactiveDaysColor = (days: number): string => {
  if (days > ACTIVITY_THRESHOLDS.CRITICAL_INACTIVE_DAYS) return 'bg-red-100 text-red-800';
  if (days > ACTIVITY_THRESHOLDS.INACTIVE_DAYS) return 'bg-orange-100 text-orange-800';
  return 'bg-yellow-100 text-yellow-800';
};

// Intensity colors for heatmap
export const getIntensityColor = (intensity: number): string => {
  const colors = [
    'bg-gray-100', // 0 - no activity
    'bg-blue-200', // 1 - low activity
    'bg-blue-400', // 2 - medium activity
    'bg-blue-600', // 3 - high activity
    'bg-blue-800', // 4 - very high activity
  ];
  return colors[intensity] || colors[0];
};
