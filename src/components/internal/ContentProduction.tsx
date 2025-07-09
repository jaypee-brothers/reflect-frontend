import { getTimeRangeMultiplier } from '../../utils/constants';

interface ContentProductionProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const ContentProduction = ({ timeRange }: ContentProductionProps) => {
  const multiplier = getTimeRangeMultiplier(timeRange);

  const totalVideos = Math.floor(150 * multiplier);
  const totalQuestions = Math.floor(2000 * multiplier);
  const totalDocuments = Math.floor(80 * multiplier);
  const totalHours = Math.floor(totalVideos * 1.5);

  const productionStats = {
    videosProduced: totalVideos,
    questionsCreated: totalQuestions,
    documentsWritten: totalDocuments,
    hoursOfContent: totalHours,
    contentApprovalRate: Math.floor(88 + Math.random() * 8),
    avgProductionTime: (4 + Math.random() * 3).toFixed(1) + ' days',
  };

  const productionPipeline = [
    {
      stage: 'Script Writing',
      items: Math.floor(30 + Math.random() * 15),
      avgTime: '2 days',
      status: 'on_track',
      assignedTo: 'Content Team',
    },
    {
      stage: 'Video Production',
      items: Math.floor(25 + Math.random() * 10),
      avgTime: '4 days',
      status: Math.random() > 0.7 ? 'delayed' : 'on_track',
      assignedTo: 'Production Team',
    },
    {
      stage: 'Medical Review',
      items: Math.floor(40 + Math.random() * 15),
      avgTime: '3 days',
      status: 'on_track',
      assignedTo: 'Medical Experts',
    },
    {
      stage: 'Quality Assurance',
      items: Math.floor(20 + Math.random() * 10),
      avgTime: '1 day',
      status: Math.random() > 0.6 ? 'ahead' : 'on_track',
      assignedTo: 'QA Team',
    },
    {
      stage: 'Final Approval',
      items: Math.floor(10 + Math.random() * 8),
      avgTime: '2 days',
      status: 'on_track',
      assignedTo: 'Leadership',
    },
  ];

  const contentTeam = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Lead Medical Content Creator',
      specialty: 'Cardiology',
      itemsThisMonth: 23,
      avgRating: 4.9,
      status: 'active',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Surgery Content Specialist',
      specialty: 'Surgery',
      itemsThisMonth: 19,
      avgRating: 4.8,
      status: 'active',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Emergency Medicine Expert',
      specialty: 'Emergency Medicine',
      itemsThisMonth: 17,
      avgRating: 4.9,
      status: 'active',
    },
    {
      name: 'Dr. David Kim',
      role: 'Pediatrics Content Creator',
      specialty: 'Pediatrics',
      itemsThisMonth: 15,
      avgRating: 4.7,
      status: 'active',
    },
    {
      name: 'Dr. Lisa Thompson',
      role: 'Pathology Specialist',
      specialty: 'Pathology',
      itemsThisMonth: 12,
      avgRating: 4.6,
      status: 'vacation',
    },
  ];

  const upcomingReleases = [
    {
      title: 'Advanced Cardiac Surgery Techniques',
      type: 'Video Series',
      specialty: 'Cardiology',
      releaseDate: '2024-02-15',
      status: 'ready',
      creator: 'Dr. Sarah Johnson',
    },
    {
      title: 'Emergency Trauma Protocols',
      type: 'Interactive Course',
      specialty: 'Emergency Medicine',
      releaseDate: '2024-02-20',
      status: 'review',
      creator: 'Dr. Emily Rodriguez',
    },
    {
      title: 'Pediatric Diagnosis Q-Bank',
      type: 'Question Bank',
      specialty: 'Pediatrics',
      releaseDate: '2024-02-25',
      status: 'production',
      creator: 'Dr. David Kim',
    },
    {
      title: 'Surgical Anatomy 3D Models',
      type: 'Interactive',
      specialty: 'Surgery',
      releaseDate: '2024-03-01',
      status: 'development',
      creator: 'Dr. Michael Chen',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-green-100 text-green-800';
      case 'ahead':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'production':
        return 'bg-blue-100 text-blue-800';
      case 'development':
        return 'bg-purple-100 text-purple-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'vacation':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'On Track';
      case 'ahead':
        return 'Ahead';
      case 'delayed':
        return 'Delayed';
      case 'ready':
        return 'Ready';
      case 'review':
        return 'In Review';
      case 'production':
        return 'In Production';
      case 'development':
        return 'Development';
      case 'active':
        return 'Active';
      case 'vacation':
        return 'On Leave';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Production Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🎥</div>
            <div className="text-xl font-bold text-blue-600">{productionStats.videosProduced}</div>
            <div className="text-sm text-gray-600">Videos Produced</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">❓</div>
            <div className="text-xl font-bold text-green-600">
              {productionStats.questionsCreated.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Questions Created</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-xl font-bold text-purple-600">
              {productionStats.documentsWritten}
            </div>
            <div className="text-sm text-gray-600">Documents Written</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-xl font-bold text-orange-600">
              {productionStats.hoursOfContent}h
            </div>
            <div className="text-sm text-gray-600">Hours of Content</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-xl font-bold text-indigo-600">
              {productionStats.contentApprovalRate}%
            </div>
            <div className="text-sm text-gray-600">Approval Rate</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xl font-bold text-red-600">
              {productionStats.avgProductionTime}
            </div>
            <div className="text-sm text-gray-600">Avg Production Time</div>
          </div>
        </div>
      </div>

      {/* Production Pipeline */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Production Pipeline</h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {productionPipeline.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center mb-3">
                  <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                  <div className="text-2xl font-bold text-blue-600 mt-2">{stage.items}</div>
                  <div className="text-sm text-gray-600">items</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Time:</span>
                    <span className="font-medium">{stage.avgTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Team:</span>
                    <span className="font-medium">{stage.assignedTo}</span>
                  </div>
                  <div className="flex justify-center mt-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        stage.status,
                      )}`}
                    >
                      {getStatusText(stage.status)}
                    </span>
                  </div>
                </div>
              </div>
              {index < productionPipeline.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Team Performance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Creator</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Specialty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Items This Month
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {contentTeam.map((member) => (
                <tr key={member.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{member.name}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{member.role}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {member.specialty}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-gray-900">
                    {member.itemsThisMonth}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-gray-700">{member.avgRating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        member.status,
                      )}`}
                    >
                      {getStatusText(member.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Releases */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Content Releases</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcomingReleases.map((release) => (
            <div key={release.title} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{release.title}</h4>
                  <div className="text-sm text-gray-600">{release.type}</div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    release.status,
                  )}`}
                >
                  {getStatusText(release.status)}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span className="font-medium">{release.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator:</span>
                  <span className="font-medium">{release.creator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Release Date:</span>
                  <span className="font-medium">
                    {new Date(release.releaseDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">🚀</div>
          <div>
            <h4 className="font-semibold text-purple-900 mb-2">Production Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
              <div>
                <p>• Video production pipeline running 2 days behind schedule</p>
                <p>• Medical review stage has highest approval rate (96%)</p>
                <p>• Cardiology content shows highest engagement rates</p>
              </div>
              <div>
                <p>• Content team productivity up 15% this quarter</p>
                <p>• Average content rating improved to 4.8/5</p>
                <p>• Next month's release schedule fully booked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentProduction;
