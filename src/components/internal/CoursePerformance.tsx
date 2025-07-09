import { useMemo } from 'react';
import {
  generateCourseData,
  generateSubjectData,
  MEDICAL_SUBJECTS,
  SUBJECT_CATEGORIES,
  formatCurrency,
  filterDataBySubject,
  filterDataByZone,
} from '../../utils/constants';

interface CoursePerformanceProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const CoursePerformance = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: CoursePerformanceProps) => {
  const allCourseData = generateCourseData(timeRange);
  const allSubjectData = generateSubjectData(timeRange);

  // Filter data based on selected filters
  const filteredSubjectData = useMemo(() => {
    let data = allSubjectData;
    if (selectedSubject !== 'all') {
      data = filterDataBySubject(data, selectedSubject);
    }
    return data;
  }, [allSubjectData, selectedSubject]);

  // Create top courses using filtered MBBS subjects
  const topCourses = allCourseData.slice(0, 5).map((course, index) => {
    const availableSubjects = selectedSubject === 'all' ? MEDICAL_SUBJECTS : [selectedSubject];
    const relatedSubject = availableSubjects[index % availableSubjects.length];

    return {
      id: index + 1,
      title: `${course.course} - ${relatedSubject}`,
      specialty: relatedSubject,
      enrollment: course.enrollments,
      completion: Math.floor(75 + Math.random() * 20),
      rating: Number((4.5 + Math.random() * 0.4).toFixed(1)),
      revenue: formatCurrency(course.revenue),
      growth: course.growth,
      status: course.status === 'Active' ? 'active' : 'under_review',
    };
  });

  // Create course categories using filtered MBBS subject categories
  const courseCategories = Object.entries(SUBJECT_CATEGORIES).map(([category, subjects]) => {
    const categorySubjects = filteredSubjectData.filter((s: any) => subjects.includes(s.subject));
    const totalRevenue = categorySubjects.reduce((sum: number, s: any) => sum + s.revenue, 0);
    const avgGrowth =
      categorySubjects.length > 0
        ? categorySubjects.reduce(
            (sum: number, s: any) => sum + parseFloat(s.growth.replace('+', '').replace('%', '')),
            0,
          ) / categorySubjects.length
        : 0;

    return {
      name: category,
      count: subjects.length * 3, // Approx 3 courses per subject
      revenue: formatCurrency(totalRevenue),
      growth: `+${avgGrowth.toFixed(1)}%`,
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'under_review':
        return 'Under Review';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Performance Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Medical Courses</h3>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add New Course
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Export Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Specialty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Enrollment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Completion</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{course.title}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {course.specialty}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{course.enrollment.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{course.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-gray-700">{course.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{course.revenue}</td>
                  <td className="py-4 px-4">
                    <span className="text-green-600 font-medium">{course.growth}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        course.status,
                      )}`}
                    >
                      {getStatusText(course.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Categories Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">MBBS Subject Categories</h3>
          <div className="space-y-4">
            {courseCategories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-500">{category.count} courses</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{category.revenue}</div>
                  <div className="text-sm text-green-600">{category.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Quality Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Course Rating</span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-semibold text-gray-900">4.7</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Completion Rate</span>
              <span className="font-semibold text-gray-900">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Student Satisfaction</span>
              <span className="font-semibold text-green-600">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Content Quality Score</span>
              <span className="font-semibold text-blue-600">8.9/10</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Quality Insights</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Anatomy courses show highest engagement</li>
              <li>• Pathology has fastest completion rates</li>
              <li>• Clinical subjects need content updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course Analytics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Analytics Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">186</div>
            <div className="text-sm text-gray-600">Total Courses</div>
            <div className="text-xs text-green-600 mt-1">+23 this month</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600">Avg. Completion</div>
            <div className="text-xs text-green-600 mt-1">+3% improvement</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">8,540</div>
            <div className="text-sm text-gray-600">Total Enrollments</div>
            <div className="text-xs text-green-600 mt-1">+18% growth</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">4.7</div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
            <div className="text-xs text-green-600 mt-1">+0.2 improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformance;
