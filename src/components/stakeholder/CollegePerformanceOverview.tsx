import { useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { MEDICAL_SUBJECTS, generateInstituteData, formatCurrency } from '../../utils/constants';

interface CollegePerformanceOverviewProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const CollegePerformanceOverview = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: CollegePerformanceOverviewProps) => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Generate college performance data
  const getCollegeData = () => {
    let institutes = generateInstituteData(timeRange);

    // Filter by zone
    if (selectedZone !== 'all') {
      institutes = institutes.filter((institute) => institute.zone === selectedZone);
    }

    // Apply subject filter multiplier
    let baseMultiplier = 1;
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    return institutes.slice(0, 12).map((institute) => ({
      name: institute.name,
      zone: institute.zone,
      usage: Math.floor(institute.usage * baseMultiplier),
      revenue: Math.floor(institute.revenue * baseMultiplier),
      students: Math.floor(institute.students * baseMultiplier),
      growth: institute.growth,
      satisfaction: Math.min(100, 75 + Math.floor(institute.usage / 4)), // Satisfaction based on usage
      activeSubjects: institute.subjects?.length || Math.floor(Math.random() * 8) + 12,
    }));
  };

  const collegeData = getCollegeData();

  // Performance categories
  const getPerformanceStats = () => {
    const total = collegeData.length;
    const highPerformers = collegeData.filter((c) => c.usage >= 85).length;
    const mediumPerformers = collegeData.filter((c) => c.usage >= 60 && c.usage < 85).length;
    const lowPerformers = collegeData.filter((c) => c.usage < 60).length;

    return {
      total,
      highPerformers,
      mediumPerformers,
      lowPerformers,
      avgRevenue: collegeData.reduce((sum, c) => sum + c.revenue, 0) / total,
      avgStudents: collegeData.reduce((sum, c) => sum + c.students, 0) / total,
      avgSatisfaction: collegeData.reduce((sum, c) => sum + c.satisfaction, 0) / total,
    };
  };

  const stats = getPerformanceStats();

  // Chart data for college performance distribution
  const chartData = {
    series: [
      {
        name:
          selectedMetric === 'revenue'
            ? 'Revenue (₹)'
            : selectedMetric === 'students'
            ? 'Students'
            : 'Usage %',
        data: collegeData.map((college) =>
          selectedMetric === 'revenue'
            ? college.revenue / 100000
            : selectedMetric === 'students'
            ? college.students
            : college.usage,
        ),
        color: '#10b981',
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '60%',
        },
      },
      xaxis: {
        categories: collegeData.map((college) => college.name.split(' ').slice(0, 2).join(' ')),
        title: {
          text:
            selectedMetric === 'revenue'
              ? 'Revenue (₹ Lakhs)'
              : selectedMetric === 'students'
              ? 'Number of Students'
              : 'Usage Percentage',
        },
      },
      yaxis: {
        title: { text: 'Medical Colleges' },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => {
          if (selectedMetric === 'revenue') return `₹${val.toFixed(1)}L`;
          if (selectedMetric === 'students') return val.toString();
          return `${val}%`;
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">College Performance Overview</h2>
          <p className="text-sm text-gray-600">
            Comprehensive analysis of medical college performance
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="revenue">Revenue</option>
            <option value="students">Students</option>
            <option value="usage">Usage</option>
          </select>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">High Performers</p>
              <p className="text-2xl font-bold text-emerald-900">{stats.highPerformers}</p>
              <p className="text-xs text-emerald-600">≥85% Usage</p>
            </div>
            <Icon icon="solar:medal-star-bold-duotone" className="text-emerald-600" width={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Medium Performers</p>
              <p className="text-2xl font-bold text-blue-900">{stats.mediumPerformers}</p>
              <p className="text-xs text-blue-600">60-84% Usage</p>
            </div>
            <Icon icon="solar:chart-2-bold-duotone" className="text-blue-600" width={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Avg Revenue</p>
              <p className="text-2xl font-bold text-orange-900">
                {formatCurrency(stats.avgRevenue)}
              </p>
              <p className="text-xs text-orange-600">Per College</p>
            </div>
            <Icon
              icon="solar:dollar-minimalistic-bold-duotone"
              className="text-orange-600"
              width={32}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Avg Satisfaction</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats.avgSatisfaction.toFixed(1)}%
              </p>
              <p className="text-xs text-purple-600">Student Rating</p>
            </div>
            <Icon icon="solar:heart-bold-duotone" className="text-purple-600" width={32} />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>

      {/* College Performance Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed College Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collegeData.map((college, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{college.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {college.zone}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{college.usage}%</div>
                      <div className={`ml-2 w-16 bg-gray-200 rounded-full h-2`}>
                        <div
                          className={`h-2 rounded-full ${
                            college.usage >= 85
                              ? 'bg-emerald-500'
                              : college.usage >= 60
                              ? 'bg-blue-500'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${college.usage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(college.revenue)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.students.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.satisfaction}%
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                    {college.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollegePerformanceOverview;
