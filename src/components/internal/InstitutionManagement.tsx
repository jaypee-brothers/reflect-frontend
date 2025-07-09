import { useMemo } from 'react';
import {
  generateInstituteData,
  formatCurrency,
  GEOGRAPHIC_ZONES,
  filterDataByZone,
} from '../../utils/constants';

interface InstitutionManagementProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const InstitutionManagement = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: InstitutionManagementProps) => {
  const allInstituteData = generateInstituteData(timeRange);

  // Filter data based on selected filters
  const filteredInstituteData = useMemo(() => {
    let data = allInstituteData;
    if (selectedZone !== 'all') {
      data = filterDataByZone(data, selectedZone);
    }

    // Apply subject filter by adjusting revenue
    if (selectedSubject !== 'all') {
      const subjectMultiplier = 0.7; // Subject-specific impact
      data = data.map((institute) => ({
        ...institute,
        revenue: Math.floor(institute.revenue * subjectMultiplier),
      }));
    }

    return data;
  }, [allInstituteData, selectedZone, selectedSubject]);

  const institutions = filteredInstituteData
    .map((institute, index) => ({
      id: index + 1,
      name: institute.name,
      type:
        index % 3 === 0
          ? 'Government Medical College'
          : index % 3 === 1
          ? 'Private Medical College'
          : 'Medical University',
      students: institute.students,
      activeStudents: Math.floor((institute.students * institute.usage) / 100),
      courses: institute.subjects.length,
      revenue: formatCurrency(institute.revenue),
      subscriptionStatus: institute.usage > 60 ? 'active' : 'pending_renewal',
      renewalDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      tier: institute.revenue > 50000 ? 'Premium' : 'Standard',
      region: institute.zone || GEOGRAPHIC_ZONES[index % GEOGRAPHIC_ZONES.length],
      contactPerson: `Dr. ${
        ['Sarah Mitchell', 'Michael Chen', 'Priya Sharma', 'Rajesh Kumar', 'Anita Patel'][index % 5]
      }`,
      email: `contact${index + 1}@${institute.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '')}.edu`,
    }))
    .slice(0, 8);

  const tierStats = [
    { tier: 'Premium', count: 15, revenue: '₹1,234,560', growth: '+22%' },
    { tier: 'Standard', count: 7, revenue: '₹456,780', growth: '+15%' },
    { tier: 'Basic', count: 2, revenue: '₹89,450', growth: '+8%' },
  ];

  const regionStats = GEOGRAPHIC_ZONES.map((zone) => ({
    region: zone,
    institutions: Math.floor(8 + Math.random() * 6),
    students: Math.floor(1500 + Math.random() * 1000),
    revenue: formatCurrency(150000 + Math.random() * 200000),
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'renewal_due':
      case 'pending_renewal':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'renewal_due':
      case 'pending_renewal':
        return 'Renewal Due';
      case 'expired':
        return 'Expired';
      default:
        return 'Pending';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      case 'Standard':
        return 'bg-blue-100 text-blue-800';
      case 'Basic':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Institution Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center text-xl mr-4">
              🏥
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Total Institutions</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-md flex items-center justify-center text-xl mr-4">
              👨‍⚕️
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">40,424</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center text-xl mr-4">
              💰
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$1.66M</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center text-xl mr-4">
              📊
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">96%</div>
              <div className="text-sm text-gray-600">Retention Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutions Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Partner Medical Institutions</h3>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Add Institution
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Export List
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Institution</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Students</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Courses</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution) => (
                <tr key={institution.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{institution.name}</div>
                      <div className="text-sm text-gray-500">{institution.contactPerson}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{institution.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {institution.activeStudents.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        of {institution.students.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{institution.courses}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{institution.revenue}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                        institution.tier,
                      )}`}
                    >
                      {institution.tier}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        institution.subscriptionStatus,
                      )}`}
                    >
                      {getStatusText(institution.subscriptionStatus)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Tiers */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Tiers</h3>
          <div className="space-y-4">
            {tierStats.map((tier) => (
              <div
                key={tier.tier}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium text-gray-900">{tier.tier} Tier</div>
                  <div className="text-sm text-gray-500">{tier.count} institutions</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{tier.revenue}</div>
                  <div className="text-sm text-green-600">{tier.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
          <div className="space-y-4">
            {regionStats.map((region) => (
              <div
                key={region.region}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium text-gray-900">{region.region}</div>
                  <div className="text-sm text-gray-500">
                    {region.institutions} institutions • {region.students.toLocaleString()} students
                  </div>
                </div>
                <div className="font-semibold text-gray-900">{region.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Renewal Alerts */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">🔔</div>
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">Upcoming Renewals & Actions</h4>
            <div className="space-y-2 text-sm text-orange-700">
              <p>• Harvard Medical School renewal due in 15 days (Premium tier)</p>
              <p>• 2 institutions have payment issues requiring attention</p>
              <p>• 3 new institution inquiries pending review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionManagement;
