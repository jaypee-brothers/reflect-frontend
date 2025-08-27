import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { Progress, Table } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useStudentProfileStore } from '../../data/student/studentProfileStore';
import { useParams } from 'react-router';

const StudentProfile = () => {
  const { userId } = useParams();
  // Auth store for profile info
  // Student profile store
  const {
    summary,
    loginHeatmap,
    currentWeekOffset,
    setCurrentWeekOffset,
    fetchSummary,
    fetchLoginHeatmap,
    videoChartData,
    recentVideos,
    fetchVideoActivity,
    fetchRecentVideos,
    testSummary,
    testHistory,
    fetchTestPerformance,
    loading,
    error,
  } = useStudentProfileStore();

  const [videoWeekOffset, setVideoWeekOffset] = React.useState(0);

  useEffect(() => {
    if (!userId) return;
    fetchSummary(userId);
    fetchLoginHeatmap(undefined, userId);
    // Calculate last 7 days for video activity and recent videos
    const { startDate, endDate } = getVideoWeekDateRange(videoWeekOffset);
    fetchVideoActivity(startDate, endDate, userId);
    fetchRecentVideos(userId);
    fetchTestPerformance(userId);
    // eslint-disable-next-line
  }, [userId, videoWeekOffset]);
  console.log('recent videos', recentVideos);

  // Helper for week navigation
  const goToPreviousWeek = () => {
    setCurrentWeekOffset(currentWeekOffset - 1);
    fetchLoginHeatmap(currentWeekOffset - 1, userId);
  };
  const goToNextWeek = () => {
    if (currentWeekOffset < 0) {
      setCurrentWeekOffset(currentWeekOffset + 1);
      fetchLoginHeatmap(currentWeekOffset + 1, userId);
    }
  };
  // Video Activity week navigation
  const goToPreviousVideoWeek = () => {
    setVideoWeekOffset((prev) => prev - 1);
  };
  const goToNextVideoWeek = () => {
    setVideoWeekOffset((prev) => (prev < 0 ? prev + 1 : prev));
  };

  // Helper to get formatted date range for the current week offset
  const getWeekDateRange = (weekOffset: number) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + weekOffset * 7);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };
  const getFormattedDateRange = (weekOffset: number) => {
    const { startDate, endDate } = getWeekDateRange(weekOffset);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString(
      'en-US',
      formatOptions,
    )}`;
  };
  // Helper to get date range for video activity week offset
  const getVideoWeekDateRange = (weekOffset: number) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + weekOffset * 7);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };
  const getFormattedVideoDateRange = (weekOffset: number) => {
    const { startDate, endDate } = getVideoWeekDateRange(weekOffset);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString(
      'en-US',
      formatOptions,
    )}`;
  };

  // Helper for watched percentage and color
  const getWatchedPercent = (video: { duration: string; watched_secs: number }) => {
    console.log('video object:', video);
    // Support hh:mm:ss, mm:ss, or ss
    const parts = video.duration.split(':').map(Number);
    let totalSecs = 0;
    if (parts.length === 2) {
      totalSecs = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60;
      // mm:ss
    } else if (parts.length === 1) {
      totalSecs = (parts[0] || 0) * 60 + (parts[1] || 0);
      // ss
    }
    if (!totalSecs) return 0;
    const percent = Math.round((video.watched_secs / totalSecs) * 100);
    return Math.min(100, percent);
  };
  const getWatchedColor = (percent: number) => {
    if (percent >= 90) return 'green';
    if (percent >= 70) return 'blue';
    if (percent >= 50) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Profile Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                {summary?.name ? summary.name[0] : '?'}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{summary?.name || '-'}</h3>
              <p className="text-gray-600 text-sm">{summary?.email || '-'}</p>
            </div>
          </div>
          {/* Stats Grid */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">
                  {loading.summary ? '...' : summary?.totalHours ?? '-'}
                </div>
                <div className="text-sm text-blue-600">Total Hours</div>
              </div>
              <div className="bg-purple-50 rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">
                  {loading.summary ? '...' : summary?.videosWatched ?? '-'}
                </div>
                <div className="text-sm text-purple-600">Videos Watched</div>
              </div>
              <div className="bg-green-50 rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-green-700">
                  {loading.summary ? '...' : summary?.qbankAttempted ?? '-'}
                </div>
                <div className="text-sm text-green-600">Qbanks Attempted</div>
              </div>
              <div className="bg-orange-50 rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-orange-700">
                  {loading.summary ? '...' : summary?.testsTaken ?? '-'}
                </div>
                <div className="text-sm text-orange-600">Tests Taken</div>
              </div>
            </div>
          </div>
          {/* Login Heatmap */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Login Activity</h4>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={goToPreviousWeek}
                className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                title="Previous week"
              >
                <Icon icon="solar:arrow-left-bold" width={16} className="text-gray-600" />
              </button>
              <span className="text-xs text-gray-600">
                {getFormattedDateRange(currentWeekOffset)}
              </span>
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
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-xs text-center text-gray-600 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {loading.loginHeatmap
                ? Array(7)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded bg-gray-200 animate-pulse border border-gray-300"
                      />
                    ))
                : loginHeatmap?.heatmap
                    ?.slice(0, 7)
                    .map((day, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded ${
                          day.loggedIn === 1 ? 'bg-green-500' : 'bg-gray-200'
                        } border border-gray-300`}
                        title={`${day.date}: ${day.loggedIn === 1 ? 'Active' : 'No activity'}`}
                      />
                    ))}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
              <span>Less</span>
              <span>More</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Last login:{' '}
              {loginHeatmap?.lastLogin
                ? new Date(loginHeatmap.lastLogin).toLocaleDateString()
                : '-'}
            </p>
            {error.loginHeatmap && (
              <div className="text-xs text-red-500 mt-1">{error.loginHeatmap}</div>
            )}
          </div>
        </div>
      </div>
      {/* Video Activity & Test Performance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Video Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Video Activity</h2>
            <div className="flex gap-2 items-center">
              <button
                onClick={goToPreviousVideoWeek}
                className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                title="Previous week"
              >
                <Icon icon="solar:arrow-left-bold" width={16} className="text-gray-600" />
              </button>
              <span className="text-xs text-gray-600">
                {getFormattedVideoDateRange(videoWeekOffset)}
              </span>
              <button
                onClick={goToNextVideoWeek}
                disabled={videoWeekOffset >= 0}
                className={`p-1 rounded-md transition-colors ${
                  videoWeekOffset >= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                }`}
                title="Next week"
              >
                <Icon icon="solar:arrow-right-bold" width={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          {/* Chart */}
          <div className="mb-6">
            {error.videoActivity ? (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-center">
                <div className="font-semibold mb-1">Failed to load video activity</div>
                <div className="text-xs">{error.videoActivity}</div>
              </div>
            ) : loading.videoActivity ? (
              <div className="h-48 bg-blue-100 animate-pulse rounded flex items-center justify-center">
                <span className="text-blue-400 font-semibold">Loading video activity...</span>
              </div>
            ) : (
              <Chart
                options={{
                  chart: { type: 'bar', height: 200, toolbar: { show: false } },
                  plotOptions: { bar: { borderRadius: 4, distributed: false } },
                  dataLabels: { enabled: false },
                  xaxis: {
                    categories:
                      videoChartData.length > 0
                        ? videoChartData.map((d) =>
                            new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
                          )
                        : Array(7)
                            .fill('')
                            .map((_, i) =>
                              new Date(
                                Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
                              ).toLocaleDateString('en', { weekday: 'short' }),
                            ),
                    title: { text: 'Day', style: { fontWeight: 600, color: '#64748b' } },
                  },
                  yaxis: {
                    min: 0,
                    // Dynamically set max for better scaling
                    max: Math.max(60, ...videoChartData.map((d) => d.minutes || 0)),
                    tickAmount: 6,
                    labels: {
                      formatter: (val: number) => `${val} min`,
                    },
                    title: {
                      text: 'Minutes Watched',
                      style: { fontWeight: 600, color: '#64748b' },
                    },
                  },
                  colors: ['#3B82F6'],
                  grid: { strokeDashArray: 4 },
                }}
                series={[
                  {
                    name: 'Minutes Watched',
                    data:
                      videoChartData.length > 0
                        ? videoChartData.map((d) => d.minutes ?? 0)
                        : Array(7).fill(0),
                  },
                ]}
                type="bar"
                height={200}
              />
            )}
          </div>
          {/* Recent Videos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Watched Videos</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {error.recentVideos ? (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-center">
                  <div className="font-semibold mb-1">Failed to load recent videos</div>
                  <div className="text-xs">{error.recentVideos}</div>
                </div>
              ) : loading.recentVideos ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <div key={i} className="h-12 bg-blue-100 animate-pulse rounded" />)
              ) : recentVideos.length === 0 ? (
                <div className="text-gray-500 text-sm">No recent videos.</div>
              ) : (
                recentVideos.map((video) => {
                  const percent = getWatchedPercent(video);
                  return (
                    <div
                      key={video.content_id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{video.title}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <Icon icon="solar:clock-circle-bold" width={12} />
                          {video.duration}
                          <span>•</span>
                          {new Date(video.watched_at).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <Progress progress={percent} size="sm" color={getWatchedColor(percent)} />
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-sm font-medium text-${getWatchedColor(percent)}-600`}>
                          {percent}%
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {/* Test Performance */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">QBanks & Test Performance</h2>
          {/* Performance Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                {error.testPerformance ? (
                  <span className="text-red-500">Error</span>
                ) : loading.testPerformance ? (
                  <span className="text-green-300 animate-pulse">...</span>
                ) : (
                  <>{testSummary?.overallAccuracy ?? '-'}%</>
                )}
              </div>
              <div className="text-sm text-green-600">Avg. Qbank Accuracy</div>
            </div>
            <div className="bg-blue-50 rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {error.testPerformance ? (
                  <span className="text-red-500">Error</span>
                ) : loading.testPerformance ? (
                  <span className="text-blue-300 animate-pulse">...</span>
                ) : (
                  <>{testSummary?.avgScore ?? '-'}</>
                )}
              </div>
              <div className="text-sm text-blue-600">Avg. Test Score</div>
            </div>
          </div>
          {/* Test History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test History</h3>
            <div className="overflow-x-auto">
              {error.testPerformance ? (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-center">
                  <div className="font-semibold mb-1">Failed to load test history</div>
                  <div className="text-xs">{error.testPerformance}</div>
                </div>
              ) : (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Test Name</Table.HeadCell>
                    <Table.HeadCell>Score</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {loading.testPerformance ? (
                      <Table.Row>
                        <Table.Cell colSpan={3}>
                          <div className="h-8 bg-blue-100 animate-pulse rounded flex items-center justify-center">
                            <span className="text-blue-400 font-semibold">
                              Loading test history...
                            </span>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ) : testHistory.length === 0 ? (
                      <Table.Row>
                        <Table.Cell colSpan={3} className="text-gray-500 text-sm text-center">
                          No test history.
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      testHistory.slice(0, 5).map((test) => (
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
                              {test.score}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="text-gray-600 text-sm">
                            {test.date ? new Date(test.date).toLocaleDateString() : '-'}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
