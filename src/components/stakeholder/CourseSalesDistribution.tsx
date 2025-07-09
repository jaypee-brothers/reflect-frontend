import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { MEDICAL_SUBJECTS, GEOGRAPHIC_ZONES } from '../../utils/constants';

interface CourseSalesDistributionProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
  showGeographyFilter?: boolean;
}

const CourseSalesDistribution = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
  showGeographyFilter = false,
}: CourseSalesDistributionProps) => {
  const [selectedDateRange, setSelectedDateRange] = useState(timeRange);
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [viewType, setViewType] = useState<'course-wise' | 'zone-wise'>('course-wise');
  const [zoneViewSubject, setZoneViewSubject] = useState(MEDICAL_SUBJECTS[0]);

  const geographyOptions = ['All Regions', ...GEOGRAPHIC_ZONES];

  // Sample course data based on filters
  const getCourseData = () => {
    let baseMultiplier = 1;

    // Apply subject filter
    if (selectedSubject !== 'all') {
      baseMultiplier *= 0.3; // Single subject data
    }

    // Apply zone filter
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.4; // Zone-specific data
    }

    const subjectsToShow =
      selectedSubject !== 'all' ? [selectedSubject] : MEDICAL_SUBJECTS.slice(0, 7); // Top 7 subjects

    const baseData = subjectsToShow.map((subject, index) => ({
      course: subject,
      sales: Math.floor((1250 - index * 150) * baseMultiplier * (0.9 + Math.random() * 0.2)),
      revenue: Math.floor(
        (28500000 - index * 3000000) * baseMultiplier * (0.9 + Math.random() * 0.2),
      ),
      percentage: 28.5 - index * 3.5,
    }));

    // Add "Others" category if showing all subjects
    if (selectedSubject === 'all') {
      baseData.push({
        course: 'Others',
        sales: Math.floor(45 * baseMultiplier * (0.9 + Math.random() * 0.2)),
        revenue: Math.floor(1080000 * baseMultiplier * (0.9 + Math.random() * 0.2)),
        percentage: 1.2,
      });
    }

    return baseData;
  };

  // Sample zone data for zone-wise view
  const getZoneData = () => {
    const baseMultiplier = 1;

    return GEOGRAPHIC_ZONES.map((zone, index) => ({
      zone: zone,
      sales: Math.floor((850 - index * 120) * baseMultiplier * (0.8 + Math.random() * 0.4)),
      revenue: Math.floor(
        (18500000 - index * 2200000) * baseMultiplier * (0.8 + Math.random() * 0.4),
      ),
      percentage: 32.5 - index * 6.2,
    }));
  };

  const courseData = getCourseData();
  const zoneData = getZoneData();

  // Dynamic data based on view type
  const currentData = viewType === 'course-wise' ? courseData : zoneData;
  const currentLabels =
    viewType === 'course-wise'
      ? courseData.map((item) => item.course)
      : zoneData.map((item) => item.zone);

  const chartData = {
    series:
      selectedMetric === 'sales'
        ? currentData.map((item) => item.sales)
        : currentData.map((item) => item.revenue / 100000), // Convert to lakhs for readability
    options: {
      chart: {
        type: 'donut' as const,
        height: 400,
      },
      labels: currentLabels,
      colors: [
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#f59e0b',
        '#ef4444',
        '#06b6d4',
        '#84cc16',
        '#6b7280',
        '#ec4899',
        '#14b8a6',
      ],
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
                formatter: (val: string) => {
                  if (selectedMetric === 'sales') {
                    return val;
                  } else {
                    return `₹${parseFloat(val).toFixed(1)}L`;
                  }
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: selectedMetric === 'sales' ? 'Total Sales' : 'Total Revenue',
                fontSize: '14px',
                fontWeight: 400,
                color: '#6b7280',
                formatter: () => {
                  const total =
                    selectedMetric === 'sales'
                      ? currentData.reduce((sum, item) => sum + item.sales, 0)
                      : currentData.reduce((sum, item) => sum + item.revenue, 0);

                  if (selectedMetric === 'sales') {
                    return total.toLocaleString();
                  } else {
                    return `₹${(total / 10000000).toFixed(1)}Cr`;
                  }
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
        markers: {
          width: 8,
          height: 8,
          radius: 2,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 4,
        },
      },
      tooltip: {
        y: {
          formatter: (val: number, opts: any) => {
            const dataIndex = opts.seriesIndex;
            const itemInfo = currentData[dataIndex];

            if (selectedMetric === 'sales') {
              return `${val} sales (${itemInfo.percentage.toFixed(1)}%)`;
            } else {
              return `₹${(itemInfo.revenue / 100000).toFixed(1)}L (${itemInfo.percentage.toFixed(
                1,
              )}%)`;
            }
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {viewType === 'course-wise'
              ? 'Course Sales Distribution'
              : `Zone Distribution - ${zoneViewSubject}`}
          </h2>
          <p className="text-gray-600 text-sm">
            {viewType === 'course-wise'
              ? 'Percentage share of different courses sold across regions'
              : `Geographic distribution of ${zoneViewSubject} sales`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* View Type Tabs */}
          <div className="flex bg-gray-100 rounded-md p-1">
            {[
              { id: 'course-wise', label: 'Course-wise', icon: 'solar:book-2-bold' },
              { id: 'zone-wise', label: 'Zone-wise', icon: 'solar:map-bold' },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setViewType(view.id as 'course-wise' | 'zone-wise')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewType === view.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon icon={view.icon} width={16} />
                {view.label}
              </button>
            ))}
          </div>

          {/* Metric Selection */}
          <div className="flex bg-gray-100 rounded-md p-1">
            {[
              { id: 'sales', label: 'Sales Count', icon: 'solar:chart-2-bold' },
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

          {/* Date Range Filter - only for course-wise view */}
          {viewType === 'course-wise' && (
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            >
              <option value="7days">Last 7 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          )}

          {/* Subject Selector for Zone View */}
          {viewType === 'zone-wise' && (
            <select
              value={zoneViewSubject}
              onChange={(e) => setZoneViewSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            >
              {MEDICAL_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          )}

          {/* Geography Filter - only for course-wise view */}
          {viewType === 'course-wise' && showGeographyFilter && (
            <select
              value={selectedGeography}
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            >
              {geographyOptions.map((geo, index) => (
                <option key={index} value={geo.toLowerCase().replace(/\s+/g, '-')}>
                  {geo}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="lg:col-span-2">
          <Chart options={chartData.options} series={chartData.series} type="donut" height={400} />
        </div>

        {/* Performance List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {viewType === 'course-wise' ? 'Course Rankings' : 'Zone Rankings'}
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {currentData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{
                      backgroundColor: chartData.options.colors[index],
                    }}
                  ></div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {viewType === 'course-wise' ? (item as any).course : (item as any).zone}
                    </div>
                    <div className="text-xs text-gray-600">
                      {selectedMetric === 'sales'
                        ? `${item.sales} sales`
                        : `₹${(item.revenue / 100000).toFixed(1)}L`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {item.percentage.toFixed(1)}%
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{currentData.length}</div>
            <div className="text-sm text-gray-600">
              {viewType === 'course-wise' ? 'Active Courses' : 'Active Zones'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {viewType === 'course-wise'
                ? (currentData[0] as any).course
                : (currentData[0] as any).zone}
            </div>
            <div className="text-sm text-gray-600">Top Performer</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {currentData[0].percentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">
              {viewType === 'course-wise'
                ? (currentData[0] as any).course
                : (currentData[0] as any).zone}{' '}
              Share
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              ₹
              {(
                currentData.reduce((sum, item) => sum + item.revenue, 0) /
                currentData.reduce((sum, item) => sum + item.sales, 0) /
                1000
              ).toFixed(0)}
              K
            </div>
            <div className="text-sm text-gray-600">Avg. Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSalesDistribution;
