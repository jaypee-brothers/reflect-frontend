import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import { getIntensityColor } from '../../data/institutionalConstants';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const InstitutionOverview = () => {
  // Pagination state for heatmap
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // 0 = current week, -1 = previous week, etc.

  // NEW API-First Approach: Use granular API endpoints
  const { institutionStats, activityHeatmap, fetchInstitutionStats, fetchActivityHeatmap } =
    useInstitutionalStore();

  // Function to calculate date range for a given week offset
  const getWeekDateRange = (weekOffset: number) => {
    const endDate = new Date();
    const startDate = new Date();

    // Calculate the start and end dates for the specific week
    startDate.setDate(endDate.getDate() - 6 + weekOffset * 7); // 7 days back from current date + offset
    endDate.setDate(endDate.getDate() + weekOffset * 7);

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  // Function to format date range for display
  const getFormattedDateRange = (weekOffset: number) => {
    const { startDate, endDate } = getWeekDateRange(weekOffset);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString(
      'en-US',
      formatOptions,
    )}`;
  };

  // Function to fetch heatmap data for specific week
  const fetchWeekData = (weekOffset: number) => {
    const { startDate, endDate } = getWeekDateRange(weekOffset);
    fetchActivityHeatmap({
      timeRange: 'custom',
      start_date: startDate,
      end_date: endDate,
      days: 7,
      forceRefresh: true, // Force API call for different weeks
    });
  };

  // Navigation functions
  const goToPreviousWeek = () => {
    const newOffset = currentWeekOffset - 1;
    setCurrentWeekOffset(newOffset);
    fetchWeekData(newOffset);
  };

  const goToNextWeek = () => {
    const newOffset = currentWeekOffset + 1;
    // Don't go beyond current week
    if (newOffset <= 0) {
      setCurrentWeekOffset(newOffset);
      fetchWeekData(newOffset);
    } else {
      console.log(`🚫 Cannot go beyond current week (offset would be ${newOffset})`);
    }
  };

  useEffect(() => {
    // Fetch data from specific API endpoints on initial load
    fetchInstitutionStats({ timeRange: '7days' });
    fetchWeekData(currentWeekOffset); // Load current week initially
  }, []); // Remove dependencies to avoid infinite loop

  // Handle loading states per endpoint
  if (institutionStats.loading || activityHeatmap.loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-300 rounded-md"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-48 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error states per endpoint
  if (institutionStats.error || activityHeatmap.error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-red-500">Error: {institutionStats.error || activityHeatmap.error}</div>
      </div>
    );
  }

  // Ensure data is available
  if (!institutionStats.data || !activityHeatmap.data) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  const summaryStats = institutionStats.data;
  const heatmapData = activityHeatmap.data;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Medical Institution Overview</h2>
          <Popover content={INFO_POPOVER_CONTENTS['institution-overview']} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Activated Licenses */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500 text-white p-2 rounded-md">
                  <Icon icon="solar:user-check-rounded-bold" width={20} />
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {summaryStats.activatedLicenses}
                </div>
                <Popover content={INFO_POPOVER_CONTENTS['enrolled-students']} />
              </div>
              <div className="text-sm text-blue-600 font-medium">Enrolled Students</div>
            </div>

            {/* Login Rate */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500 text-white p-2 rounded-md">
                  <Icon icon="solar:login-3-bold" width={20} />
                </div>
                <div className="text-2xl font-bold text-green-700">{summaryStats.loginRate}%</div>
                <Popover content={INFO_POPOVER_CONTENTS['active-students']} />
              </div>
              <div className="text-sm text-green-600 font-medium">Active Students</div>
            </div>

            {/* Avg Time Spent */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500 text-white p-2 rounded-md">
                  <Icon icon="solar:clock-circle-bold" width={20} />
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  {summaryStats.avgTimeSpent}
                </div>
                <Popover content={INFO_POPOVER_CONTENTS['average-watch-time']} />
              </div>
              <div className="text-sm text-purple-600 font-medium">Average Watch Time</div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-md p-4 border">
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  icon="solar:users-group-rounded-bold"
                  className="text-yellow-500"
                  width={24}
                />
                <div className="text-2xl font-bold text-yellow-800">
                  {summaryStats.avgTestScore}%
                </div>
                <Popover content={INFO_POPOVER_CONTENTS['average-test-score']} />
              </div>
              <span className="text-sm font-medium text-yellow-700">Average Test Score</span>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-md p-4 border">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:clipboard-list-bold" className="text-purple-500" width={24} />
                <div className="text-2xl font-bold text-purple-800">
                  {summaryStats.avgTestAttempts}
                </div>
                <Popover content={INFO_POPOVER_CONTENTS['average-test-attempts']} />
              </div>
              <span className="text-sm font-medium text-purple-700">Avg Test Attempts</span>
            </div>

            {/* <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-md p-4 border">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:graph-up-bold" className="text-orange-500" width={24} />
                <div className="text-2xl font-bold text-orange-800">60%</div>
              </div>
              <span className="text-sm font-medium text-orange-700">Test Results Improvement</span>
            </div> */}
          </div>
        </div>

        {/* Login Heatmap */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-md p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Student Activity Heatmap</h3>
                  <Popover content={INFO_POPOVER_CONTENTS['student-activity-heatmap']} />
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {getFormattedDateRange(currentWeekOffset)}
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousWeek}
                  className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                  title="Previous week"
                >
                  <Icon icon="solar:arrow-left-bold" width={16} className="text-gray-600" />
                </button>
                <button
                  onClick={goToNextWeek}
                  disabled={currentWeekOffset >= 0}
                  className={`p-1 rounded-md transition-colors ${
                    currentWeekOffset >= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
                  title="Next week"
                >
                  <Icon icon="solar:arrow-right-bold" width={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {/* Weekly view - show actual days from API */}
              <div className="grid grid-cols-7 gap-1 justify-items-center">
                {/* Display actual day letters from heatmap data */}
                {heatmapData.slice(0, 7).map((dayData, index) => (
                  <div key={index} className="text-xs text-center text-gray-600 font-medium">
                    {dayData.day.charAt(0)} {/* First letter of day name */}
                  </div>
                ))}

                {/* Display heatmap squares */}
                {heatmapData
                  .slice(0, 7)
                  .map(
                    (
                      day: { date: string; day: string; intensity: number; loginCount?: number },
                      index: number,
                    ) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded ${getIntensityColor(
                          day.intensity,
                        )} border border-gray-200`}
                        title={`${day.day}, ${day.date}: ${day.loginCount ?? 0} logins`}
                      />
                    ),
                  )}
              </div>
            </div>

            {/* Enhanced Legend with Login Counts */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Less</span>
                <div className="flex gap-4">
                  {['<0', '<5', '<15', '<30', '30+'].map((intensity, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <div
                        className={`w-3 h-3 rounded ${getIntensityColor(
                          index,
                        )} border border-gray-200`}
                      />
                      <span>{intensity}</span>
                    </div>
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionOverview;
