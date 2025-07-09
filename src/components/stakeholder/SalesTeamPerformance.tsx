import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { MEDICAL_SUBJECTS } from '../../utils/constants';

interface SalesTeamPerformanceProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const SalesTeamPerformance = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: SalesTeamPerformanceProps) => {
  const [selectedView, setSelectedView] = useState('overview');
  const [sortBy, setSortBy] = useState('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Generate dynamic sales team data based on filters
  const allSalesTeamData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      zone: 'North Zone',
      avatar: 'RK',
      joinDate: '2022-03-15',
      collegesClosed: 45,
      revenue: 8250000,
      targetAchievement: 112,
      collegesTotalAllocated: 52,
      growth: '+28.5%',
      status: 'Active',
      lastActivity: '2024-01-08',
      topCourse: MEDICAL_SUBJECTS[0],
    },
    {
      id: 2,
      name: 'Priya Sharma',
      zone: 'South Zone',
      avatar: 'PS',
      joinDate: '2021-11-20',
      collegesClosed: 42,
      revenue: 7850000,
      targetAchievement: 108,
      collegesTotalAllocated: 48,
      growth: '+24.2%',
      status: 'Active',
      lastActivity: '2024-01-08',
      topCourse: MEDICAL_SUBJECTS[1],
    },
    {
      id: 3,
      name: 'Amit Singh',
      zone: 'West Zone',
      avatar: 'AS',
      joinDate: '2022-07-10',
      collegesClosed: 38,
      revenue: 7200000,
      targetAchievement: 105,
      collegesTotalAllocated: 44,
      growth: '+22.1%',
      status: 'Active',
      lastActivity: '2024-01-07',
      topCourse: MEDICAL_SUBJECTS[2],
    },
    {
      id: 4,
      name: 'Neha Patel',
      zone: 'Central Zone',
      avatar: 'NP',
      joinDate: '2023-01-08',
      collegesClosed: 35,
      revenue: 6800000,
      targetAchievement: 98,
      collegesTotalAllocated: 42,
      growth: '+19.8%',
      status: 'Active',
      lastActivity: '2024-01-08',
      topCourse: MEDICAL_SUBJECTS[3],
    },
    {
      id: 5,
      name: 'Ravi Gupta',
      zone: 'East Zone',
      avatar: 'RG',
      joinDate: '2022-09-12',
      collegesClosed: 32,
      revenue: 6200000,
      targetAchievement: 95,
      collegesTotalAllocated: 38,
      growth: '+17.5%',
      status: 'Active',
      lastActivity: '2024-01-06',
      topCourse: MEDICAL_SUBJECTS[4],
    },
    {
      id: 6,
      name: 'Kavya Reddy',
      zone: 'South Zone',
      avatar: 'KR',
      joinDate: '2023-04-18',
      collegesClosed: 28,
      revenue: 5800000,
      targetAchievement: 92,
      collegesTotalAllocated: 35,
      growth: '+15.2%',
      status: 'Active',
      lastActivity: '2024-01-05',
      topCourse: 'Anatomy Mastery',
    },
    {
      id: 7,
      name: 'Arjun Verma',
      zone: 'North Zone',
      avatar: 'AV',
      joinDate: '2023-06-25',
      collegesClosed: 25,
      revenue: 5200000,
      targetAchievement: 88,
      collegesTotalAllocated: 32,
      growth: '+12.8%',
      status: 'Active',
      lastActivity: '2024-01-04',
      topCourse: 'Physiology Deep Dive',
    },
    {
      id: 8,
      name: 'Deepika Joshi',
      zone: 'West Zone',
      avatar: 'DJ',
      joinDate: '2023-08-14',
      collegesClosed: 22,
      revenue: 4800000,
      targetAchievement: 85,
      collegesTotalAllocated: 28,
      growth: '+10.5%',
      status: 'Training',
      lastActivity: '2024-01-03',
      topCourse: 'Pathology Essentials',
    },
  ];

  // Apply filters to sales team data
  const salesTeamData = useMemo(() => {
    let data = allSalesTeamData;

    // Apply zone filter
    if (selectedZone !== 'all') {
      data = data.filter((agent) => agent.zone === selectedZone);
    }

    // Apply subject filter by adjusting revenue
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      const subjectMultiplier = subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
      data = data.map((agent) => ({
        ...agent,
        revenue: Math.floor(agent.revenue * subjectMultiplier),
        collegesClosed: Math.floor(agent.collegesClosed * subjectMultiplier),
      }));
    }

    // Apply time range multiplier
    const timeMultiplier =
      timeRange === '1week' ? 0.25 : timeRange === '1month' ? 1 : timeRange === '3months' ? 3 : 12;
    return data.map((agent) => ({
      ...agent,
      revenue: Math.floor(agent.revenue * timeMultiplier),
      collegesClosed: Math.floor(agent.collegesClosed * timeMultiplier),
    }));
  }, [allSalesTeamData, selectedZone, selectedSubject, timeRange]);

  // Sort data
  const sortedData = [...salesTeamData].sort((a, b) => {
    let aValue = a[sortBy as keyof typeof a];
    let bValue = b[sortBy as keyof typeof b];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getTargetColor = (achievement: number) => {
    if (achievement >= 110) return 'text-green-700 bg-green-100';
    if (achievement >= 100) return 'text-blue-700 bg-blue-100';
    if (achievement >= 90) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-700 bg-green-100';
      case 'Training':
        return 'text-blue-700 bg-blue-100';
      case 'Leave':
        return 'text-yellow-700 bg-yellow-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  // Calculate zone-wise performance
  const zonePerformance = salesTeamData.reduce((zones, agent) => {
    if (!zones[agent.zone]) {
      zones[agent.zone] = { revenue: 0, colleges: 0, agents: 0 };
    }
    zones[agent.zone].revenue += agent.revenue;
    zones[agent.zone].colleges += agent.collegesClosed;
    zones[agent.zone].agents += 1;
    return zones;
  }, {} as Record<string, { revenue: number; colleges: number; agents: number }>);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sales Team Performance</h2>
          <p className="text-gray-600 text-sm">
            Top sales leads sorted by revenue and college closures
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-md p-1">
          {[
            { id: 'overview', label: 'Overview', icon: 'solar:chart-2-bold-duotone' },
            { id: 'leaderboard', label: 'Leaderboard', icon: 'solar:cup-star-bold-duotone' },
            { id: 'zones', label: 'Zone Analysis', icon: 'solar:map-point-bold-duotone' },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedView === view.id
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon icon={view.icon} width={16} />
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {selectedView === 'overview' && (
        <>
          {/* Top 4 Sales Leads */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {sortedData.slice(0, 4).map((agent, index) => (
              <div
                key={agent.id}
                className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-md p-4 border border-gray-200/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {agent.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{agent.name}</div>
                      <div className="text-xs text-gray-600">{agent.zone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        index === 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : index === 1
                          ? 'bg-gray-100 text-gray-800'
                          : index === 2
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Revenue</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(agent.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Colleges</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {agent.collegesClosed}/{agent.collegesTotalAllocated}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Target</span>
                    <span
                      className={`text-sm font-semibold ${
                        agent.targetAchievement >= 100 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {agent.targetAchievement}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Sales Lead</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Zone</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">
                    <button
                      onClick={() => handleSort('collegesClosed')}
                      className="flex items-center gap-2 hover:text-emerald-600 transition-colors ml-auto"
                    >
                      Colleges Closed
                      <Icon
                        icon={
                          sortBy === 'collegesClosed' && sortOrder === 'desc'
                            ? 'solar:alt-arrow-down-bold'
                            : 'solar:alt-arrow-up-bold'
                        }
                        width={12}
                        className={
                          sortBy === 'collegesClosed' ? 'text-emerald-600' : 'text-gray-400'
                        }
                      />
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">
                    <button
                      onClick={() => handleSort('revenue')}
                      className="flex items-center gap-2 hover:text-emerald-600 transition-colors ml-auto"
                    >
                      Revenue
                      <Icon
                        icon={
                          sortBy === 'revenue' && sortOrder === 'desc'
                            ? 'solar:alt-arrow-down-bold'
                            : 'solar:alt-arrow-up-bold'
                        }
                        width={12}
                        className={sortBy === 'revenue' ? 'text-emerald-600' : 'text-gray-400'}
                      />
                    </button>
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Target Achievement
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {agent.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{agent.name}</div>
                          <div className="text-xs text-gray-600">Since {agent.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">{agent.zone}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {agent.collegesClosed}
                      </div>
                      <div className="text-xs text-gray-600">of {agent.collegesTotalAllocated}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(agent.revenue)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTargetColor(
                          agent.targetAchievement,
                        )}`}
                      >
                        {agent.targetAchievement}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status,
                        )}`}
                      >
                        {agent.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedView === 'leaderboard' && (
        <div className="space-y-6">
          {/* Leaderboard Rankings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((index) => {
              const agent = sortedData[index];
              const podiumClass =
                index === 0
                  ? 'from-yellow-400 to-yellow-600'
                  : index === 1
                  ? 'from-gray-400 to-gray-600'
                  : 'from-orange-400 to-orange-600';

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${podiumClass} rounded-xl p-6 text-white text-center`}
                >
                  <div className="text-6xl font-bold mb-2">#{index + 1}</div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {agent.avatar}
                  </div>
                  <div className="font-bold text-lg">{agent.name}</div>
                  <div className="text-sm opacity-90 mb-3">{agent.zone}</div>
                  <div className="text-2xl font-bold">{formatCurrency(agent.revenue)}</div>
                  <div className="text-sm opacity-90">{agent.collegesClosed} colleges closed</div>
                </div>
              );
            })}
          </div>

          {/* Achievement Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-md p-4 text-center">
              <Icon
                icon="solar:cup-star-bold-duotone"
                className="text-green-600 mx-auto mb-2"
                width={40}
              />
              <div className="font-semibold text-green-800">Top Revenue Generator</div>
              <div className="text-sm text-green-600">{sortedData[0]?.name}</div>
            </div>

            <div className="bg-blue-50 rounded-md p-4 text-center">
              <Icon
                icon="solar:target-bold-duotone"
                className="text-blue-600 mx-auto mb-2"
                width={40}
              />
              <div className="font-semibold text-blue-800">Best Target Achievement</div>
              <div className="text-sm text-blue-600">
                {sortedData.sort((a, b) => b.targetAchievement - a.targetAchievement)[0]?.name}
              </div>
            </div>

            <div className="bg-purple-50 rounded-md p-4 text-center">
              <Icon
                icon="solar:buildings-3-bold-duotone"
                className="text-purple-600 mx-auto mb-2"
                width={40}
              />
              <div className="font-semibold text-purple-800">Most Colleges Closed</div>
              <div className="text-sm text-purple-600">
                {sortedData.sort((a, b) => b.collegesClosed - a.collegesClosed)[0]?.name}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'zones' && (
        <div className="space-y-6">
          {/* Zone Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {Object.entries(zonePerformance).map(([zone, data]) => (
              <div
                key={zone}
                className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-md p-4 border border-gray-200/50"
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-2">{zone}</div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {formatCurrency(data.revenue)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{data.colleges} colleges</div>
                    <div>{data.agents} agents</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Zone-wise Agent Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(zonePerformance).map(([zone]) => {
              const zoneAgents = salesTeamData.filter((agent) => agent.zone === zone);

              return (
                <div key={zone} className="bg-gray-50 rounded-md p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{zone}</h3>
                  <div className="space-y-2">
                    {zoneAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-2 bg-white rounded"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {agent.avatar}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{agent.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(agent.revenue)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {agent.collegesClosed} colleges
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{salesTeamData.length}</div>
            <div className="text-sm text-gray-600">Active Sales Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ₹
              {(salesTeamData.reduce((sum, agent) => sum + agent.revenue, 0) / 10000000).toFixed(1)}
              Cr
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {salesTeamData.reduce((sum, agent) => sum + agent.collegesClosed, 0)}
            </div>
            <div className="text-sm text-gray-600">Colleges Closed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(
                salesTeamData.reduce((sum, agent) => sum + agent.targetAchievement, 0) /
                  salesTeamData.length,
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Avg. Target Achievement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTeamPerformance;
