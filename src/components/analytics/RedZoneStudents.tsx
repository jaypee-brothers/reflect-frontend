import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Badge } from 'flowbite-react';

interface RedZoneStudent {
  id: number;
  name: string;
  email: string;
  daysSinceLogin?: number;
  avgScore?: number;
  testsAttempted?: number;
}

const RedZoneStudents = () => {
  const [activeTab, setActiveTab] = useState('lowScores');

  // Sample data for students with no login in last 14 days
  const noLoginStudents: RedZoneStudent[] = [
    {
      id: 1,
      name: 'Amit Gupta',
      email: 'amit.gupta@email.com',
      daysSinceLogin: 16,
    },
    {
      id: 2,
      name: 'Pooja Mehta',
      email: 'pooja.mehta@email.com',
      daysSinceLogin: 21,
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      daysSinceLogin: 18,
    },
    {
      id: 4,
      name: 'Sunita Sharma',
      email: 'sunita.sharma@email.com',
      daysSinceLogin: 25,
    },
    {
      id: 5,
      name: 'Deepak Singh',
      email: 'deepak.singh@email.com',
      daysSinceLogin: 14,
    },
  ];

  // Sample data for students with low scores in last 5 tests
  const lowScoreStudents: RedZoneStudent[] = [
    {
      id: 6,
      name: 'Neha Patel',
      email: 'neha.patel@email.com',
      avgScore: 42,
      testsAttempted: 5,
    },
    {
      id: 7,
      name: 'Suresh Reddy',
      email: 'suresh.reddy@email.com',
      avgScore: 38,
      testsAttempted: 4,
    },
    {
      id: 8,
      name: 'Priti Jain',
      email: 'priti.jain@email.com',
      avgScore: 45,
      testsAttempted: 5,
    },
    {
      id: 9,
      name: 'Manoj Yadav',
      email: 'manoj.yadav@email.com',
      avgScore: 35,
      testsAttempted: 3,
    },
    {
      id: 10,
      name: 'Kavitha Iyer',
      email: 'kavitha.iyer@email.com',
      avgScore: 41,
      testsAttempted: 5,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score < 40) return 'bg-red-100 text-red-800';
    if (score < 50) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getDaysColor = (days: number) => {
    if (days > 21) return 'bg-red-100 text-red-800';
    if (days > 14) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="flex flex-col items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Non-Performing Students</h2>
        <div className="flex items-center gap-2">
          <Icon icon="solar:danger-circle-bold" className="text-red-500" width={20} />
          <span className="text-sm text-red-600 font-medium">Needs Attention</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setActiveTab('lowScores')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'lowScores'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon icon="solar:graph-down-linear" width={16} />
              Low Scores
            </div>
          </button>
          <button
            onClick={() => setActiveTab('noLogin')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'noLogin'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon icon="solar:login-3-linear" width={16} />
              Inactive
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'noLogin' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Inactive in last 7 days</h3>
              <Badge color="failure" size="sm">
                {noLoginStudents.length} Students
              </Badge>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {noLoginStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-100"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.email}</div>
                  </div>
                  <div className="text-right">
                    <Badge
                      color="failure"
                      size="sm"
                      className={getDaysColor(student.daysSinceLogin!)}
                    >
                      {student.daysSinceLogin} days
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lowScores' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Low Scores in Last 5 Tests</h3>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lowScoreStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-md border border-orange-100"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.email}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {student.testsAttempted} tests attempted
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge color="warning" size="sm" className={getScoreColor(student.avgScore!)}>
                      {student.avgScore}% avg
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
            <Icon icon="solar:download-linear" className="inline mr-1" width={14} />
            Export List
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedZoneStudents;
