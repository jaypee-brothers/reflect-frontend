import { useState } from 'react';
import { Icon } from '@iconify/react';
import { MEDICAL_SUBJECTS } from '../../utils/constants';

interface CourseRevenueTableProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const CourseRevenueTable = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: CourseRevenueTableProps) => {
  const [sortBy, setSortBy] = useState('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Generate dynamic course data based on MBBS subjects
  const courseData = MEDICAL_SUBJECTS.map((subject, index) => {
    const baseRevenue = 3000000 + index * 500000;
    const baseEnrollments = 100 + index * 20;
    const timeMultiplier =
      timeRange === '1week' ? 0.25 : timeRange === '1month' ? 1 : timeRange === '3months' ? 3 : 12;

    // Apply filters
    let subjectMultiplier = 1;
    if (selectedSubject !== 'all' && selectedSubject !== subject) {
      subjectMultiplier = 0; // Hide if not selected
    }

    let zoneMultiplier = selectedZone !== 'all' ? 0.4 : 1;

    const revenue = Math.floor(baseRevenue * timeMultiplier * subjectMultiplier * zoneMultiplier);
    const enrollments = Math.floor(
      baseEnrollments * timeMultiplier * subjectMultiplier * zoneMultiplier,
    );

    if (subjectMultiplier === 0) return null; // Skip if filtered out

    return {
      id: index + 1,
      course: `${subject} - Complete Course`,
      category:
        index < 5 ? 'Core Medical Subject' : index < 10 ? 'Clinical Subject' : 'Specialty Subject',
      revenue,
      enrollments,
      avgPrice: revenue > 0 ? Math.floor(revenue / enrollments) : 0,
      growth: `+${(12 + Math.random() * 20).toFixed(1)}%`,
      status: 'Active',
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };
  }).filter(Boolean) as any[]; // Remove null entries

  // Filter and sort data
  const filteredData = courseData.filter(
    (course) =>
      course.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
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

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getGrowthColor = (growth: string) => {
    const value = parseFloat(growth.replace('+', '').replace('%', ''));
    if (value >= 20) return 'text-green-600 bg-green-50';
    if (value >= 15) return 'text-blue-600 bg-blue-50';
    if (value >= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-700 bg-green-100';
      case 'Limited':
        return 'text-yellow-700 bg-yellow-100';
      case 'Inactive':
        return 'text-red-700 bg-red-100';
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

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Course-wise Revenue Table</h2>
          <p className="text-gray-600 text-sm">
            Detailed breakdown of course performance and metrics
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <Icon
              icon="solar:magnifer-bold-duotone"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width={16}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Export Button */}
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm">
            <Icon icon="solar:download-bold-duotone" width={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                <button
                  onClick={() => handleSort('course')}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
                >
                  Course
                  <Icon
                    icon={
                      sortBy === 'course' && sortOrder === 'desc'
                        ? 'solar:alt-arrow-down-bold'
                        : 'solar:alt-arrow-up-bold'
                    }
                    width={12}
                    className={sortBy === 'course' ? 'text-emerald-600' : 'text-gray-400'}
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
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
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
                <button
                  onClick={() => handleSort('enrollments')}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors ml-auto"
                >
                  Enrollments
                  <Icon
                    icon={
                      sortBy === 'enrollments' && sortOrder === 'desc'
                        ? 'solar:alt-arrow-down-bold'
                        : 'solar:alt-arrow-up-bold'
                    }
                    width={12}
                    className={sortBy === 'enrollments' ? 'text-emerald-600' : 'text-gray-400'}
                  />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
                <button
                  onClick={() => handleSort('avgPrice')}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors ml-auto"
                >
                  Avg. Price
                  <Icon
                    icon={
                      sortBy === 'avgPrice' && sortOrder === 'desc'
                        ? 'solar:alt-arrow-down-bold'
                        : 'solar:alt-arrow-up-bold'
                    }
                    width={12}
                    className={sortBy === 'avgPrice' ? 'text-emerald-600' : 'text-gray-400'}
                  />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Growth</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
                      {course.course.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{course.course}</div>
                      <div className="text-xs text-gray-600">Updated {course.lastUpdated}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-700">{course.category}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(course.revenue)}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-gray-900">{course.enrollments.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-gray-900">₹{course.avgPrice.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGrowthColor(
                      course.growth,
                    )}`}
                  >
                    {course.growth}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      course.status,
                    )}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-emerald-600 transition-colors">
                      <Icon icon="solar:eye-bold-duotone" width={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Icon icon="solar:pen-bold-duotone" width={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Icon icon="solar:chart-2-bold-duotone" width={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of{' '}
            {sortedData.length} courses
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>

            {/* Windowed Pagination Logic */}
            {(() => {
              const pageButtons = [];
              const window = 2; // pages to show around current
              const showFirst = 1;
              const showLast = totalPages;

              for (let i = 1; i <= totalPages; i++) {
                if (
                  i === showFirst ||
                  i === showLast ||
                  (i >= currentPage - window && i <= currentPage + window)
                ) {
                  pageButtons.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg min-w-[32px] ${
                        currentPage === i
                          ? 'text-blue-600 bg-blue-50 border border-blue-300 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      }`}
                    >
                      {i}
                    </button>,
                  );
                } else if (
                  (i === currentPage - window - 1 && i > showFirst) ||
                  (i === currentPage + window + 1 && i < showLast)
                ) {
                  pageButtons.push(
                    <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                      ...
                    </span>,
                  );
                }
              }
              return pageButtons;
            })()}

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{courseData.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ₹{(courseData.reduce((sum, course) => sum + course.revenue, 0) / 10000000).toFixed(1)}
              Cr
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {courseData.reduce((sum, course) => sum + course.enrollments, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Enrollments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              ₹
              {Math.round(
                courseData.reduce((sum, course) => sum + course.avgPrice, 0) / courseData.length,
              ).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Avg. Course Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRevenueTable;
