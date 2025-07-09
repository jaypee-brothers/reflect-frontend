import { useState, useMemo } from 'react';
import {
  generateSubjectData,
  generateInstituteData,
  getTimeRangeMultiplier,
  formatCurrency,
  filterDataBySubject,
  filterDataByZone,
  MEDICAL_SUBJECTS,
} from '../../utils/constants';

interface BusinessOverviewProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const BusinessOverview = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: BusinessOverviewProps) => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const multiplier = getTimeRangeMultiplier(timeRange);

  // Generate and filter data based on selected filters
  const allSubjectData = generateSubjectData(timeRange);
  const allInstituteData = generateInstituteData(timeRange);

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

  // Calculate dynamic metrics based on filtered data
  const totalRevenue = filteredSubjectData.reduce((sum, item) => sum + item.revenue, 0);
  const totalInstitutions = filteredInstituteData.length;
  const totalStudents = filteredInstituteData.reduce((sum, item) => sum + item.students, 0);
  const activeCourses = filteredSubjectData.length * 8; // Approx 8 courses per subject
  const totalContent = Math.floor(activeCourses * 12.5); // Approx 12.5 content items per course

  const data = {
    revenue: formatCurrency(totalRevenue),
    growth: '+' + (15 + Math.random() * 15).toFixed(1) + '%',
    institutions: totalInstitutions,
    newInstitutions: Math.max(1, Math.floor(multiplier * 2)),
    students: totalStudents,
    activeStudents: Math.floor(totalStudents * 0.85),
    courses: activeCourses,
    newCourses: Math.max(1, Math.floor(multiplier * 25)),
    content: totalContent,
    newContent: Math.max(5, Math.floor(multiplier * 150)),
  };

  const metrics = [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: data.revenue,
      change: data.growth,
      icon: '💰',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-700',
      changeColor: 'text-green-600',
    },
    {
      id: 'institutions',
      label: 'Partner Institutions',
      value: data.institutions.toString(),
      change: `+${data.newInstitutions} new`,
      icon: '🏥',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      changeColor: 'text-blue-600',
    },
    {
      id: 'students',
      label: 'Active Medical Students',
      value: data.activeStudents.toLocaleString(),
      change: `${data.students.toLocaleString()} total`,
      icon: '👨‍⚕️',
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-700',
      changeColor: 'text-purple-600',
    },
    {
      id: 'courses',
      label: 'Medical Courses',
      value: data.courses.toString(),
      change: `+${data.newCourses} this period`,
      icon: '📚',
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700',
      changeColor: 'text-orange-600',
    },
    {
      id: 'content',
      label: 'Learning Content',
      value: data.content.toLocaleString(),
      change: `+${data.newContent} new`,
      icon: '🎬',
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-700',
      changeColor: 'text-indigo-600',
    },
  ];

  const topSpecialties = filteredSubjectData
    .sort((a: any, b: any) => b.enrollments - a.enrollments)
    .slice(0, 5)
    .map((item: any) => ({
      name: item.subject,
      students: item.enrollments,
      growth: item.growth,
    }));

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              metric.color
            } ${selectedMetric === metric.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl">{metric.icon}</div>
              <div className={`text-sm font-medium ${metric.changeColor}`}>{metric.change}</div>
            </div>
            <div className={`text-2xl font-bold ${metric.textColor} mb-1`}>{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Specialties */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top MBBS Subjects</h3>
          <div className="space-y-4">
            {topSpecialties.map((specialty: any, index: number) => (
              <div
                key={specialty.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{specialty.name}</div>
                    <div className="text-sm text-gray-500">
                      {specialty.students.toLocaleString()} students
                    </div>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">{specialty.growth}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Revenue Growth</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-semibold text-green-600">+24.7%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Student Enrollment</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <span className="text-sm font-semibold text-blue-600">+18.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Course Completion</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <span className="text-sm font-semibold text-purple-600">+31.2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Content Production</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
                <span className="text-sm font-semibold text-orange-600">+12.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">⚠️</div>
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Action Required</h4>
            <div className="space-y-2 text-sm text-red-700">
              <p>• 3 institutions have overdue subscription renewals</p>
              <p>• Content review pending for 12 new medical videos</p>
              <p>• Server capacity at 85% - consider scaling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
