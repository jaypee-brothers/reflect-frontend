import { Icon } from '@iconify/react';
import { Badge } from 'flowbite-react';

interface TopStudent {
  id: number;
  name: string;
  email: string;
  rank: number;
  avgScore: number;
  testsAttempted: number;
  improvementTrend: 'up' | 'down' | 'stable';
  lastTestScore: number;
}

const StudentsToWatch = () => {
  // Sample data for top performing students
  const topStudents: TopStudent[] = [
    {
      id: 1,
      name: 'Aaditya Sharma',
      email: 'aaditya.sharma@email.com',
      rank: 1,
      avgScore: 94,
      testsAttempted: 15,
      improvementTrend: 'up',
      lastTestScore: 97,
    },
    {
      id: 2,
      name: 'Ishita Agarwal',
      email: 'ishita.agarwal@email.com',
      rank: 2,
      avgScore: 92,
      testsAttempted: 14,
      improvementTrend: 'stable',
      lastTestScore: 92,
    },
    {
      id: 3,
      name: 'Karthik Reddy',
      email: 'karthik.reddy@email.com',
      rank: 3,
      avgScore: 90,
      testsAttempted: 16,
      improvementTrend: 'up',
      lastTestScore: 95,
    },
    {
      id: 4,
      name: 'Meera Iyer',
      email: 'meera.iyer@email.com',
      rank: 4,
      avgScore: 89,
      testsAttempted: 13,
      improvementTrend: 'down',
      lastTestScore: 85,
    },
    {
      id: 5,
      name: 'Rohit Verma',
      email: 'rohit.verma@email.com',
      rank: 5,
      avgScore: 87,
      testsAttempted: 15,
      improvementTrend: 'up',
      lastTestScore: 91,
    },
  ];

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <Icon icon="solar:arrow-up-bold" className="text-green-500" width={16} />;
      case 'down':
        return <Icon icon="solar:arrow-down-bold" className="text-red-500" width={16} />;
      default:
        return <Icon icon="solar:minus-bold" className="text-gray-500" width={16} />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Students to Watch Out For</h2>
          <p className="text-sm text-gray-600 mt-1">Top 5 performers in the last 5 tests</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="solar:star-bold" className="text-yellow-500" width={20} />
          <span className="text-sm text-yellow-600 font-medium">High Achievers</span>
        </div>
      </div>

      {/* Top Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topStudents.map((student) => (
          <div
            key={student.id}
            className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300"
          >
            {/* Rank Badge */}
            <div
              className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getRankBadgeColor(
                student.rank,
              )} flex items-center justify-center text-sm font-bold shadow-lg`}
            >
              #{student.rank}
            </div>

            {/* Student Info */}
            <div className="space-y-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mx-auto mb-2">
                  {student.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="font-semibold text-gray-900 text-sm">{student.name}</div>
                <div className="text-xs text-gray-600 truncate">{student.email}</div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Avg Score</span>
                  <Badge color="success" size="sm">
                    {student.avgScore}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Tests</span>
                  <span className="text-xs font-medium text-gray-900">
                    {student.testsAttempted}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Last Score</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(student.improvementTrend)}
                    <span
                      className={`text-xs font-medium ${getTrendColor(student.improvementTrend)}`}
                    >
                      {student.lastTestScore}%
                    </span>
                  </div>
                </div>

                {/* Performance Trend */}
                <div className="pt-2 border-t border-blue-200">
                  <div className="flex items-center justify-center gap-1">
                    {getTrendIcon(student.improvementTrend)}
                    <span
                      className={`text-xs font-medium ${getTrendColor(student.improvementTrend)}`}
                    >
                      {student.improvementTrend === 'up'
                        ? 'Improving'
                        : student.improvementTrend === 'down'
                        ? 'Declining'
                        : 'Consistent'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">94%</div>
            <div className="text-sm text-gray-600">Highest Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">90.4%</div>
            <div className="text-sm text-gray-600">Group Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">14.6</div>
            <div className="text-sm text-gray-600">Avg Tests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">60%</div>
            <div className="text-sm text-gray-600">Improving</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Icon icon="solar:crown-bold" className="inline mr-2" width={16} />
          Recognize Achievement
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          <Icon icon="solar:medal-star-bold" className="inline mr-2" width={16} />
          Advanced Challenges
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
          <Icon icon="solar:document-text-bold" className="inline mr-2" width={16} />
          Detailed Report
        </button>
      </div>
    </div>
  );
};

export default StudentsToWatch;
