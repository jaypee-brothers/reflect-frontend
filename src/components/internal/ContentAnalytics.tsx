import { useMemo } from 'react';
import {
  generateSubjectData,
  getTimeRangeMultiplier,
  filterDataBySubject,
} from '../../utils/constants';

interface ContentAnalyticsProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const ContentAnalytics = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: ContentAnalyticsProps) => {
  const allSubjectData = generateSubjectData(timeRange);
  const multiplier = getTimeRangeMultiplier(timeRange);

  // Filter data based on selected filters
  const filteredSubjectData = useMemo(() => {
    let data = allSubjectData;
    if (selectedSubject !== 'all') {
      data = filterDataBySubject(data, selectedSubject);
    }
    return data;
  }, [allSubjectData, selectedSubject]);

  const totalContent = Math.floor(1400 * multiplier);
  const totalVideos = Math.floor(totalContent * 0.6);
  const totalQuestions = Math.floor(totalContent * 8.5);
  const totalDocuments = Math.floor(totalContent * 0.4);

  const contentStats = {
    totalVideos,
    totalQuestions,
    totalDocuments,
    pendingReview: Math.max(5, Math.floor(totalContent * 0.03)),
    newThisMonth: Math.max(10, Math.floor(totalContent * 0.1)),
    viewsThisMonth: Math.floor(200000 * multiplier),
  };

  const topContent = filteredSubjectData.slice(0, 6).map((subject: any, index: number) => ({
    id: index + 1,
    title: `${subject.subject} - ${
      [
        'Advanced Concepts',
        'Clinical Cases',
        'Practical Guide',
        'Key Points',
        'Case Studies',
        'Review Materials',
      ][index]
    }`,
    type: ['Video', 'Video Series', 'Document', 'Interactive', 'Assessment', 'Resource'][index % 6],
    specialty: subject.subject,
    duration: `${Math.floor(15 + Math.random() * 60)} min${
      index === 1 ? ' series' : index === 2 ? ' read' : ''
    }`,
    views: Math.floor(subject.videosWatched * (1.2 + Math.random() * 0.8)),
    rating: Number((4.5 + Math.random() * 0.4).toFixed(1)),
    engagement: subject.usage,
    status: Math.random() > 0.1 ? 'published' : 'review',
  }));

  const contentBySpecialty = filteredSubjectData.map((subject: any) => ({
    specialty: subject.subject,
    videos: Math.floor(subject.videosWatched / 50),
    questions: Math.floor(subject.testsAttempted * 2.5),
    documents: Math.floor(subject.videosWatched / 80),
    totalViews: subject.videosWatched,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'review_needed':
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return '🎥';
      case 'Video Series':
        return '📹';
      case 'Document':
        return '📄';
      case 'Question Bank':
        return '❓';
      case 'Interactive':
        return '🎯';
      default:
        return '📚';
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🎥</div>
            <div className="text-xl font-bold text-blue-600">
              {contentStats.totalVideos.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Videos</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">❓</div>
            <div className="text-xl font-bold text-green-600">
              {contentStats.totalQuestions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-xl font-bold text-purple-600">
              {contentStats.totalDocuments.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Documents</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-xl font-bold text-orange-600">{contentStats.pendingReview}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">✨</div>
            <div className="text-xl font-bold text-indigo-600">{contentStats.newThisMonth}</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-xl font-bold text-red-600">
              {contentStats.viewsThisMonth.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Monthly Views</div>
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Upload Content
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Content Calendar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Content</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Specialty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Views</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Engagement</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((content: any) => (
                <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="text-xl mr-3">{getTypeIcon(content.type)}</div>
                      <div className="font-medium text-gray-900">{content.title}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{content.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {content.specialty}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{content.duration}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {content.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-gray-700">{content.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${content.engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{content.engagement}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        content.status,
                      )}`}
                    >
                      {content.status === 'published'
                        ? 'Published'
                        : content.status === 'review_needed'
                        ? 'Review Needed'
                        : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content by Specialty */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Content Distribution by Medical Specialty
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contentBySpecialty.map((specialty: any) => (
            <div key={specialty.specialty} className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{specialty.specialty}</h4>
                <div className="text-sm text-gray-500">
                  {specialty.totalViews.toLocaleString()} views
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{specialty.videos}</div>
                  <div className="text-xs text-gray-600">Videos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {specialty.questions.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{specialty.documents}</div>
                  <div className="text-xs text-gray-600">Documents</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Quality Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Content Rating</span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-semibold text-gray-900">4.7</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Content Completion Rate</span>
              <span className="font-semibold text-gray-900">89%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">User Engagement</span>
              <span className="font-semibold text-green-600">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Content Accuracy Score</span>
              <span className="font-semibold text-blue-600">9.2/10</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Pipeline</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">In Production</span>
              <span className="font-semibold text-orange-600">34 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Under Review</span>
              <span className="font-semibold text-yellow-600">12 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ready to Publish</span>
              <span className="font-semibold text-green-600">8 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Scheduled Releases</span>
              <span className="font-semibold text-blue-600">15 items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAnalytics;
