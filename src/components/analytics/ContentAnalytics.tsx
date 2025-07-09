import { Icon } from '@iconify/react';
import { Badge } from 'flowbite-react';

interface VideoContent {
  id: number;
  title: string;
  views: number;
  duration: string;
  category: string;
  engagementRate: number;
}

interface QBankModule {
  id: number;
  name: string;
  attempts: number;
  avgScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completionRate: number;
}

const ContentAnalytics = () => {
  // Sample data for top viewed videos
  const topVideos: VideoContent[] = [
    {
      id: 1,
      title: 'Introduction to Human Anatomy',
      views: 1284,
      duration: '45:30',
      category: 'Anatomy',
      engagementRate: 89,
    },
    {
      id: 2,
      title: 'Cardiovascular System Overview',
      views: 1156,
      duration: '52:15',
      category: 'Physiology',
      engagementRate: 92,
    },
    {
      id: 3,
      title: 'Cell Biology and Pathology',
      views: 1098,
      duration: '38:45',
      category: 'Pathology',
      engagementRate: 87,
    },
    {
      id: 4,
      title: 'Electromagnetic Waves',
      views: 987,
      duration: '41:20',
      category: 'Physics',
      engagementRate: 85,
    },
    {
      id: 5,
      title: 'Thermodynamics Principles',
      views: 876,
      duration: '49:10',
      category: 'Physics',
      engagementRate: 91,
    },
  ];

  // Sample data for QBank modules
  const qbankModules: QBankModule[] = [
    {
      id: 1,
      name: 'Anatomy MCQs',
      attempts: 2456,
      avgScore: 78,
      difficulty: 'Hard',
      completionRate: 85,
    },
    {
      id: 2,
      name: 'Physiology Problem Set',
      attempts: 2234,
      avgScore: 82,
      difficulty: 'Medium',
      completionRate: 92,
    },
    {
      id: 3,
      name: 'Pathology Quiz Bank',
      attempts: 2098,
      avgScore: 75,
      difficulty: 'Medium',
      completionRate: 88,
    },
    {
      id: 4,
      name: 'Pharmacology Numericals',
      attempts: 1876,
      avgScore: 71,
      difficulty: 'Hard',
      completionRate: 79,
    },
    {
      id: 5,
      name: 'Biochemistry Basics',
      attempts: 1654,
      avgScore: 84,
      difficulty: 'Easy',
      completionRate: 95,
    },
  ];

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

  const getEngagementColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Content-Wise Analytics</h2>
        <div className="flex items-center gap-2">
          <Icon icon="solar:chart-2-bold" className="text-blue-500" width={20} />
          <span className="text-sm text-blue-600 font-medium">Content Performance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Viewed Videos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Viewed Videos</h3>
            <Icon icon="solar:video-library-bold" className="text-purple-500" width={24} />
          </div>

          <div className="space-y-3">
            {topVideos.map((video, index) => (
              <div
                key={video.id}
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
                      <Badge color="info" size="sm">
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-medium ${getEngagementColor(video.engagementRate)}`}
                  >
                    {video.engagementRate}%
                  </div>
                  <div className="text-xs text-gray-500">engagement</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
              <Icon icon="solar:eye-bold" className="inline mr-2" width={16} />
              View All Videos
            </button>
          </div>
        </div>

        {/* QBank Modules */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top QBank Modules</h3>
            <Icon icon="solar:document-text-bold" className="text-blue-500" width={24} />
          </div>

          <div className="space-y-3 mb-4">
            {qbankModules.map((module, index) => (
              <div
                key={module.id}
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
                        {module.attempts} attempts
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="solar:graph-up-bold" width={12} />
                        {module.avgScore}% avg
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
                  <div className="text-sm font-medium text-green-600">{module.completionRate}%</div>
                  <div className="text-xs text-gray-500">completion</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <Icon icon="solar:document-text-bold" className="inline mr-2" width={16} />
              View All QBank Modules
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">6.8k</div>
            <div className="text-sm text-gray-600">Total Video Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">10.3k</div>
            <div className="text-sm text-gray-600">QBank Attempts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">78%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAnalytics;
