export const INFO_POPOVER_CONTENTS = {
  'qbank-analytics':
    'This table provides analytics on question banks, including attempts, accuracy, and difficulty distribution.',
  'test-series-analytics':
    'This table summarizes test series performance, average scores, and student participation.',
  'video-content-analytics':
    'This table shows analytics for video content, including views, duration, and engagement.',
  'user-analytics': 'This table displays user activity, test completion, scores, and status.',
  'students-to-watch': 'Top 5 performers of the College based on the Avg score in grand tests.',
  'red-zone-students': 'Shows students who are inactive or have low scores and may need attention.',
  'institution-overview':
    'Provides a summary of key institutional metrics such as total students, active users, and overall engagement.',
  'student-engagement':
    'Shows student engagement metrics, including videos watched, QBank attempts, and test participation.',
  'enrolled-students': 'Total number of students enrolled/licensed in the institution.',
  'active-students': 'Percentage of enrolled students who have logged in recently.',
  'average-watch-time': 'Average time spent by students watching educational videos.',
  'average-test-score': 'Average score achieved by students in tests and assessments.',
  'average-test-attempts': 'Average number of test attempts per student.',
  'student-activity-heatmap':
    'Visual representation of student login activity throughout the week.',
  'qbank-average-accuracy':
    'The average accuracy percentage across all QBank subjects, indicating overall student performance.',
  'qbank-total-attempts': 'Total QBank attempts by the student.',
  'qbank-difficulty-distribution':
    'Breakdown of QBank questions by difficulty level: Easy, Medium, and Hard.',
  // Add more as needed for other sections
};
// Medical Education Constants for DigiNerve Platform

// 19 MBBS Subjects
export const MEDICAL_SUBJECTS = [
  'Anatomy',
  'Physiology',
  'Biochemistry',
  'Pathology',
  'Pharmacology',
  'Microbiology',
  'Forensic Medicine',
  'Community Medicine',
  'General Medicine',
  'General Surgery',
  'Obstetrics & Gynecology',
  'Pediatrics',
  'Orthopedics',
  'Ophthalmology',
  'ENT',
  'Dermatology',
  'Psychiatry',
  'Radiology',
  'Anesthesiology',
];

// Subject Categories
export const SUBJECT_CATEGORIES = {
  'Pre-Clinical': ['Anatomy', 'Physiology', 'Biochemistry'],
  'Para-Clinical': [
    'Pathology',
    'Pharmacology',
    'Microbiology',
    'Forensic Medicine',
    'Community Medicine',
  ],
  Clinical: [
    'General Medicine',
    'General Surgery',
    'Obstetrics & Gynecology',
    'Pediatrics',
    'Orthopedics',
    'Ophthalmology',
    'ENT',
    'Dermatology',
    'Psychiatry',
    'Radiology',
    'Anesthesiology',
  ],
};

// Course Types
export const COURSE_TYPES = [
  'NEET Foundation',
  'NEET Complete Package',
  'AIIMS Preparation',
  'JIPMER Preparation',
  'MBBS Complete Course',
  'Medical Foundation Bundle',
  'Subject Mastery Series',
  'Test Series Package',
  'Quick Revision Course',
];

// Time Range Options
export const TIME_RANGES = [
  { value: '7days', label: 'Last 7 Days' },
  { value: '1month', label: 'Last Month' },
  { value: '3months', label: 'Last 3 Months' },
  { value: '6months', label: 'Last 6 Months' },
  { value: '1year', label: 'Last Year' },
];

// Geographic Zones
export const GEOGRAPHIC_ZONES = [
  'North Zone',
  'South Zone',
  'East Zone',
  'West Zone',
  'Central Zone',
  'Northeast Zone',
];

// Indian States for Geography Data
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu & Kashmir',
];

// Major Cities
export const MAJOR_CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Pimpri & Chinchwad',
  'Patna',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
  'Agra',
  'Nashik',
  'Faridabad',
  'Meerut',
  'Rajkot',
  'Kalyan & Dombivali',
  'Vasai Virar',
  'Varanasi',
  'Srinagar',
  'Dhanbad',
  'Jodhpur',
  'Amritsar',
];

// Top Medical Colleges
export const TOP_MEDICAL_COLLEGES = [
  'AIIMS Delhi',
  'AIIMS Mumbai',
  'AIIMS Bhopal',
  'AIIMS Jodhpur',
  'JIPMER Puducherry',
  'CMC Vellore',
  'AFMC Pune',
  'KGMU Lucknow',
  'PGIMER Chandigarh',
  'SGPGI Lucknow',
  'NIMHANS Bangalore',
  'BHU Varanasi',
  'JNU Delhi',
  'Kasturba Medical College',
  'St. Johns Medical College',
  'Manipal Academy',
  'JSS Medical College',
  'Rajiv Gandhi University',
  'Government Medical College Mumbai',
  'Grant Medical College Mumbai',
];

