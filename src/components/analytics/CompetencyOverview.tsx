import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';

interface CompetencyData {
  subject: string;
  score: number;
  totalStudents: number;
  averageImprovement: number;
}

const CompetencyOverview = () => {
  // Sample competency data
  const competencyData: CompetencyData[] = [
    {
      subject: 'Anatomy',
      score: 85,
      totalStudents: 248,
      averageImprovement: 12,
    },
    {
      subject: 'Physiology',
      score: 78,
      totalStudents: 232,
      averageImprovement: 8,
    },
    {
      subject: 'Pathology',
      score: 82,
      totalStudents: 245,
      averageImprovement: 15,
    },
    {
      subject: 'Pharmacology',
      score: 88,
      totalStudents: 251,
      averageImprovement: 10,
    },
    {
      subject: 'Biochemistry',
      score: 75,
      totalStudents: 248,
      averageImprovement: 6,
    },
    {
      subject: 'Microbiology',
      score: 91,
      totalStudents: 189,
      averageImprovement: 18,
    },
  ];

  // Find weakest subject
  const weakestSubject = competencyData.reduce((prev, current) =>
    prev.score < current.score ? prev : current,
  );

  // Radar chart configuration
  const radarChartData = {
    series: [
      {
        name: 'Average Competency',
        data: competencyData.map((item) => item.score),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'radar' as const,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: competencyData.map((item) => item.subject),
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#e9e9e9',
            fill: {
              colors: ['#f8f9fa', '#f1f3f4'],
            },
          },
        },
      },
      colors: ['#3B82F6'],
      markers: {
        size: 6,
        colors: ['#3B82F6'],
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      fill: {
        opacity: 0.2,
      },
      stroke: {
        width: 2,
      },
    },
  };

  // Bar chart for improvement trends
  const improvementChartData = {
    series: [
      {
        name: 'Improvement (%)',
        data: competencyData.map((item) => item.averageImprovement),
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 200,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: competencyData.map((item) => item.subject.slice(0, 8)),
      },
      colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'],
      grid: {
        strokeDashArray: 4,
      },
    },
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    if (score >= 65) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement >= 15) return 'text-green-600';
    if (improvement >= 10) return 'text-blue-600';
    if (improvement >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Competency Overview</h2>
          <p className="text-sm text-gray-600 mt-1">Subject-wise performance analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="solar:chart-square-bold" className="text-purple-500" width={20} />
          <span className="text-sm text-purple-600 font-medium">Course/Subject Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Radar Chart */}
        <div className="xl:col-span-2">
          <div className="bg-gray-50 rounded-md p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Subject Competency Radar
            </h3>
            <Chart
              options={radarChartData.options}
              series={radarChartData.series}
              type="radar"
              height={350}
            />
          </div>
        </div>

        {/* Subject Details */}
        <div className="xl:col-span-2">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {competencyData.map((subject, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 text-sm">{subject.subject}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(
                      subject.score,
                    )}`}
                  >
                    {subject.score}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <Icon
                      icon="solar:users-group-two-rounded-linear"
                      className="inline mr-1"
                      width={12}
                    />
                    {subject.totalStudents} students
                  </div>
                  <div className={`${getImprovementColor(subject.averageImprovement)}`}>
                    <Icon icon="solar:arrow-up-linear" className="inline mr-1" width={12} />+
                    {subject.averageImprovement}% improvement
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weakest Subject Highlight */}
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="solar:danger-circle-bold" className="text-red-500" width={20} />
              <span className="text-sm font-semibold text-red-800">Needs Attention</span>
            </div>
            <div className="text-sm text-red-700">
              <strong>{weakestSubject.subject}</strong> has the lowest competency score of{' '}
              {weakestSubject.score}%
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Trends */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Trends</h3>
        <div className="bg-gray-50 rounded-md p-4">
          <Chart
            options={improvementChartData.options}
            series={improvementChartData.series}
            type="bar"
            height={200}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                competencyData.reduce((sum, item) => sum + item.score, 0) / competencyData.length,
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Overall Average</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...competencyData.map((item) => item.score))}%
            </div>
            <div className="text-sm text-gray-600">Highest Score</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {Math.min(...competencyData.map((item) => item.score))}%
            </div>
            <div className="text-sm text-gray-600">Lowest Score</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(
                competencyData.reduce((sum, item) => sum + item.averageImprovement, 0) /
                  competencyData.length,
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Avg Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetencyOverview;
