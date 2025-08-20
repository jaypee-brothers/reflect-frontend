import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Badge } from 'flowbite-react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import { Link } from 'react-router';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const RedZoneStudents = () => {
  // Use separate API endpoints for inactive users and low score users
  const { inactiveUsers, lowScoreUsers, fetchInactiveUsers, fetchLowScoreUsers } =
    useInstitutionalStore();
  const [activeTab, setActiveTab] = useState('inactivity'); // Default to inactivity tab

  useEffect(() => {
    // Fetch both datasets when component mounts
    fetchInactiveUsers();
    fetchLowScoreUsers();
  }, [fetchInactiveUsers, fetchLowScoreUsers]);

  // Get current tab data with safe array fallback
  const currentTabData = activeTab === 'inactivity' ? inactiveUsers : lowScoreUsers;
  // Handle loading state
  if (currentTabData.loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (currentTabData.error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <Icon icon="solar:danger-circle-bold" className="text-red-500 mb-2" width={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-red-500 text-center mb-4">{currentTabData.error}</p>
          <button
            onClick={() =>
              activeTab === 'inactivity' ? fetchInactiveUsers() : fetchLowScoreUsers()
            }
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getDaysColor = (days: number) => {
    if (days > 21) return 'bg-red-100 text-red-800';
    if (days > 14) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Red Zone Students</h2>
          <Popover content={INFO_POPOVER_CONTENTS['red-zone-students']} />
        </div>
      </div>
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
            onClick={() => setActiveTab('inactivity')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'inactivity'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon icon="solar:login-3-linear" width={16} />
              Inactive
            </div>
          </button>
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
        </div>
      </div>

      {/* Main Content Scrollable */}
      <div className="flex-1 overflow-auto">
        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'inactivity' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  Inactive Users
                  <Popover content="Users who have not logged in for a while" />
                </h3>
              </div>

              <div className="space-y-3  overflow-y-auto">
                {Array.isArray(inactiveUsers.data) && inactiveUsers.data.length > 0 ? (
                  inactiveUsers.data.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-100"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">
                          Last Active:{' '}
                          {user.last_login
                            ? new Date(user.last_login).toLocaleDateString()
                            : 'Never'}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          color="failure"
                          size="sm"
                          className={getDaysColor(user.days_since_login)}
                        >
                          {user.days_since_login} days
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">No inactive users found</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'lowScores' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  Low Score Users
                  <Popover content="Users who have not logged in for a while" />
                </h3>
                <Badge color="yellow" size="sm">
                  {Array.isArray(lowScoreUsers.data) ? lowScoreUsers.data.length : 0} Users
                </Badge>
              </div>

              <div className="space-y-3 overflow-y-auto">
                {Array.isArray(lowScoreUsers.data) && lowScoreUsers.data.length > 0 ? (
                  lowScoreUsers.data.map((user, index) => (
                    <Link
                      key={index}
                      to={`/profile/student/${user.id}`}
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-md border border-orange-100 hover:bg-orange-100 transition-colors cursor-pointer no-underline"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">
                          {user.totalAssessments
                            ? `${user.totalAssessments} assessments taken`
                            : 'No assessments taken'}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge color="yellow" size="sm">
                          {user.avgScore}%
                        </Badge>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">No low score users found</div>
                )}
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
    </div>
  );
};

export default RedZoneStudents;