// Sales Agent Data
export const SALES_AGENTS = [
  { name: 'Rajesh Kumar', zone: 'North Zone', avatar: 'RK' },
  { name: 'Priya Sharma', zone: 'South Zone', avatar: 'PS' },
  { name: 'Amit Singh', zone: 'West Zone', avatar: 'AS' },
  { name: 'Neha Patel', zone: 'Central Zone', avatar: 'NP' },
  { name: 'Ravi Gupta', zone: 'East Zone', avatar: 'RG' },
  { name: 'Kavya Reddy', zone: 'South Zone', avatar: 'KR' },
  { name: 'Arjun Verma', zone: 'North Zone', avatar: 'AV' },
  { name: 'Deepika Joshi', zone: 'West Zone', avatar: 'DJ' },
  { name: 'Vikram Malhotra', zone: 'North Zone', avatar: 'VM' },
  { name: 'Ananya Iyer', zone: 'South Zone', avatar: 'AI' },
];

// Medical Test Data Interface
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

// Comprehensive test data for all 19 medical subjects
export const MEDICAL_TEST_DATA: MedicalTestData[] = [
  // Pre-Clinical Subjects
  {
    id: 1,
    name: 'Human Anatomy Fundamentals',
    subject: 'Anatomy',
    avgScore: 85,
    attempts: 320,
    difficulty: 'Medium',
    dateCreated: '2024-01-15',
    category: 'Pre-Clinical',
  },
  {
    id: 2,
    name: 'Cardiovascular Physiology',
    subject: 'Physiology',
    avgScore: 78,
    attempts: 285,
    difficulty: 'Hard',
    dateCreated: '2024-01-18',
    category: 'Pre-Clinical',
  },
  {
    id: 3,
    name: 'Metabolic Pathways',
    subject: 'Biochemistry',
    avgScore: 82,
    attempts: 240,
    difficulty: 'Medium',
    dateCreated: '2024-01-20',
    category: 'Pre-Clinical',
  },

  // Para-Clinical Subjects
  {
    id: 4,
    name: 'General Pathology Principles',
    subject: 'Pathology',
    avgScore: 88,
    attempts: 310,
    difficulty: 'Medium',
    dateCreated: '2024-01-22',
    category: 'Para-Clinical',
  },
  {
    id: 5,
    name: 'Drug Mechanisms & Actions',
    subject: 'Pharmacology',
    avgScore: 74,
    attempts: 195,
    difficulty: 'Hard',
    dateCreated: '2024-01-25',
    category: 'Para-Clinical',
  },
  {
    id: 6,
    name: 'Bacterial Infections',
    subject: 'Microbiology',
    avgScore: 80,
    attempts: 260,
    difficulty: 'Medium',
    dateCreated: '2024-01-28',
    category: 'Para-Clinical',
  },
  {
    id: 7,
    name: 'Forensic Toxicology',
    subject: 'Forensic Medicine',
    avgScore: 79,
    attempts: 145,
    difficulty: 'Hard',
    dateCreated: '2024-02-01',
    category: 'Para-Clinical',
  },
  {
    id: 8,
    name: 'Epidemiology & Biostatistics',
    subject: 'Community Medicine',
    avgScore: 76,
    attempts: 180,
    difficulty: 'Medium',
    dateCreated: '2024-02-03',
    category: 'Para-Clinical',
  },

  // Clinical Subjects
  {
    id: 9,
    name: 'Internal Medicine Cases',
    subject: 'General Medicine',
    avgScore: 90,
    attempts: 350,
    difficulty: 'Hard',
    dateCreated: '2024-02-05',
    category: 'Clinical',
  },
  {
    id: 10,
    name: 'Surgical Procedures',
    subject: 'General Surgery',
    avgScore: 86,
    attempts: 275,
    difficulty: 'Hard',
    dateCreated: '2024-02-08',
    category: 'Clinical',
  },
  {
    id: 11,
    name: 'Obstetric Complications',
    subject: 'Obstetrics & Gynecology',
    avgScore: 83,
    attempts: 220,
    difficulty: 'Medium',
    dateCreated: '2024-02-10',
    category: 'Clinical',
  },
  {
    id: 12,
    name: 'Pediatric Emergency Care',
    subject: 'Pediatrics',
    avgScore: 87,
    attempts: 200,
    difficulty: 'Medium',
    dateCreated: '2024-02-12',
    category: 'Clinical',
  },
  {
    id: 13,
    name: 'Fracture Management',
    subject: 'Orthopedics',
    avgScore: 84,
    attempts: 165,
    difficulty: 'Hard',
    dateCreated: '2024-02-15',
    category: 'Clinical',
  },
  {
    id: 14,
    name: 'Retinal Disorders',
    subject: 'Ophthalmology',
    avgScore: 81,
    attempts: 135,
    difficulty: 'Medium',
    dateCreated: '2024-02-18',
    category: 'Clinical',
  },
  {
    id: 15,
    name: 'Hearing Loss Assessment',
    subject: 'ENT',
    avgScore: 77,
    attempts: 120,
    difficulty: 'Medium',
    dateCreated: '2024-02-20',
    category: 'Clinical',
  },
  {
    id: 16,
    name: 'Skin Diseases Diagnosis',
    subject: 'Dermatology',
    avgScore: 85,
    attempts: 155,
    difficulty: 'Easy',
    dateCreated: '2024-02-22',
    category: 'Clinical',
  },
  {
    id: 17,
    name: 'Mental Health Disorders',
    subject: 'Psychiatry',
    avgScore: 73,
    attempts: 110,
    difficulty: 'Hard',
    dateCreated: '2024-02-25',
    category: 'Clinical',
  },
  {
    id: 18,
    name: 'Diagnostic Imaging',
    subject: 'Radiology',
    avgScore: 89,
    attempts: 190,
    difficulty: 'Medium',
    dateCreated: '2024-02-28',
    category: 'Clinical',
  },
  {
    id: 19,
    name: 'Anesthetic Protocols',
    subject: 'Anesthesiology',
    avgScore: 92,
    attempts: 175,
    difficulty: 'Hard',
    dateCreated: '2024-03-01',
    category: 'Clinical',
  },
];

