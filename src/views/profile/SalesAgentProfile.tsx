import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';

interface SalesAgentProfileProps {
  agentId?: string;
}

const SalesAgentProfile = ({ agentId = '1' }: SalesAgentProfileProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1year');
  const [selectedGeography, setSelectedGeography] = useState('all');

  // Sample agent data (would normally come from props or API)
  const agentData = {
    id: agentId,
    name: 'Rajesh Kumar',
    profilePhoto: 'RK',
    zone: 'North Zone',
    activeSince: '2022-03-15',
    totalRevenue: 8250000,
    totalSalesDone: 45,
    totalCollegesAllocated: 52,
    email: 'rajesh.kumar@diginerve.com',
    phone: '+91 98765 43210',
    targetAchievement: 112,
    status: 'Active',
  };

  // Year-on-Year revenue data
  const yearlyRevenueData = [
    { year: '2022', revenue: 3200000 },
    { year: '2023', revenue: 5800000 },
    { year: '2024', revenue: 8250000 },
  ];

  // Course distribution data based on filters
  const getCourseDistribution = () => {
    const baseData = [
      { course: 'NEET Foundation', sales: 15, revenue: 3420000, percentage: 33.3 },
      { course: 'AIIMS Preparation', sales: 12, revenue: 2880000, percentage: 26.7 },
      { course: 'MBBS Complete Course', sales: 8, revenue: 1650000, percentage: 17.8 },
      { course: 'Medical Foundation Bundle', sales: 6, revenue: 720000, percentage: 13.3 },
      { course: 'NEET Complete Package', sales: 4, revenue: 580000, percentage: 8.9 },
    ];

    return baseData;
  };

  const courseDistribution = getCourseDistribution();

  // Monthly performance data
  const monthlyPerformance = [
    { month: 'Jan', revenue: 650000, sales: 4 },
    { month: 'Feb', revenue: 720000, sales: 3 },
    { month: 'Mar', revenue: 680000, sales: 5 },
    { month: 'Apr', revenue: 750000, sales: 4 },
    { month: 'May', revenue: 820000, sales: 6 },
    { month: 'Jun', revenue: 690000, sales: 3 },
    { month: 'Jul', revenue: 780000, sales: 5 },
    { month: 'Aug', revenue: 850000, sales: 4 },
    { month: 'Sep', revenue: 920000, sales: 6 },
    { month: 'Oct', revenue: 680000, sales: 3 },
    { month: 'Nov', revenue: 750000, sales: 4 },
    { month: 'Dec', revenue: 880000, sales: 4 },
  ];

  // Year-on-Year Chart
  const yearlyChart = {
    series: [
      {
        name: 'Revenue (₹)',
        data: yearlyRevenueData.map((item) => item.revenue / 100000), // Convert to lakhs
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 300,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `₹${val.toFixed(1)}L`,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: yearlyRevenueData.map((item) => item.year),
        title: {
          text: 'Year',
        },
      },
      yaxis: {
        title: {
          text: 'Revenue (₹ Lakhs)',
        },
      },
      colors: ['#10b981'],
      grid: {
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `₹${val.toFixed(1)} Lakhs`,
        },
      },
    },
  };

  // Course Distribution Pie Chart
  const courseChart = {
    series: courseDistribution.map((item) => item.sales),
    options: {
      chart: {
        type: 'donut' as const,
        height: 400,
      },
      labels: courseDistribution.map((item) => item.course),
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontWeight: 600,
                color: '#374151',
              },
              value: {
                show: true,
                fontSize: '24px',
                fontWeight: 700,
                color: '#111827',
                formatter: (val: string) => val,
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total Sales',
                fontSize: '14px',
                fontWeight: 400,
                color: '#6b7280',
                formatter: () => {
                  return courseDistribution.reduce((sum, item) => sum + item.sales, 0).toString();
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        fontSize: '12px',
      },
    },
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  const calculateGrowthRate = () => {
    const currentYear = yearlyRevenueData[yearlyRevenueData.length - 1].revenue;
    const previousYear = yearlyRevenueData[yearlyRevenueData.length - 2].revenue;
    return (((currentYear - previousYear) / previousYear) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales Agent Profile Dashboard</h1>
            <p className="text-blue-100 mt-1">Individual performance analytics and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
            >
              <option value="7days" className="text-gray-900">
                Last 7 Days
              </option>
              <option value="1month" className="text-gray-900">
                Last Month
              </option>
              <option value="3months" className="text-gray-900">
                Last 3 Months
              </option>
              <option value="1year" className="text-gray-900">
                Last Year
              </option>
            </select>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Agent Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Agent Summary</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                {agentData.profilePhoto}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{agentData.name}</h3>
              <p className="text-gray-600">{agentData.zone}</p>
              <p className="text-sm text-gray-500 mt-2">
                Active since:{' '}
                {new Date(agentData.activeSince).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Contact</div>
                <div className="text-sm text-gray-900">{agentData.email}</div>
                <div className="text-sm text-gray-900">{agentData.phone}</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Revenue */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon
                    icon="solar:dollar-minimalistic-bold-duotone"
                    className="text-white"
                    width={24}
                  />
                </div>
                <div className="text-2xl font-bold text-emerald-700 mb-1">
                  {formatCurrency(agentData.totalRevenue)}
                </div>
                <div className="text-sm text-emerald-600">Total Revenue</div>
                <div className="text-xs text-emerald-500 mt-1">Filtered by {selectedTimeRange}</div>
              </div>

              {/* Total Sales */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon icon="solar:chart-2-bold-duotone" className="text-white" width={24} />
                </div>
                <div className="text-2xl font-bold text-blue-700 mb-1">
                  {agentData.totalSalesDone}
                </div>
                <div className="text-sm text-blue-600">Total Sales Done</div>
                <div className="text-xs text-blue-500 mt-1">Filtered by {selectedTimeRange}</div>
              </div>

              {/* Colleges Allocated */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon icon="solar:buildings-3-bold-duotone" className="text-white" width={24} />
                </div>
                <div className="text-2xl font-bold text-purple-700 mb-1">
                  {agentData.totalCollegesAllocated}
                </div>
                <div className="text-sm text-purple-600">Total Colleges Allocated</div>
                <div className="text-xs text-purple-500 mt-1">
                  {agentData.totalSalesDone} closed
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-gray-900">
                  {agentData.targetAchievement}%
                </div>
                <div className="text-sm text-gray-600">Target Achievement</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-gray-900">+{calculateGrowthRate()}%</div>
                <div className="text-sm text-gray-600">YoY Growth</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-gray-900">
                  {Math.round((agentData.totalSalesDone / agentData.totalCollegesAllocated) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Year-on-Year Growth */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Year-on-Year Growth</h2>
              <p className="text-gray-600 text-sm">Revenue growth trend over years</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">+{calculateGrowthRate()}%</div>
              <div className="text-sm text-gray-600">This Year</div>
            </div>
          </div>

          <Chart
            options={yearlyChart.options}
            series={yearlyChart.series}
            type="bar"
            height={300}
          />

          {/* Growth Insights */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              {yearlyRevenueData.map((year, index) => (
                <div key={year.year} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{year.year}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(year.revenue)}</div>
                  {index > 0 && (
                    <div className="text-xs text-emerald-600">
                      +
                      {(
                        ((year.revenue - yearlyRevenueData[index - 1].revenue) /
                          yearlyRevenueData[index - 1].revenue) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Course Distribution</h2>
              <p className="text-gray-600 text-sm">Sales breakdown by course categories</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedGeography}
                onChange={(e) => setSelectedGeography(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Regions</option>
                <option value="north">North Zone</option>
                <option value="south">South Zone</option>
                <option value="east">East Zone</option>
                <option value="west">West Zone</option>
                <option value="central">Central Zone</option>
              </select>
            </div>
          </div>

          <Chart
            options={courseChart.options}
            series={courseChart.series}
            type="donut"
            height={400}
          />

          {/* Course Performance Table */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance Details</h3>
            <div className="space-y-2">
              {courseDistribution.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full`}
                      style={{
                        backgroundColor: courseChart.options.colors[index],
                      }}
                    ></div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{course.course}</div>
                      <div className="text-xs text-gray-600">{course.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(course.revenue)}
                    </div>
                    <div className="text-xs text-gray-600">{course.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Performance Tracking */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Performance Tracking</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              ₹
              {(monthlyPerformance.reduce((sum, month) => sum + month.revenue, 0) / 100000).toFixed(
                1,
              )}
              L
            </div>
            <div className="text-sm text-emerald-800">Total Revenue (YTD)</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {monthlyPerformance.reduce((sum, month) => sum + month.sales, 0)}
            </div>
            <div className="text-sm text-blue-800">Total Sales (YTD)</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₹
              {(
                monthlyPerformance.reduce((sum, month) => sum + month.revenue, 0) /
                monthlyPerformance.length /
                100000
              ).toFixed(1)}
              L
            </div>
            <div className="text-sm text-purple-800">Avg. Monthly Revenue</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(
                monthlyPerformance.reduce((sum, month) => sum + month.sales, 0) /
                  monthlyPerformance.length,
              )}
            </div>
            <div className="text-sm text-orange-800">Avg. Monthly Sales</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenue</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Sales</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Avg. Deal Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyPerformance.map((month, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{month.month}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {formatCurrency(month.revenue)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">{month.sales}</td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    {formatCurrency(month.revenue / month.sales)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-base text-gray-600">
          DigiNerve Sales Agent Profile Dashboard • Performance Analytics •{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default SalesAgentProfile;
