import { useState } from 'react';
import Chart from 'react-apexcharts';
import { MEDICAL_SUBJECTS, generateInstituteData } from '../../utils/constants';

interface CollegeSubjectPerformanceProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const CollegeSubjectPerformance = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: CollegeSubjectPerformanceProps) => {
  const [selectedCollege, setSelectedCollege] = useState('all');

  // Generate subject performance data for colleges
  const getSubjectPerformanceData = () => {
    let institutes = generateInstituteData(timeRange);

    if (selectedZone !== 'all') {
      institutes = institutes.filter((institute) => institute.zone === selectedZone);
    }

    let baseMultiplier = 1;
    if (selectedSubject !== 'all') {
      baseMultiplier *= 0.3; // Show only selected subject
    }

    const subjectsToShow =
      selectedSubject !== 'all' ? [selectedSubject] : MEDICAL_SUBJECTS.slice(0, 8); // Top 8 subjects

    return institutes.slice(0, 6).map((institute) => {
      const collegeData = {
        name: institute.name,
        zone: institute.zone,
        subjects: subjectsToShow.map((subject, subjectIndex) => {
          const popularity =
            (MEDICAL_SUBJECTS.length - MEDICAL_SUBJECTS.indexOf(subject)) / MEDICAL_SUBJECTS.length;
          const instituteFactor =
            (institutes.length - institutes.indexOf(institute)) / institutes.length;

          return {
            name: subject,
            enrollments: Math.floor(
              (150 + subjectIndex * 25) * popularity * instituteFactor * baseMultiplier,
            ),
            avgScore: Math.min(100, 65 + popularity * 25 + instituteFactor * 10),
            completionRate: Math.min(100, 70 + popularity * 20 + instituteFactor * 10),
            satisfaction: Math.min(100, 75 + popularity * 15 + instituteFactor * 10),
            revenue: Math.floor(
              (500000 + subjectIndex * 100000) * popularity * instituteFactor * baseMultiplier,
            ),
          };
        }),
      };
      return collegeData;
    });
  };

  const collegeSubjectData = getSubjectPerformanceData();

  // Get college options for filter
  const collegeOptions = [
    { value: 'all', label: 'All Colleges' },
    ...collegeSubjectData.map((college) => ({
      value: college.name,
      label: college.name.split(' ').slice(0, 3).join(' '),
    })),
  ];

  // Aggregate data for chart
  const getChartData = () => {
    const dataToShow =
      selectedCollege === 'all'
        ? collegeSubjectData
        : collegeSubjectData.filter((c) => c.name === selectedCollege);

    if (dataToShow.length === 0) return { series: [], options: {} };

    // Aggregate by subject across selected colleges
    const subjectAggregates = new Map();

    dataToShow.forEach((college) => {
      college.subjects.forEach((subject) => {
        if (subjectAggregates.has(subject.name)) {
          const existing = subjectAggregates.get(subject.name);
          existing.enrollments += subject.enrollments;
          existing.revenue += subject.revenue;
          existing.avgScore = (existing.avgScore + subject.avgScore) / 2;
          existing.completionRate = (existing.completionRate + subject.completionRate) / 2;
        } else {
          subjectAggregates.set(subject.name, { ...subject });
        }
      });
    });

    const aggregatedData = Array.from(subjectAggregates.values());

    return {
      series: [
        {
          name: 'Enrollments',
          type: 'column',
          data: aggregatedData.map((d) => d.enrollments),
        },
        {
          name: 'Avg Score (%)',
          type: 'line',
          data: aggregatedData.map((d) => d.avgScore),
        },
        {
          name: 'Completion Rate (%)',
          type: 'line',
          data: aggregatedData.map((d) => d.completionRate),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line' as const,
          toolbar: { show: true },
        },
        stroke: {
          width: [0, 3, 3],
          curve: 'smooth' as const,
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        colors: ['#10b981', '#3b82f6', '#8b5cf6'],
        xaxis: {
          categories: aggregatedData.map((d) => d.name.split(' ')[0]),
          title: { text: 'Medical Subjects' },
        },
        yaxis: [
          {
            title: { text: 'Number of Enrollments' },
            seriesName: 'Enrollments',
          },
          {
            opposite: true,
            title: { text: 'Percentage (%)' },
            seriesName: 'Avg Score (%)',
          },
        ],
        legend: {
          position: 'top' as const,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1, 2],
        },
      },
    };
  };

  const chartData = getChartData();

  // Get top performing subjects
  const getTopSubjects = () => {
    const allSubjects = collegeSubjectData.flatMap((college) =>
      college.subjects.map((subject) => ({
        ...subject,
        collegeName: college.name,
        zone: college.zone,
      })),
    );

    return allSubjects
      .sort((a, b) => b.avgScore + b.completionRate - (a.avgScore + a.completionRate))
      .slice(0, 8);
  };

  const topSubjects = getTopSubjects();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">College Subject Performance</h2>
          <p className="text-sm text-gray-600">
            Subject-wise performance analysis across medical colleges
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {collegeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>

      {/* Top Performing Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Subjects</h3>
          <div className="space-y-3">
            {topSubjects.slice(0, 6).map((subject, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{subject.name}</h4>
                    <p className="text-sm text-gray-600">
                      {subject.collegeName.split(' ').slice(0, 3).join(' ')}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                        Score: {subject.avgScore.toFixed(1)}%
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Completion: {subject.completionRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{subject.enrollments}</div>
                    <div className="text-xs text-gray-500">students</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance Matrix</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Subject
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Enrollments
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Avg Score
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Completion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(selectedCollege === 'all'
                  ? MEDICAL_SUBJECTS.slice(0, 8).map((subject) => {
                      const subjectData = collegeSubjectData
                        .flatMap((c) => c.subjects)
                        .filter((s) => s.name === subject);
                      const avgEnrollments =
                        subjectData.reduce((sum, s) => sum + s.enrollments, 0) /
                          subjectData.length || 0;
                      const avgScore =
                        subjectData.reduce((sum, s) => sum + s.avgScore, 0) / subjectData.length ||
                        0;
                      const avgCompletion =
                        subjectData.reduce((sum, s) => sum + s.completionRate, 0) /
                          subjectData.length || 0;
                      return {
                        name: subject,
                        enrollments: avgEnrollments,
                        avgScore,
                        completionRate: avgCompletion,
                      };
                    })
                  : collegeSubjectData.find((c) => c.name === selectedCollege)?.subjects || []
                ).map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">
                      {subject.name.split(' ')[0]}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900">
                      {Math.floor(subject.enrollments).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{subject.avgScore.toFixed(1)}%</span>
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{ width: `${subject.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{subject.completionRate.toFixed(1)}%</span>
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${subject.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSubjectPerformance;