// Test Series Data (different from QBank data)
export const TEST_SERIES_DATA: MedicalTestData[] = [
  // Pre-Clinical Subjects
  {
    id: 20,
    name: 'Pre-Clinical Comprehensive Test',
    subject: 'Anatomy',
    avgScore: 72,
    attempts: 180,
    difficulty: 'Hard',
    dateCreated: '2024-01-15',
    category: 'Pre-Clinical',
  },
  {
    id: 21,
    name: 'Physiology Mock Exam',
    subject: 'Physiology',
    avgScore: 65,
    attempts: 165,
    difficulty: 'Hard',
    dateCreated: '2024-01-18',
    category: 'Pre-Clinical',
  },
  {
    id: 22,
    name: 'Biochemistry Final Exam',
    subject: 'Biochemistry',
    avgScore: 78,
    attempts: 140,
    difficulty: 'Medium',
    dateCreated: '2024-01-20',
    category: 'Pre-Clinical',
  },
  // Para-Clinical Subjects
  {
    id: 23,
    name: 'Pathology Board Exam',
    subject: 'Pathology',
    avgScore: 82,
    attempts: 195,
    difficulty: 'Hard',
    dateCreated: '2024-01-22',
    category: 'Para-Clinical',
  },
  {
    id: 24,
    name: 'Pharmacology Mock Test',
    subject: 'Pharmacology',
    avgScore: 48,
    attempts: 125,
    difficulty: 'Hard',
    dateCreated: '2024-01-25',
    category: 'Para-Clinical',
  },
  {
    id: 25,
    name: 'Microbiology Final',
    subject: 'Microbiology',
    avgScore: 58,
    attempts: 150,
    difficulty: 'Medium',
    dateCreated: '2024-01-28',
    category: 'Para-Clinical',
  },
  {
    id: 26,
    name: 'Forensic Medicine Test',
    subject: 'Forensic Medicine',
    avgScore: 71,
    attempts: 85,
    difficulty: 'Hard',
    dateCreated: '2024-02-01',
    category: 'Para-Clinical',
  },
  {
    id: 27,
    name: 'Community Medicine Exam',
    subject: 'Community Medicine',
    avgScore: 45,
    attempts: 110,
    difficulty: 'Medium',
    dateCreated: '2024-02-03',
    category: 'Para-Clinical',
  },
  // Clinical Subjects
  {
    id: 28,
    name: 'Internal Medicine Final',
    subject: 'General Medicine',
    avgScore: 85,
    attempts: 220,
    difficulty: 'Hard',
    dateCreated: '2024-02-05',
    category: 'Clinical',
  },
  {
    id: 29,
    name: 'Surgery Board Exam',
    subject: 'General Surgery',
    avgScore: 62,
    attempts: 190,
    difficulty: 'Hard',
    dateCreated: '2024-02-08',
    category: 'Clinical',
  },
  {
    id: 30,
    name: 'OBGYN Comprehensive',
    subject: 'Obstetrics & Gynecology',
    avgScore: 55,
    attempts: 160,
    difficulty: 'Hard',
    dateCreated: '2024-02-10',
    category: 'Clinical',
  },
  {
    id: 31,
    name: 'Pediatrics Final Exam',
    subject: 'Pediatrics',
    avgScore: 81,
    attempts: 130,
    difficulty: 'Medium',
    dateCreated: '2024-02-12',
    category: 'Clinical',
  },
  {
    id: 32,
    name: 'Orthopedics Mock Test',
    subject: 'Orthopedics',
    avgScore: 77,
    attempts: 105,
    difficulty: 'Hard',
    dateCreated: '2024-02-15',
    category: 'Clinical',
  },
  {
    id: 33,
    name: 'Ophthalmology Exam',
    subject: 'Ophthalmology',
    avgScore: 43,
    attempts: 95,
    difficulty: 'Medium',
    dateCreated: '2024-02-18',
    category: 'Clinical',
  },
  {
    id: 34,
    name: 'ENT Comprehensive Test',
    subject: 'ENT',
    avgScore: 70,
    attempts: 80,
    difficulty: 'Medium',
    dateCreated: '2024-02-20',
    category: 'Clinical',
  },
  {
    id: 35,
    name: 'Dermatology Final',
    subject: 'Dermatology',
    avgScore: 79,
    attempts: 115,
    difficulty: 'Easy',
    dateCreated: '2024-02-22',
    category: 'Clinical',
  },
  {
    id: 36,
    name: 'Psychiatry Board Exam',
    subject: 'Psychiatry',
    avgScore: 38,
    attempts: 75,
    difficulty: 'Hard',
    dateCreated: '2024-02-25',
    category: 'Clinical',
  },
  {
    id: 37,
    name: 'Radiology Mock Test',
    subject: 'Radiology',
    avgScore: 83,
    attempts: 125,
    difficulty: 'Medium',
    dateCreated: '2024-02-28',
    category: 'Clinical',
  },
  {
    id: 38,
    name: 'Anesthesia Final Exam',
    subject: 'Anesthesiology',
    avgScore: 86,
    attempts: 100,
    difficulty: 'Hard',
    dateCreated: '2024-03-01',
    category: 'Clinical',
  },
];

