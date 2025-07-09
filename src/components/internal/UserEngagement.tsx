import { useMemo } from 'react';
import {
  generateSubjectData,
  generateInstituteData,
  getTimeRangeMultiplier,
  formatNumber,
  filterDataBySubject,
  filterDataByZone,
} from '../../utils/constants';

interface UserEngagementProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const UserEngagement = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: UserEngagementProps) => {
  const allSubjectData = generateSubjectData(timeRange);
  const allInstituteData = generateInstituteData(timeRange);
  const multiplier = getTimeRangeMultiplier(timeRange);

  // Filter data based on selected filters
  const filteredSubjectData = useMemo(() => {
    let data = allSubjectData;
    if (selectedSubject !== 'all') {
      data = filterDataBySubject(data, selectedSubject);
    }
    return data;
  }, [allSubjectData, selectedSubject]);

  const filteredInstituteData = useMemo(() => {
    let data = allInstituteData;
    if (selectedZone !== 'all') {
      data = filterDataByZone(data, selectedZone);
    }
    return data;
  }, [allInstituteData, selectedZone]);

  const totalActiveUsers = filteredInstituteData.reduce(
    (sum, item) => sum + Math.floor((item.students * item.usage) / 100),
    0,
  );
  const dailyActiveUsers = Math.floor(totalActiveUsers * 0.34);
  const weeklyActiveUsers = Math.floor(totalActiveUsers * 0.81);

  const engagementStats = {
    totalActiveUsers,
    dailyActiveUsers,
    weeklyActiveUsers,
    averageSessionTime: Math.floor(35 + Math.random() * 20) + ' min',
    courseCompletionRate: Math.floor(80 + Math.random() * 15),
    contentEngagementScore: Number((8.0 + Math.random() * 1.5).toFixed(1)),
  };

  const engagementTrends = [
    {
      metric: 'Video Watch Time',
      value: formatNumber(Math.floor(1000 * multiplier)) + ' hours',
      change: '+18%',
      trend: 'up',
    },
    {
      metric: 'Q-Bank Attempts',
      value: formatNumber(Math.floor(40000 * multiplier)),
      change: '+22%',
      trend: 'up',
    },
    {
      metric: 'Discussion Posts',
      value: formatNumber(Math.floor(2000 * multiplier)),
      change: '+15%',
      trend: 'up',
    },
    {
      metric: 'Course Completions',
      value: formatNumber(Math.floor(1500 * multiplier)),
      change: '+12%',
      trend: 'up',
    },
    { metric: 'Mobile App Usage', value: '78%', change: '+8%', trend: 'up' },
    {
      metric: 'Study Streak',
      value: Math.floor(10 + Math.random() * 8) + ' days avg',
      change: '+25%',
      trend: 'up',
    },
  ];

  const usersBySpecialty = filteredSubjectData
    .sort((a: any, b: any) => b.enrollments - a.enrollments)
    .slice(0, 6)
    .map((item: any) => ({
      specialty: item.subject,
      users: item.enrollments,
      engagement: item.usage,
      growth: item.growth,
    }));

  const topInstitutions = filteredInstituteData
    .sort((a: any, b: any) => b.students - a.students)
    .slice(0, 5)
    .map((item: any) => ({
      name: item.name.split(' ').slice(0, 2).join(' '), // Shorten names
      users: Math.floor((item.students * item.usage) / 100),
      engagement: item.usage,
      sessionTime: Math.floor(35 + Math.random() * 20) + ' min',
    }));

  const userActivityHeatmap = [
    { hour: '00:00', activity: 15 },
    { hour: '02:00', activity: 8 },
    { hour: '04:00', activity: 5 },
    { hour: '06:00', activity: 12 },
    { hour: '08:00', activity: 45 },
    { hour: '10:00', activity: 78 },
    { hour: '12:00', activity: 65 },
    { hour: '14:00', activity: 89 },
    { hour: '16:00', activity: 92 },
    { hour: '18:00', activity: 95 },
    { hour: '20:00', activity: 87 },
    { hour: '22:00', activity: 56 },
  ];

