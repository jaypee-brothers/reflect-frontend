import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';

interface InstituteLevelEngagementProps {
  timeRange: string;
}

const InstituteLevelEngagement = ({ timeRange }: InstituteLevelEngagementProps) => {
  const [selectedMetric, setSelectedMetric] = useState('usage');

  // Sample institute data
  const instituteData = [
    { name: 'AIIMS Delhi', usage: 95, revenue: 850000, students: 1200, growth: '+28.5%' },
    { name: 'JIPMER Puducherry', usage: 92, revenue: 720000, students: 980, growth: '+24.2%' },
    { name: 'CMC Vellore', usage: 89, revenue: 680000, students: 850, growth: '+22.8%' },
    { name: 'AFMC Pune', usage: 87, revenue: 620000, students: 750, growth: '+26.1%' },
    { name: 'KGMU Lucknow', usage: 85, revenue: 580000, students: 720, growth: '+20.5%' },
    { name: 'PGIMER Chandigarh', usage: 82, revenue: 550000, students: 680, growth: '+23.7%' },
    { name: 'SGPGI Lucknow', usage: 80, revenue: 520000, students: 620, growth: '+19.8%' },
    { name: 'NIMHANS Bangalore', usage: 78, revenue: 480000, students: 580, growth: '+21.4%' },
    { name: 'BHU Varanasi', usage: 75, revenue: 450000, students: 550, growth: '+18.2%' },
    { name: 'JNU Delhi', usage: 72, revenue: 420000, students: 520, growth: '+16.5%' },
  ];

  const lowEngagementData = [
    {
      name: 'Regional Medical College A',
      usage: 35,
      revenue: 180000,
      students: 320,
      growth: '+5.2%',
    },
    { name: 'State Medical College B', usage: 32, revenue: 165000, students: 290, growth: '+3.8%' },
    {
      name: 'Private Medical College C',
      usage: 28,
      revenue: 145000,
      students: 250,
      growth: '+2.1%',
    },
    {
      name: 'District Medical College D',
      usage: 25,
      revenue: 125000,
      students: 220,
      growth: '+1.5%',
    },
    { name: 'Rural Medical College E', usage: 22, revenue: 110000, students: 200, growth: '+0.8%' },
  ];

  // Chart data for top performers
  const topPerformersChart = {
    series: [
      {
        name: selectedMetric === 'usage' ? 'Usage %' : 'Revenue (₹L)',
        data:
          selectedMetric === 'usage'
            ? instituteData.slice(0, 10).map((item) => item.usage)
            : instituteData.slice(0, 10).map((item) => item.revenue / 100000),
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
        formatter: (val: number) => {
          return selectedMetric === 'usage' ? `${val}%` : `₹${val.toFixed(1)}L`;
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: instituteData.slice(0, 10).map((item) => item.name),
        title: {
          text: selectedMetric === 'usage' ? 'Usage Percentage' : 'Revenue (₹ Lakhs)',
        },
      },
      yaxis: {
        title: {
          text: 'Colleges',
        },
      },
      colors: ['#10b981'],
      grid: {
        strokeDashArray: 4,
      },
    },
  };

  // Chart data for low engagement
  const lowEngagementChart = {
    series: [
      {
        name: selectedMetric === 'usage' ? 'Usage %' : 'Revenue (₹L)',
        data:
          selectedMetric === 'usage'
            ? lowEngagementData.map((item) => item.usage)
            : lowEngagementData.map((item) => item.revenue / 100000),
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
        formatter: (val: number) => {
          return selectedMetric === 'usage' ? `${val}%` : `₹${val.toFixed(1)}L`;
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: lowEngagementData.map((item) => item.name),
        title: {
          text: selectedMetric === 'usage' ? 'Usage Percentage' : 'Revenue (₹ Lakhs)',
        },
      },
      yaxis: {
        title: {
          text: 'Colleges',
        },
      },
      colors: ['#ef4444'],
      grid: {
        strokeDashArray: 4,
      },
    },
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'text-green-600';
    if (usage >= 60) return 'text-blue-600';
    if (usage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Institute-Level Engagement</h2>
          <p className="text-gray-600 text-sm">
            College usage patterns and revenue performance analysis
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { id: 'usage', label: 'Usage %', icon: 'solar:chart-2-bold' },
            { id: 'revenue', label: 'Revenue', icon: 'solar:dollar-minimalistic-bold' },
          ].map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedMetric === metric.id
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon icon={metric.icon} width={16} />
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top 10 Colleges by Usage */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon icon="solar:cup-star-bold-duotone" className="text-green-600" width={20} />
            <h3 className="text-lg font-semibold text-gray-900">
              Top 10 Colleges by {selectedMetric === 'usage' ? 'Usage' : 'Revenue'}
            </h3>
          </div>

          <Chart
            options={topPerformersChart.options}
            series={topPerformersChart.series}
            type="bar"
            height={350}
          />

          {/* Top performers list */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {instituteData.slice(0, 10).map((institute, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-green-600">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{institute.name}</div>
                    <div className="text-xs text-gray-600">{institute.students} students</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${getUsageColor(institute.usage)}`}>
                    {selectedMetric === 'usage'
                      ? `${institute.usage}%`
                      : formatCurrency(institute.revenue)}
                  </div>
                  <div className="text-xs text-gray-600">{institute.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lowest Engagement Colleges */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon icon="solar:danger-triangle-bold-duotone" className="text-red-600" width={20} />
            <h3 className="text-lg font-semibold text-gray-900">Lowest Engagement Colleges</h3>
          </div>

          <Chart
            options={lowEngagementChart.options}
            series={lowEngagementChart.series}
            type="bar"
            height={350}
          />

          {/* Low engagement list */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {lowEngagementData.map((institute, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-red-600">⚠</div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{institute.name}</div>
                    <div className="text-xs text-gray-600">{institute.students} students</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${getUsageColor(institute.usage)}`}>
                    {selectedMetric === 'usage'
                      ? `${institute.usage}%`
                      : formatCurrency(institute.revenue)}
                  </div>
                  <div className="text-xs text-gray-600">{institute.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Categories */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {instituteData.filter((item) => item.usage >= 80).length}
            </div>
            <div className="text-sm text-green-800 font-medium">High Engagement</div>
            <div className="text-xs text-green-600">80%+ usage</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {instituteData.filter((item) => item.usage >= 60 && item.usage < 80).length}
            </div>
            <div className="text-sm text-blue-800 font-medium">Medium Engagement</div>
            <div className="text-xs text-blue-600">60-79% usage</div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {
                [...instituteData, ...lowEngagementData].filter(
                  (item) => item.usage >= 40 && item.usage < 60,
                ).length
              }
            </div>
            <div className="text-sm text-yellow-800 font-medium">Low Engagement</div>
            <div className="text-xs text-yellow-600">40-59% usage</div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {lowEngagementData.filter((item) => item.usage < 40).length}
            </div>
            <div className="text-sm text-red-800 font-medium">Critical</div>
            <div className="text-xs text-red-600">&lt;40% usage</div>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon icon="solar:star-bold-duotone" className="text-emerald-600" width={20} />
              <span className="text-sm font-semibold text-emerald-800">Success Pattern</span>
            </div>
            <div className="text-sm text-emerald-700">
              Top performers show 80%+ engagement with strong revenue correlation
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon icon="solar:target-bold-duotone" className="text-blue-600" width={20} />
              <span className="text-sm font-semibold text-blue-800">Growth Opportunity</span>
            </div>
            <div className="text-sm text-blue-700">
              Medium engagement colleges can be optimized for 25% revenue increase
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon
                icon="solar:danger-triangle-bold-duotone"
                className="text-orange-600"
                width={20}
              />
              <span className="text-sm font-semibold text-orange-800">Action Required</span>
            </div>
            <div className="text-sm text-orange-700">
              5 colleges need immediate intervention to improve engagement
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {instituteData.length + lowEngagementData.length}
            </div>
            <div className="text-sm text-gray-600">Total Colleges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                [...instituteData, ...lowEngagementData].reduce(
                  (sum, item) => sum + item.usage,
                  0,
                ) /
                  (instituteData.length + lowEngagementData.length),
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Avg. Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₹
              {(
                [...instituteData, ...lowEngagementData].reduce(
                  (sum, item) => sum + item.revenue,
                  0,
                ) / 10000000
              ).toFixed(1)}
              Cr
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {[...instituteData, ...lowEngagementData]
                .reduce((sum, item) => sum + item.students, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteLevelEngagement;