// Info popover content for various tables/sections

// Generate sample data based on filters
export const generateSubjectData = (timeRange: string) => {
  const multiplier = getTimeRangeMultiplier(timeRange);

  return MEDICAL_SUBJECTS.map((subject, index) => {
    const baseRevenue = (index + 1) * 180000 * multiplier;
    const baseEnrollments = Math.floor((index + 1) * 85 * multiplier);
    const baseUsage = Math.max(20, 95 - index * 3);

    return {
      subject,
      category:
        Object.entries(SUBJECT_CATEGORIES).find(([_, subjects]) =>
          subjects.includes(subject),
        )?.[0] || 'Clinical',
      revenue: baseRevenue + Math.random() * 50000,
      enrollments: baseEnrollments + Math.floor(Math.random() * 30),
      usage: Math.min(100, baseUsage + Math.floor(Math.random() * 15)),
      growth: `+${(12 + Math.random() * 20).toFixed(1)}%`,
      avgPrice: Math.floor(baseRevenue / baseEnrollments),
      videosWatched: Math.floor(baseEnrollments * (1.2 + Math.random() * 0.8)),
      testsAttempted: Math.floor(baseEnrollments * (0.8 + Math.random() * 0.6)),
      studyHours: Math.floor(baseEnrollments * (15 + Math.random() * 10)),
    };
  });
};

export const generateCourseData = (timeRange: string) => {
  const multiplier = getTimeRangeMultiplier(timeRange);

  return COURSE_TYPES.map((courseType, index) => {
    const baseRevenue = (9 - index) * 250000 * multiplier;
    const baseEnrollments = Math.floor((9 - index) * 120 * multiplier);

    return {
      course: courseType,
      type: index < 5 ? 'Entrance Preparation' : 'Subject Specific',
      revenue: baseRevenue + Math.random() * 100000,
      enrollments: baseEnrollments + Math.floor(Math.random() * 50),
      avgPrice: Math.floor(baseRevenue / baseEnrollments),
      growth: `+${(8 + Math.random() * 25).toFixed(1)}%`,
      status: Math.random() > 0.1 ? 'Active' : 'Limited',
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };
  });
};