  const engagementIssues = [
    {
      issue: 'Low Q-Bank Completion Rate',
      specialty: 'Pathology',
      severity: 'medium',
      affectedUsers: 234,
      recommendation: 'Review question difficulty and add more explanation videos',
    },
    {
      issue: 'High Drop-off in Video Series',
      specialty: 'Surgery',
      severity: 'high',
      affectedUsers: 156,
      recommendation: 'Break long videos into shorter segments',
    },
    {
      issue: 'Low Mobile Engagement',
      specialty: 'Internal Medicine',
      severity: 'low',
      affectedUsers: 89,
      recommendation: 'Optimize mobile video player performance',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getActivityIntensity = (activity: number) => {
    if (activity >= 80) return 'bg-green-500';
    if (activity >= 60) return 'bg-green-400';
    if (activity >= 40) return 'bg-yellow-400';
    if (activity >= 20) return 'bg-orange-400';
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-xl font-bold text-blue-600">
              {engagementStats.totalActiveUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Active Users</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-xl font-bold text-green-600">
              {engagementStats.dailyActiveUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Daily Active Users</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-xl font-bold text-purple-600">
              {engagementStats.weeklyActiveUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Weekly Active Users</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-xl font-bold text-orange-600">
              {engagementStats.averageSessionTime}
            </div>
            <div className="text-sm text-gray-600">Avg Session Time</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-xl font-bold text-indigo-600">
              {engagementStats.courseCompletionRate}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-xl font-bold text-red-600">
              {engagementStats.contentEngagementScore}
            </div>
            <div className="text-sm text-gray-600">Engagement Score</div>
          </div>
        </div>
      </div>

      {/* Engagement Trends */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {engagementTrends.map((trend) => (
            <div key={trend.metric} className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{trend.metric}</div>
                <div className={`text-sm font-medium ${getTrendColor(trend.trend)}`}>
                  {trend.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{trend.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity Heatmap */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity Pattern</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-8">
            {userActivityHeatmap.map((hour) => (
              <div key={hour.hour} className="text-center">
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center text-white text-sm font-medium ${getActivityIntensity(
                    hour.activity,
                  )}`}
                >
                  {hour.activity}
                </div>
                <div className="text-xs text-gray-600 mt-1">{hour.hour}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <div className="w-4 h-4 bg-green-500 rounded"></div>
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Engagement by Specialty and Institution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement by Medical Specialty */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement by MBBS Subject</h3>
          <div className="space-y-3">
            {usersBySpecialty.map((specialty: any, index: number) => (
              <div
                key={specialty.specialty}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{specialty.specialty}</div>
                    <div className="text-sm text-gray-500">
                      {specialty.users.toLocaleString()} users
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{specialty.engagement}%</div>
                  <div className="text-sm text-green-600">{specialty.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Engaging Institutions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Engaging Institutions</h3>
          <div className="space-y-3">
            {topInstitutions.map((institution: any, index: number) => (
              <div
                key={institution.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{institution.name}</div>
                    <div className="text-sm text-gray-500">
                      {institution.users.toLocaleString()} users • {institution.sessionTime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{institution.engagement}%</div>
                  <div className="text-sm text-gray-600">engagement</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Issues */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Engagement Issues & Recommendations
        </h3>
        <div className="space-y-4">
          {engagementIssues.map((issue, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{issue.issue}</h4>
                  <div className="text-sm text-gray-600">
                    {issue.specialty} • {issue.affectedUsers} users affected
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                    issue.severity,
                  )}`}
                >
                  {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Priority
                </span>
              </div>
              <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-md">
                <strong>Recommendation:</strong> {issue.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Insights */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">📈</div>
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Engagement Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
              <div>
                <p>• Peak usage hours: 4 PM - 8 PM (medical students' study time)</p>
                <p>• Emergency Medicine shows highest engagement rates</p>
                <p>• Mobile usage accounts for 78% of total activity</p>
              </div>
              <div>
                <p>• Video content has 92% completion rate</p>
                <p>• Q-bank practice shows 22% increase month-over-month</p>
                <p>• Average study streak improved to 12 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEngagement;
