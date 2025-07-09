import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { MEDICAL_SUBJECTS, generateInstituteData } from '../../utils/constants';

interface CollegeEngagementAnalyticsProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const CollegeEngagementAnalytics = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: CollegeEngagementAnalyticsProps) => {
  const [selectedView, setSelectedView] = useState('engagement');

  // Generate engagement data
  const getEngagementData = () => {
    let institutes = generateInstituteData(timeRange);

    if (selectedZone !== 'all') {
      institutes = institutes.filter((institute) => institute.zone === selectedZone);
    }

    let baseMultiplier = 1;
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    return institutes.slice(0, 8).map((institute, index) => ({
      name: institute.name.split(' ').slice(0, 2).join(' '),
      fullName: institute.name,
      zone: institute.zone,
      dailyActiveUsers: Math.floor((200 + index * 50) * baseMultiplier),
      weeklyActiveUsers: Math.floor((800 + index * 200) * baseMultiplier),
      monthlyActiveUsers: Math.floor((2000 + index * 500) * baseMultiplier),
      sessionDuration: 25 + index * 3, // minutes
      contentCompletion: Math.min(100, 60 + index * 5), // percentage
      practiceTests: Math.floor((15 + index * 8) * baseMultiplier),
      discussionPosts: Math.floor((45 + index * 12) * baseMultiplier),
      onlineHours: Math.floor((120 + index * 30) * baseMultiplier), // weekly hours
    }));
  };

  const engagementData = getEngagementData();

  // Chart configurations
  const getChartData = () => {
    if (selectedView === 'engagement') {
      return {
        series: [
          {
            name: 'Daily Active Users',
            data: engagementData.map((d) => d.dailyActiveUsers),
            color: '#10b981',
          },
          {
            name: 'Weekly Active Users',
            data: engagementData.map((d) => d.weeklyActiveUsers),
            color: '#3b82f6',
          },
        ],
        options: {
          chart: {
            type: 'bar' as const,
            height: 350,
            toolbar: { show: true },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
            },
          },
          xaxis: {
            categories: engagementData.map((d) => d.name),
            title: { text: 'Medical Colleges' },
          },
          yaxis: {
            title: { text: 'Number of Users' },
          },
          legend: {
            position: 'top' as const,
          },
        },
      };
    } else {
      return {
        series: [
          {
            name: 'Session Duration (min)',
            data: engagementData.map((d) => d.sessionDuration),
            color: '#8b5cf6',
          },
          {
            name: 'Content Completion (%)',
            data: engagementData.map((d) => d.contentCompletion),
            color: '#f59e0b',
          },
        ],
        options: {
          chart: {
            type: 'line' as const,
            height: 350,
            toolbar: { show: true },
          },
          stroke: {
            width: 3,
            curve: 'smooth' as const,
          },
          xaxis: {
            categories: engagementData.map((d) => d.name),
            title: { text: 'Medical Colleges' },
          },
          yaxis: [
            {
              title: { text: 'Session Duration (minutes)' },
              seriesName: 'Session Duration (min)',
            },
            {
              opposite: true,
              title: { text: 'Completion Rate (%)' },
              seriesName: 'Content Completion (%)',
            },
          ],
          legend: {
            position: 'top' as const,
          },
        },
      };
    }
  };

  const chartData = getChartData();

  // Engagement metrics summary
  const getTotalMetrics = () => {
    const totalDAU = engagementData.reduce((sum, d) => sum + d.dailyActiveUsers, 0);
    const totalWAU = engagementData.reduce((sum, d) => sum + d.weeklyActiveUsers, 0);
    const avgSessionDuration =
      engagementData.reduce((sum, d) => sum + d.sessionDuration, 0) / engagementData.length;
    const avgCompletion =
      engagementData.reduce((sum, d) => sum + d.contentCompletion, 0) / engagementData.length;
    const totalTests = engagementData.reduce((sum, d) => sum + d.practiceTests, 0);
    const totalPosts = engagementData.reduce((sum, d) => sum + d.discussionPosts, 0);

    return {
      totalDAU,
      totalWAU,
      avgSessionDuration,
      avgCompletion,
      totalTests,
      totalPosts,
    };
  };

  const metrics = getTotalMetrics();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">College Engagement Analytics</h2>
          <p className="text-sm text-gray-600">Student engagement and platform usage metrics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('engagement')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === 'engagement'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            User Activity
          </button>
          <button
            onClick={() => setSelectedView('quality')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === 'quality'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Quality Metrics
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border">
          <div className="flex items-center gap-3">
            <Icon
              icon="solar:users-group-rounded-bold-duotone"
              className="text-emerald-600"
              width={24}
            />
            <div>
              <p className="text-xs font-medium text-emerald-600">Daily Active</p>
              <p className="text-lg font-bold text-emerald-900">
                {metrics.totalDAU.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border">
          <div className="flex items-center gap-3">
            <Icon icon="solar:calendar-bold-duotone" className="text-blue-600" width={24} />
            <div>
              <p className="text-xs font-medium text-blue-600">Weekly Active</p>
              <p className="text-lg font-bold text-blue-900">{metrics.totalWAU.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border">
          <div className="flex items-center gap-3">
            <Icon icon="solar:clock-circle-bold-duotone" className="text-purple-600" width={24} />
            <div>
              <p className="text-xs font-medium text-purple-600">Avg Session</p>
              <p className="text-lg font-bold text-purple-900">
                {metrics.avgSessionDuration.toFixed(1)}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border">
          <div className="flex items-center gap-3">
            <Icon icon="solar:chart-2-bold-duotone" className="text-orange-600" width={24} />
            <div>
              <p className="text-xs font-medium text-orange-600">Completion</p>
              <p className="text-lg font-bold text-orange-900">
                {metrics.avgCompletion.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border">
          <div className="flex items-center gap-3">
            <Icon icon="solar:document-text-bold-duotone" className="text-pink-600" width={24} />
            <div>
              <p className="text-xs font-medium text-pink-600">Practice Tests</p>
              <p className="text-lg font-bold text-pink-900">
                {metrics.totalTests.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border">
          <div className="flex items-center gap-3">
            <Icon
              icon="solar:chat-round-dots-bold-duotone"
              className="text-indigo-600"
              width={24}
            />
            <div>
              <p className="text-xs font-medium text-indigo-600">Discussions</p>
              <p className="text-lg font-bold text-indigo-900">
                {metrics.totalPosts.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type={selectedView === 'engagement' ? 'bar' : 'line'}
          height={350}
        />
      </div>

      {/* Detailed Engagement Table */}
      {/* <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Engagement Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DAU
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WAU
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session (min)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weekly Hours
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {engagementData.map((college, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{college.fullName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {college.zone}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.dailyActiveUsers.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.weeklyActiveUsers.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.sessionDuration}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {college.contentCompletion}%
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{ width: `${college.contentCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.onlineHours}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default CollegeEngagementAnalytics;
