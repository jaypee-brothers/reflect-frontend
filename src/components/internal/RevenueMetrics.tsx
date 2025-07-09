import { useMemo } from 'react';
import {
  generateSubjectData,
  generateInstituteData,
  getTimeRangeMultiplier,
  formatCurrency,
  filterDataBySubject,
  filterDataByZone,
} from '../../utils/constants';

interface RevenueMetricsProps {
  timeRange: string;
  viewType?: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const RevenueMetrics = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: RevenueMetricsProps) => {
  const allSubjectData = generateSubjectData(timeRange);
  const allInstituteData = generateInstituteData(timeRange);
  const multiplier = getTimeRangeMultiplier(timeRange);

  // Filter data based on selected filters
  const filteredSubjectData = useMemo(() => {
    let data = allSubjectData;
    if (selectedSubject !== 'all') {
      data = filterDataBySubject(data, selectedSubject);
    }
    return data;
  }, [allSubjectData, selectedSubject]);

  const filteredInstituteData = useMemo(() => {
    let data = allInstituteData;
    if (selectedZone !== 'all') {
      data = filterDataByZone(data, selectedZone);
    }
    return data;
  }, [allInstituteData, selectedZone]);

  const totalRevenue = filteredSubjectData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenuePerInstitution =
    filteredInstituteData.length > 0 ? totalRevenue / filteredInstituteData.length : 0;
  const totalStudents = filteredInstituteData.reduce((sum, item) => sum + item.students, 0);
  const avgRevenuePerStudent = totalStudents > 0 ? totalRevenue / totalStudents : 0;

  const revenueData = {
    totalRevenue: formatCurrency(totalRevenue),
    monthlyGrowth: '+' + (15 + Math.random() * 10).toFixed(1) + '%',
    annualGrowth: '+' + (35 + Math.random() * 15).toFixed(1) + '%',
    avgRevenuePerInstitution: formatCurrency(avgRevenuePerInstitution),
    avgRevenuePerStudent: formatCurrency(avgRevenuePerStudent),
  };

  const revenueByTier = [
    {
      tier: 'Premium',
      revenue: formatCurrency(totalRevenue * 0.55),
      percentage: 55.2,
      institutions: 15,
      growth: '+22%',
    },
    {
      tier: 'Standard',
      revenue: formatCurrency(totalRevenue * 0.32),
      percentage: 32.4,
      institutions: 7,
      growth: '+15%',
    },
    {
      tier: 'Basic',
      revenue: formatCurrency(totalRevenue * 0.13),
      percentage: 12.4,
      institutions: 2,
      growth: '+8%',
    },
  ];

  const revenueBySpecialty = filteredSubjectData
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 6)
    .map((item: any) => ({
      specialty: item.subject,
      revenue: formatCurrency(item.revenue),
      growth: item.growth,
      courses: Math.floor(item.enrollments / 25), // Approx courses per subject
    }));

  const monthlyRevenue = Array.from({ length: 6 }, (_, index) => {
    const baseRevenue = totalRevenue * multiplier * (0.8 + index * 0.04);
    const target = baseRevenue * 1.1;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    return {
      month: months[index],
      revenue: Math.floor(baseRevenue),
      target: Math.floor(target),
    };
  });

  const institutionRevenue = filteredInstituteData
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((item: any) => ({
      name: item.name.split(' ').slice(0, 2).join(' '), // Shorten names
      revenue: formatCurrency(item.revenue),
      tier: item.revenue > 50000 ? 'Premium' : 'Standard',
      growth: item.growth,
    }));

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
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold text-green-600">{revenueData.totalRevenue}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-xs text-green-600 mt-1">{revenueData.annualGrowth} YoY</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-2xl font-bold text-blue-600">{revenueData.monthlyGrowth}</div>
            <div className="text-sm text-gray-600">Monthly Growth</div>
            <div className="text-xs text-blue-600 mt-1">vs last month</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🏥</div>
            <div className="text-2xl font-bold text-purple-600">
              {revenueData.avgRevenuePerInstitution}
            </div>
            <div className="text-sm text-gray-600">Avg per Institution</div>
            <div className="text-xs text-purple-600 mt-1">monthly</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">👨‍⚕️</div>
            <div className="text-2xl font-bold text-orange-600">
              {revenueData.avgRevenuePerStudent}
            </div>
            <div className="text-sm text-gray-600">Avg per Student</div>
            <div className="text-xs text-orange-600 mt-1">monthly</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-red-600">112%</div>
            <div className="text-sm text-gray-600">Target Achievement</div>
            <div className="text-xs text-green-600 mt-1">ahead of target</div>
          </div>
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Tier */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Subscription Tier</h3>
          <div className="space-y-4">
            {revenueByTier.map((tier, index) => (
              <div key={tier.tier} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                        tier.tier,
                      )} mr-3`}
                    >
                      {tier.tier}
                    </span>
                    <span className="text-sm text-gray-600">{tier.institutions} institutions</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{tier.revenue}</div>
                    <div className="text-sm text-green-600">{tier.growth}</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${tier.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {tier.percentage}% of total revenue
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="space-y-3">
            {monthlyRevenue.map((month) => (
              <div
                key={month.month}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-semibold mr-3">
                    {month.month}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      ${month.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Target: ${month.target.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-medium ${
                      month.revenue >= month.target ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {month.revenue >= month.target ? '✓' : '✗'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((month.revenue / month.target) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Specialty and Institution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Medical Specialty */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by MBBS Subject</h3>
          <div className="space-y-3">
            {revenueBySpecialty.map((specialty: any, index: number) => (
              <div
                key={specialty.specialty}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{specialty.specialty}</div>
                    <div className="text-sm text-gray-500">{specialty.courses} courses</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{specialty.revenue}</div>
                  <div className="text-sm text-green-600">{specialty.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Revenue Generating Institutions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Revenue Institutions</h3>
          <div className="space-y-3">
            {institutionRevenue.map((institution: any, index: number) => (
              <div
                key={institution.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{institution.name}</div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                        institution.tier,
                      )}`}
                    >
                      {institution.tier}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{institution.revenue}</div>
                  <div className="text-sm text-green-600">{institution.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">📊</div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Revenue Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <p>• Premium tier institutions generate 55% of total revenue</p>
                <p>• Surgery and Internal Medicine are top revenue drivers</p>
                <p>• Monthly targets exceeded by 12% on average</p>
              </div>
              <div>
                <p>• 18% month-over-month growth trend</p>
                <p>• Average revenue per student increased by 8%</p>
                <p>• Q2 revenue projections exceeded expectations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueMetrics;
