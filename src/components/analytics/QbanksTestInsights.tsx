import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { useState } from 'react';

interface TestData {
  id: number;
  name: string;
  subject: string;
  avgAccuracy: number;
  avgScore: number;
  attempts: number;
  difficulty: string;
  dateCreated: string;
}

const QbanksTestInsights = () => {
  const [timeRange, setTimeRange] = useState('1month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Sample test data
  const testData: TestData[] = [
    {
      id: 1,
      name: 'Organic Chemistry Final',
      subject: 'Chemistry',
      avgAccuracy: 76,
      avgScore: 82,
      attempts: 245,
      difficulty: 'Hard',
      dateCreated: '2024-01-01',
    },
    {
      id: 2,
      name: 'Calculus Integration Test',
      subject: 'Mathematics',
      avgAccuracy: 84,
      avgScore: 88,
      attempts: 198,
      difficulty: 'Medium',
      dateCreated: '2024-01-05',
    },
    {
      id: 3,
      name: 'Cell Biology Quiz',
      subject: 'Biology',
      avgAccuracy: 89,
      avgScore: 91,
      attempts: 267,
      difficulty: 'Easy',
      dateCreated: '2024-01-03',
    },
    {
      id: 4,
      name: 'Physics Mechanics',
      subject: 'Physics',
      avgAccuracy: 71,
      avgScore: 75,
      attempts: 189,
      difficulty: 'Hard',
      dateCreated: '2024-01-07',
    },
    {
      id: 5,
      name: 'Algebra Fundamentals',
      subject: 'Mathematics',
      avgAccuracy: 92,
      avgScore: 94,
      attempts: 312,
      difficulty: 'Easy',
      dateCreated: '2024-01-02',
    },
  ];

  const subjects = [
    'all',
    'Anatomy',
    'Physiology',
    'Pathology',
    'Pharmacology',
    'Biochemistry',
    'Microbiology',
  ];

  // Filter data based on selected subject
  const filteredData =
    selectedSubject === 'all'
      ? testData
      : testData.filter((test) => test.subject === selectedSubject);

  // Chart data for accuracy trends
  const accuracyChartData = {
    series: [
      {
        name: 'Average Accuracy',
        data: filteredData.map((test) => test.avgAccuracy),
      },
      {
        name: 'Average Score',
        data: filteredData.map((test) => test.avgScore),
      },
    ],
    options: {
      chart: {
        type: 'line' as const,
        height: 300,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth' as const,
        width: 3,
      },
      xaxis: {
        categories: filteredData.map((test) => test.name.split(' ').slice(0, 2).join(' ')),
      },
      colors: ['#3B82F6', '#10B981'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'top' as const,
      },
      grid: {
        strokeDashArray: 4,
      },
    },
  };

  // Donut chart for test difficulty distribution
  const difficultyChartData = {
    series: [
      filteredData.filter((test) => test.difficulty === 'Easy').length,
      filteredData.filter((test) => test.difficulty === 'Medium').length,
      filteredData.filter((test) => test.difficulty === 'Hard').length,
    ],
    options: {
      chart: {
        type: 'donut' as const,
        height: 250,
      },
      labels: ['Easy', 'Medium', 'Hard'],
      colors: ['#10B981', '#F59E0B', '#EF4444'],
      legend: {
        position: 'bottom' as const,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return Math.round(val) + '%';
        },
      },
    },
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  // Calculate summary statistics
  const totalAttempts = filteredData.reduce((sum, test) => sum + test.attempts, 0);
  const avgAccuracy = Math.round(
    filteredData.reduce((sum, test) => sum + test.avgAccuracy, 0) / filteredData.length,
  );
  const avgScore = Math.round(
    filteredData.reduce((sum, test) => sum + test.avgScore, 0) / filteredData.length,
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">QBanks & Test Series Insights</h2>
        <div className="flex items-center gap-2">
          <Icon icon="solar:clipboard-list-bold" className="text-green-500" width={20} />
          <span className="text-sm text-green-600 font-medium">Performance Analytics</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1week">Last Week</option>
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Summary Stats */}
        <div className="xl:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Statistics</h3>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:target-bold" className="text-blue-500" width={24} />
                <span className="text-sm font-medium text-blue-700">Average Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">{avgAccuracy}%</div>
              <div className="text-sm text-blue-600 mt-1">Across all tests</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:graph-up-bold" className="text-green-500" width={24} />
                <span className="text-sm font-medium text-green-700">Average Score</span>
              </div>
              <div className="text-2xl font-bold text-green-800">{avgScore}%</div>
              <div className="text-sm text-green-600 mt-1">Overall performance</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  icon="solar:users-group-two-rounded-bold"
                  className="text-purple-500"
                  width={24}
                />
                <span className="text-sm font-medium text-purple-700">Total Attempts</span>
              </div>
              <div className="text-2xl font-bold text-purple-800">
                {totalAttempts.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600 mt-1">Student attempts</div>
            </div>

            {/* Difficulty Distribution */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Difficulty Distribution</h4>
              <Chart
                options={difficultyChartData.options}
                series={difficultyChartData.series}
                type="donut"
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Performance Trends & Test Details */}
        <div className="xl:col-span-2">
          {/* Performance Trends Chart */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <Chart
                options={accuracyChartData.options}
                series={accuracyChartData.series}
                type="line"
                height={300}
              />
            </div>
          </div>

          {/* Test Details Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Details</h3>
            <div className="overflow-x-auto bg-gray-50 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Test Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Subject</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Accuracy</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Avg Score</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Attempts</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((test) => (
                    <tr key={test.id} className="hover:bg-white transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{test.name}</td>
                      <td className="px-4 py-3 text-gray-600">{test.subject}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${getScoreColor(test.avgAccuracy)}`}>
                          {test.avgAccuracy}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${getScoreColor(test.avgScore)}`}>
                          {test.avgScore}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{test.attempts}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            test.difficulty,
                          )}`}
                        >
                          {test.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Icon icon="solar:document-add-bold" className="inline mr-2" width={16} />
          Create New Test
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          <Icon icon="solar:download-minimalistic-bold" className="inline mr-2" width={16} />
          Export Performance Data
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
          <Icon icon="solar:settings-bold" className="inline mr-2" width={16} />
          Configure Tests
        </button>
      </div>
    </div>
  );
};

export default QbanksTestInsights;