export const generateGeographyData = (
  timeRange: string,
  type: 'states' | 'cities' | 'colleges',
) => {
  const multiplier = getTimeRangeMultiplier(timeRange);
  const sourceData =
    type === 'states'
      ? INDIAN_STATES.slice(0, 15)
      : type === 'cities'
      ? MAJOR_CITIES.slice(0, 12)
      : TOP_MEDICAL_COLLEGES.slice(0, 10);

  return sourceData.map((location, index) => {
    const baseRevenue = (sourceData.length - index) * 150000 * multiplier;
    const baseCount =
      type === 'colleges'
        ? Math.floor((sourceData.length - index) * 45)
        : Math.floor((sourceData.length - index) * (type === 'states' ? 8 : 12));

    return {
      name: location,
      revenue: baseRevenue + Math.random() * 75000,
      [type === 'colleges' ? 'students' : 'colleges']: baseCount + Math.floor(Math.random() * 20),
      growth: `+${(10 + Math.random() * 20).toFixed(1)}%`,
      intensity: Math.max(20, 100 - index * 5),
    };
  });
};

export const generateSalesAgentData = (timeRange: string) => {
  const multiplier = getTimeRangeMultiplier(timeRange);

  return SALES_AGENTS.map((agent, index) => {
    const baseRevenue = (SALES_AGENTS.length - index) * 680000 * multiplier;
    const baseColleges = Math.floor((SALES_AGENTS.length - index) * 4.2);
    const baseAllocated = Math.floor(baseColleges * 1.15);

    return {
      ...agent,
      id: index + 1,
      joinDate: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      )
        .toISOString()
        .split('T')[0],
      collegesClosed: baseColleges + Math.floor(Math.random() * 8),
      revenue: baseRevenue + Math.random() * 200000,
      targetAchievement: Math.floor(85 + Math.random() * 30),
      collegesTotalAllocated: baseAllocated + Math.floor(Math.random() * 5),
      growth: `+${(15 + Math.random() * 20).toFixed(1)}%`,
      status: Math.random() > 0.1 ? 'Active' : Math.random() > 0.5 ? 'Training' : 'Leave',
      lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      topSubject: MEDICAL_SUBJECTS[Math.floor(Math.random() * MEDICAL_SUBJECTS.length)],
    };
  });
};

export const generateInstituteData = (timeRange: string) => {
  const multiplier = getTimeRangeMultiplier(timeRange);

  return TOP_MEDICAL_COLLEGES.map((college, index) => {
    const baseRevenue = (TOP_MEDICAL_COLLEGES.length - index) * 45000 * multiplier;
    const baseStudents = Math.floor((TOP_MEDICAL_COLLEGES.length - index) * 55);
    const baseUsage = Math.max(25, 95 - index * 4);

    return {
      name: college,
      zone: GEOGRAPHIC_ZONES[index % GEOGRAPHIC_ZONES.length], // Assign zone cyclically
      usage: Math.min(100, baseUsage + Math.floor(Math.random() * 15)),
      revenue: baseRevenue + Math.random() * 20000,
      students: baseStudents + Math.floor(Math.random() * 25),
      growth: `+${(8 + Math.random() * 25).toFixed(1)}%`,
      subjects: MEDICAL_SUBJECTS.slice(0, Math.floor(Math.random() * 8) + 12),
      lastActive: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };
  });
};

// Helper Functions
export const getTimeRangeMultiplier = (timeRange: string): number => {
  switch (timeRange) {
    case '7days':
      return 0.1;
    case '1month':
      return 1;
    case '3months':
      return 3.2;
    case '6months':
      return 6.8;
    case '1year':
      return 12.5;
    default:
      return 1;
  }
};

export const getTimeRangeLabel = (timeRange: string): string => {
  return TIME_RANGES.find((tr) => tr.value === timeRange)?.label || 'Last Month';
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${Math.round(amount)}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Filter functions
export const filterDataBySubject = (data: any[], subject: string) => {
  if (subject === 'all' || !subject) return data;
  return data.filter(
    (item) =>
      item.subject === subject ||
      item.topSubject === subject ||
      (item.subjects && item.subjects.includes(subject)),
  );
};

export const filterDataByZone = (data: any[], zone: string) => {
  if (zone === 'all' || !zone) return data;
  return data.filter((item) => item.zone === zone);
};

export const filterDataByStatus = (data: any[], status: string) => {
  if (status === 'all' || !status) return data;
  return data.filter((item) => item.status === status);
};

export const filterDataByCategory = (data: any[], category: string) => {
  if (category === 'all' || !category) return data;
  return data.filter((item) => item.category === category || item.type === category);
};
