import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { Badge, Progress, Table } from 'flowbite-react';

interface VideoActivity {
  id: number;
  title: string;
  duration: string;
  progress: number;
  watchedDate: string;
}

interface TestHistory {
  id: number;
  testName: string;
  score: number;
  rank: number;
  date: string;
  totalStudents: number;
}

const StudentProfile = () => {
  const [timeRange, setTimeRange] = useState('7days');

  // Sample student data
  const studentData = {
    name: 'Dr. Arjun Sharma',
    email: 'arjun.sharma@medcollege.edu',
    avatar: 'AS',
    totalHours: '16h',
    videosWatched: 25,
    mcqsAttempted: 120,
    testsTaken: 5,
    lastLogin: '2024-01-08',
    overallAccuracy: 78,
    avgScore: 62,
  };

  // Generate login heatmap data (last 14 days)
  const generateLoginHeatmap = () => {
    const data = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        hasLogin: Math.random() > 0.3, // 70% chance of login
      });
    }
    return data;
  };

  const loginHeatmapData = generateLoginHeatmap();

  // Video activity data
  const videoWatchHours =
    timeRange === '7days'
      ? [2.5, 1.8, 3.2, 2.1, 4.0, 1.5, 2.8]
      : [
          12, 15, 18, 14, 20, 16, 22, 18, 25, 19, 24, 21, 26, 23, 28, 20, 30, 25, 27, 22, 29, 24,
          31, 26, 28, 23, 32, 27, 30, 25,
        ];

  const chartLabels =
    timeRange === '7days'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  const videoChartData = {
    series: [
      {
        name: 'Hours Watched',
        data: videoWatchHours,
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 200,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          distributed: false,
        },
      },
      dataLabels: { enabled: false },
      xaxis: { categories: chartLabels },
      colors: ['#3B82F6'],
      grid: { strokeDashArray: 4 },
    },
  };

  // Recent videos data
  const recentVideos: VideoActivity[] = [
    {
      id: 1,
      title: 'Cardiovascular System Overview',
      duration: '45:30',
      progress: 85,
      watchedDate: '2024-01-08',
    },
    {
      id: 2,
      title: 'Respiratory Physiology',
      duration: '38:15',
      progress: 100,
      watchedDate: '2024-01-07',
    },
    {
      id: 3,
      title: 'Neuroanatomy Basics',
      duration: '52:20',
      progress: 65,
      watchedDate: '2024-01-06',
    },
    {
      id: 4,
      title: 'Pharmacokinetics Principles',
      duration: '41:10',
      progress: 90,
      watchedDate: '2024-01-05',
    },
    {
      id: 5,
      title: 'Pathology Case Studies',
      duration: '35:45',
      progress: 75,
      watchedDate: '2024-01-04',
    },
  ];

  // Subject performance data
  const subjectPerformance = [
    { subject: 'Anatomy', attempted: 45, total: 60 },
    { subject: 'Physiology', attempted: 38, total: 50 },
    { subject: 'Pathology', attempted: 25, total: 40 },
    { subject: 'Pharmacology', attempted: 12, total: 30 },
  ];

  // Test history data
  const testHistory: TestHistory[] = [
    {
      id: 1,
      testName: 'Anatomy Mid-term Assessment',
      score: 85,
      rank: 12,
      date: '2024-01-08',
      totalStudents: 248,
    },
    {
      id: 2,
      testName: 'Physiology Quiz Series 3',
      score: 78,
      rank: 18,
      date: '2024-01-05',
      totalStudents: 232,
    },
    {
      id: 3,
      testName: 'Pathology Case Analysis',
      score: 92,
      rank: 5,
      date: '2024-01-02',
      totalStudents: 245,
    },
    {
      id: 4,
      testName: 'Pharmacology MCQ Test',
      score: 73,
      rank: 25,
      date: '2023-12-28',
      totalStudents: 251,
    },
    {
      id: 5,
      testName: 'Biochemistry Final',
      score: 88,
      rank: 8,
      date: '2023-12-25',
      totalStudents: 189,
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'green';
    if (progress >= 70) return 'blue';
    if (progress >= 50) return 'yellow';
    return 'red';
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 5) return 'success';
    if (rank <= 15) return 'info';
    if (rank <= 30) return 'warning';
    return 'failure';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Profile Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive learning analytics and performance insights
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Summary</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                {studentData.avatar}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{studentData.name}</h3>
              <p className="text-gray-600 text-sm">{studentData.email}</p>
              <p className="text-xs text-gray-500 mt-2">
                Last login: {new Date(studentData.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">{studentData.totalHours}</div>
                <div className="text-sm text-blue-600">Total Hours</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">
                  {studentData.videosWatched}
                </div>
                <div className="text-sm text-purple-600">Videos Watched</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{studentData.mcqsAttempted}</div>
                <div className="text-sm text-green-600">MCQs Attempted</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-700">{studentData.testsTaken}</div>
                <div className="text-sm text-orange-600">Tests Taken</div>
              </div>
            </div>
          </div>

          {/* Login Heatmap */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Login Activity</h4>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-xs text-center text-gray-600 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {loginHeatmapData.slice(0, 7).map((day, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded ${
                    day.hasLogin ? 'bg-green-500' : 'bg-gray-200'
                  } border border-gray-300`}
                  title={`${day.date}: ${day.hasLogin ? 'Active' : 'No activity'}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {loginHeatmapData.slice(7, 14).map((day, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded ${
                    day.hasLogin ? 'bg-green-500' : 'bg-gray-200'
                  } border border-gray-300`}
                  title={`${day.date}: ${day.hasLogin ? 'Active' : 'No activity'}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
              <span>Less</span>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Video Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Video Activity</h2>
            <div className="flex gap-2">
              {['7days', '1month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeRange(period)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    timeRange === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === '7days' ? '7 Days' : '1 Month'}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6">
            <Chart
              options={videoChartData.options}
              series={videoChartData.series}
              type="bar"
              height={200}
            />
          </div>

          {/* Recent Videos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Watched Videos</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{video.title}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <Icon icon="solar:clock-circle-bold" width={12} />
                      {video.duration}
                      <span>•</span>
                      {new Date(video.watchedDate).toLocaleDateString()}
                    </div>
                    <div className="mt-2">
                      <Progress
                        progress={video.progress}
                        size="sm"
                        color={getProgressColor(video.progress)}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div
                      className={`text-sm font-medium ${
                        video.progress >= 90
                          ? 'text-green-600'
                          : video.progress >= 70
                          ? 'text-blue-600'
                          : video.progress >= 50
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {video.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QBanks & Test Performance */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">QBanks & Test Performance</h2>

          {/* Performance Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                {studentData.overallAccuracy}%
              </div>
              <div className="text-sm text-green-600">Overall Accuracy</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{studentData.avgScore}%</div>
              <div className="text-sm text-blue-600">Average Score</div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions by Subject</h3>
            <div className="space-y-3">
              {subjectPerformance.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                    <span className="text-sm text-gray-600">
                      {subject.attempted}/{subject.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(subject.attempted / subject.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test History</h3>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Test Name</Table.HeadCell>
                  <Table.HeadCell>Score</Table.HeadCell>
                  <Table.HeadCell>Rank</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {testHistory.slice(0, 5).map((test) => (
                    <Table.Row key={test.id} className="bg-white">
                      <Table.Cell className="font-medium text-gray-900 text-sm">
                        {test.testName}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`font-medium ${
                            test.score >= 85
                              ? 'text-green-600'
                              : test.score >= 70
                              ? 'text-blue-600'
                              : test.score >= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {test.score}%
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={getRankBadgeColor(test.rank)} size="sm">
                          #{test.rank}/{test.totalStudents}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="text-gray-600 text-sm">
                        {new Date(test.date).toLocaleDateString()}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon icon="solar:star-bold" className="text-green-600" width={24} />
              <span className="font-semibold text-green-800">Strengths</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• High video completion rate (88%)</li>
              <li>• Consistent daily study habits</li>
              <li>• Strong performance in Pathology</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon icon="solar:target-bold" className="text-yellow-600" width={24} />
              <span className="font-semibold text-yellow-800">Focus Areas</span>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Improve Pharmacology scores</li>
              <li>• Increase test frequency</li>
              <li>• Work on time management</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon icon="solar:graph-up-bold" className="text-blue-600" width={24} />
              <span className="font-semibold text-blue-800">Progress Trend</span>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• +15% improvement this month</li>
              <li>• Rank improved by 8 positions</li>
              <li>• Study time increased 25%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
