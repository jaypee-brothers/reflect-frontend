import { Icon } from '@iconify/react';
import { useState } from 'react';

interface OverviewProps {
  timeRange: string;
}

const InstitutionOverview = ({ timeRange }: OverviewProps) => {
  const [heatmapPeriod, setHeatmapPeriod] = useState('7days');

  // Sample data - replace with real API data based on timeRange
  const summaryStats = {
    activatedLicenses: timeRange === '7days' ? 250 : timeRange === '1month' ? 245 : 240,
    loginRate: timeRange === '7days' ? 82 : timeRange === '1month' ? 78 : 75,
    avgTimeSpent: timeRange === '7days' ? '15h' : timeRange === '1month' ? '14h' : '13h',
    mostAccessedContent: 'Medical Videos',
  };

  // Generate heatmap data for the selected period
  const generateHeatmapData = (period: string) => {
    const days = period === '7days' ? 7 : period === '1month' ? 30 : 90;
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        intensity: Math.floor(Math.random() * 5), // 0-4 intensity levels
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData(heatmapPeriod);

  const getIntensityColor = (intensity: number) => {
    const colors = [
      'bg-gray-100', // 0 - no activity
      'bg-blue-200', // 1 - low activity
      'bg-blue-400', // 2 - medium activity
      'bg-blue-600', // 3 - high activity
      'bg-blue-800', // 4 - very high activity
    ];
    return colors[intensity];
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Medical Institution Overview</h2>
        <div className="flex gap-2">
          {['7days', '1month', '3months'].map((period) => (
            <button
              key={period}
              onClick={() => setHeatmapPeriod(period)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                heatmapPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period === '7days' ? '7 Days' : period === '1month' ? '1 Month' : '3 Months'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Activated Licenses */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <Icon icon="solar:user-check-rounded-bold" width={20} />
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {summaryStats.activatedLicenses}
              </div>
              <div className="text-sm text-blue-600 font-medium">Medical Students</div>
            </div>

            {/* Login Rate */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <Icon icon="solar:login-3-bold" width={20} />
                </div>
              </div>
              <div className="text-2xl font-bold text-green-700">{summaryStats.loginRate}%</div>
              <div className="text-sm text-green-600 font-medium">Login Rate</div>
            </div>

            {/* Avg Time Spent */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500 text-white p-2 rounded-lg">
                  <Icon icon="solar:clock-circle-bold" width={20} />
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-700">{summaryStats.avgTimeSpent}</div>
              <div className="text-sm text-purple-600 font-medium">Study Time/Student</div>
            </div>

            {/* Most Accessed Content */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-500 text-white p-2 rounded-lg">
                  <Icon icon="solar:video-library-bold" width={20} />
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-700">
                {summaryStats.mostAccessedContent}
              </div>
              <div className="text-sm text-orange-600 font-medium">Most Accessed</div>
            </div>
          </div>
        </div>

        {/* Login Heatmap */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Activity Heatmap</h3>
            <div className="space-y-2">
              {heatmapPeriod === '7days' ? (
                // Weekly view - show days of week
                <div className="grid grid-cols-7 gap-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-xs text-center text-gray-600 font-medium">
                      {day}
                    </div>
                  ))}
                  {heatmapData.slice(0, 7).map((day, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded ${getIntensityColor(
                        day.intensity,
                      )} border border-gray-200`}
                      title={`${day.date}: ${day.intensity} logins`}
                    />
                  ))}
                </div>
              ) : (
                // Monthly/Quarterly view - show grid
                <div
                  className={`grid gap-1 ${
                    heatmapPeriod === '1month' ? 'grid-cols-10' : 'grid-cols-12'
                  }`}
                >
                  {heatmapData.map((day, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded ${getIntensityColor(
                        day.intensity,
                      )} border border-gray-200`}
                      title={`${day.date}: ${day.intensity} logins`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((intensity) => (
                  <div
                    key={intensity}
                    className={`w-3 h-3 rounded ${getIntensityColor(
                      intensity,
                    )} border border-gray-200`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionOverview;
