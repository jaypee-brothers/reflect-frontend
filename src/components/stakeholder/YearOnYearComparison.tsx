import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { MEDICAL_SUBJECTS, GEOGRAPHIC_ZONES } from '../../utils/constants';

interface YearOnYearComparisonProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const YearOnYearComparison = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: YearOnYearComparisonProps) => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  const courses = ['All Courses', ...MEDICAL_SUBJECTS];

  const areas = ['All Areas', ...GEOGRAPHIC_ZONES];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Generate sample data for current year and previous year with filters
  const generateData = () => {
    let baseMultiplier = 1;

    // Apply subject filter
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    // Apply zone filter
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.4; // Zone-specific data
    }

    // Apply time range multiplier
    const timeMultiplier =
      timeRange === '1week' ? 0.25 : timeRange === '1month' ? 1 : timeRange === '3months' ? 3 : 12;
    baseMultiplier *= timeMultiplier;

    const baseCurrent = [
      2800000, 3200000, 2900000, 3500000, 3800000, 3400000, 4200000, 4000000, 4500000, 4300000,
      4800000, 4600000,
    ];

    const basePrevious = [
      2200000, 2500000, 2300000, 2800000, 3000000, 2700000, 3300000, 3100000, 3600000, 3400000,
      3900000, 3700000,
    ];

    return {
      currentYearData: baseCurrent.map((value) =>
        Math.floor(value * baseMultiplier * (0.9 + Math.random() * 0.2)),
      ),
      previousYearData: basePrevious.map((value) =>
        Math.floor(value * baseMultiplier * (0.9 + Math.random() * 0.2)),
      ),
    };
  };

  const { currentYearData, previousYearData } = generateData();

  const chartData = {
    series: [
      {
        name: '2023',
        data: previousYearData,
        color: '#635BFF',
      },
      {
        name: '2024',
        data: currentYearData,
        color: '#10b981',
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 400,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded',
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: months,
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Revenue (₹)',
        },
        labels: {
          formatter: (value: number) => {
            if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
            if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
            if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
            return `₹${value}`;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
            if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
            if (val >= 1000) return `₹${(val / 1000).toFixed(2)}K`;
            return `₹${val}`;
          },
        },
      },
      legend: {
        position: 'top' as const,
        horizontalAlign: 'center' as const,
      },
      grid: {
        strokeDashArray: 4,
      },
    },
  };

  // Calculate growth metrics
  const currentYearTotal = currentYearData.reduce((sum, val) => sum + val, 0);
  const previousYearTotal = previousYearData.reduce((sum, val) => sum + val, 0);
  const growthRate = (((currentYearTotal - previousYearTotal) / previousYearTotal) * 100).toFixed(
    1,
  );

  const bestMonth = months[currentYearData.indexOf(Math.max(...currentYearData))];
  const worstMonth = months[currentYearData.indexOf(Math.min(...currentYearData))];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Year-on-Year Comparison</h2>
          <p className="text-gray-600 text-sm">
            Monthly revenue comparison between current and previous year
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          >
            {courses.map((course, index) => (
              <option key={index} value={course.toLowerCase().replace(/\s+/g, '-')}>
                {course}
              </option>
            ))}
          </select>

          {/* Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          >
            {areas.map((area, index) => (
              <option key={index} value={area.toLowerCase().replace(/\s+/g, '-')}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={400} />
      </div>

      {/* Growth Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="bg-emerald-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon icon="solar:chart-2-bold-duotone" className="text-emerald-600" width={20} />
            <span className="text-sm font-medium text-emerald-800">YoY Growth</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">+{growthRate}%</div>
        </div>

        <div className="bg-blue-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon icon="solar:star-bold-duotone" className="text-blue-600" width={20} />
            <span className="text-sm font-medium text-blue-800">Best Month</span>
          </div>
          <div className="text-lg font-bold text-blue-600">{bestMonth}</div>
        </div>

        <div className="bg-purple-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="solar:danger-triangle-bold-duotone"
              className="text-purple-600"
              width={20}
            />
            <span className="text-sm font-medium text-purple-800">Needs Focus</span>
          </div>
          <div className="text-lg font-bold text-purple-600">{worstMonth}</div>
        </div>

        <div className="bg-orange-50 rounded-md p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="solar:dollar-minimalistic-bold-duotone"
              className="text-orange-600"
              width={20}
            />
            <span className="text-sm font-medium text-orange-800">Avg Monthly</span>
          </div>
          <div className="text-lg font-bold text-orange-600">
            ₹{(currentYearTotal / 12 / 100000).toFixed(1)}L
          </div>
        </div>
      </div>

      {/* Quarterly Comparison */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => {
            const quarterData = currentYearData.slice(index * 3, (index + 1) * 3);
            const quarterTotal = quarterData.reduce((sum, val) => sum + val, 0);
            const prevQuarterData = previousYearData.slice(index * 3, (index + 1) * 3);
            const prevQuarterTotal = prevQuarterData.reduce((sum, val) => sum + val, 0);
            const quarterGrowth = (
              ((quarterTotal - prevQuarterTotal) / prevQuarterTotal) *
              100
            ).toFixed(1);

            return (
              <div key={quarter} className="bg-gray-50 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{quarter} 2024</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      parseFloat(quarterGrowth) >= 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {quarterGrowth}%
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ₹{(quarterTotal / 10000000).toFixed(1)}Cr
                </div>
                <div className="text-sm text-gray-600">
                  vs ₹{(prevQuarterTotal / 10000000).toFixed(1)}Cr (2023)
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default YearOnYearComparison;
