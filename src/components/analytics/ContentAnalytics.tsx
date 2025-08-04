import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import { Link } from 'react-router';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const ContentAnalytics = () => {
  // Get data from the institutional store
  const {
    videoContentManagementTable: { data: videoData, loading: videoLoading },
    qbankAnalyticsTable: { data: qbankData, loading: qbankLoading },
    contentSummary: { data: summaryData, loading: summaryLoading },
    fetchVideoContentManagementTable,
    fetchQBankAnalyticsTable,
    fetchContentSummary,
  } = useInstitutionalStore();

  // Fetch data on component mount
  useEffect(() => {
    // Fetch top 5 videos
    fetchVideoContentManagementTable({
      page: 1,
      limit: 5,
    });

    // Fetch top 5 QBank modules
    fetchQBankAnalyticsTable({
      page: 1,
      limit: 5,
    });

    // Fetch content summary for stats
    fetchContentSummary();
  }, [fetchVideoContentManagementTable, fetchQBankAnalyticsTable, fetchContentSummary]);

  // Utility functions for styling
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Loading state
  const isLoading = videoLoading || qbankLoading || summaryLoading;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Content Analytics</h2>
          <Popover content={INFO_POPOVER_CONTENTS['video-content-analytics']} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content analytics...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Top Viewed Videos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Viewed Videos</h3>
              <Icon icon="solar:video-library-bold" className="text-purple-500" width={24} />
            </div>

            <div className="space-y-3">
              {videoData && videoData.length > 0 ? (
                videoData.map((video: any, index: number) => (
                  <div
                    key={video.content_id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{video.title}</div>
                        <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Icon icon="solar:play-bold" width={12} />
                            {video.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="solar:clock-circle-bold" width={12} />
                            {video.duration}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100">
                            Video
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">
                        #{video.serial_number}
                      </div>
                      <div className="text-xs text-gray-500">rank</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No video content data available
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/tables/videos">
                <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
                  <Icon icon="solar:eye-bold" className="inline mr-2" width={16} />
                  All Video Analytics
                </button>
              </Link>
            </div>
          </div>

          {/* QBank Modules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top QBank Modules</h3>
              <Icon icon="solar:document-text-bold" className="text-blue-500" width={24} />
            </div>

            <div className="space-y-3 mb-4">
              {qbankData && qbankData.length > 0 ? (
                qbankData.map((module: any, index: number) => (
                  <div
                    key={module.qbank_id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{module.name}</div>
                        <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Icon icon="solar:users-group-two-rounded-bold" width={12} />
                            {module.total_attempts} attempts
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="solar:graph-up-bold" width={12} />
                            {module.avg_accuracy}% avg
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                              module.difficulty,
                            )}`}
                          >
                            {module.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">{module.module}</div>
                      <div className="text-xs text-gray-500">module</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No QBank data available</div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/tables/qbank-analytics">
                <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  <Icon icon="solar:document-text-bold" className="inline mr-2" width={16} />
                  All Q-bank analytics
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {summaryData?.overall_summary?.avg_total_watched_time}
            </div>
            <div className="text-sm text-gray-600">Avg Video Watch Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {summaryData?.overall_summary?.avg_video_watch_percent}%
            </div>
            <div className="text-sm text-gray-600">Avg Video Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {summaryData?.overall_summary?.avg_qbank_accuracy}%
            </div>
            <div className="text-sm text-gray-600">Avg Qbank Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {summaryData?.overall_summary?.total_qbank_attempts}
            </div>
            <div className="text-sm text-gray-600">Total QBank Attempts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAnalytics;
