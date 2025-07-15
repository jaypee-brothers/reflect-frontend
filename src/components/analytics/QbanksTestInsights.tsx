import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { useState } from 'react';
import { MEDICAL_TEST_DATA, TEST_SERIES_DATA } from '../../utils/constants';

const QbanksTestInsights = () => {
  const [selectedCategory] = useState('all');
  const [dataType, setDataType] = useState<'qbank' | 'testseries'>('qbank');

  // Filter data based on selected category and data type
  const currentDataset = dataType === 'qbank' ? MEDICAL_TEST_DATA : TEST_SERIES_DATA;
  const filteredData =
    selectedCategory === 'all'
      ? currentDataset
      : currentDataset.filter((test) => test.category === selectedCategory);

  // Prepare data for horizontal bar chart - sorted by average score
  const sortedData = [...filteredData].sort((a, b) => b.avgScore - a.avgScore);

  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score < 50) return '#EF4444'; // Red
    if (score >= 50 && score <= 70) return '#F59E0B'; // Yellow/Orange
    return '#10B981'; // Green
  };

  // Chart data for horizontal bar chart showing only average scores with color coding
  const scoreChartData = {
    series: [
      {
        name: 'Average Score',
        data: sortedData.map((test) => ({
          x: test.subject,
          y: test.avgScore,
          fillColor: getScoreColor(test.avgScore),
        })),
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 600,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          dataLabels: {
            position: 'center',
          },
          distributed: true, // This allows individual colors for each bar
        },
      },
      colors: sortedData.map((test) => getScoreColor(test.avgScore)),
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + '%';
        },
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#fff'],
        },
      },
      xaxis: {
        categories: sortedData.map((test) => test.subject),
        title: {
          text: 'Average Score (%)',
          style: {
            fontSize: '14px',
            fontWeight: '600',
          },
        },
        min: 0,
        max: 100,
      },
      yaxis: {
        title: {
          text: 'Medical Subjects',
          style: {
            fontSize: '14px',
            fontWeight: '600',
          },
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: false, // Hide legend since we're using distributed colors
      },
      tooltip: {
        y: {
          formatter: function (val: number, opts: any) {
            const test = sortedData[opts.dataPointIndex];
            return `${val}% (${test.attempts} attempts)`;
          },
        },
      },
    },
  };

  // Donut chart for test difficulty distribution
  const difficultyChartData = {
    series: [
      filteredData.filter((test) => test.difficulty === 'Easy').length,
      filteredData.filter((test) => test.difficulty === 'Medium').length,
      filteredData.filter((test) => test.difficulty === 'Hard').length,
    ],
    options: {
      chart: {
        type: 'donut' as const,
        height: 250,
      },
      labels: ['Easy', 'Medium', 'Hard'],
      colors: ['#10B981', '#F59E0B', '#EF4444'],
      legend: {
        position: 'bottom' as const,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return Math.round(val) + '%';
        },
      },
    },
  };

  // Calculate summary statistics
  const totalAttempts = filteredData.reduce((sum, test) => sum + test.attempts, 0);
  const avgScore = Math.round(
    filteredData.reduce((sum, test) => sum + test.avgScore, 0) / filteredData.length,
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Medical Test Analytics</h2>
        <div className="flex items-center gap-4">
          {/* QBank vs Test Series Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setDataType('qbank')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                dataType === 'qbank'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon icon="solar:book-bookmark-bold" className="inline mr-2" width={16} />
              QBank
            </button>
            <button
              onClick={() => setDataType('testseries')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                dataType === 'testseries'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon icon="solar:clipboard-list-bold" className="inline mr-2" width={16} />
              Test Series
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Average Scores by Medical Subject (
                  {dataType === 'qbank' ? 'QBank' : 'Test Series'})
                </h3>
                {/* Color Legend */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Below 50%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">50-70%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Above 70%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Chart
                options={scoreChartData.options}
                series={scoreChartData.series}
                type="bar"
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Summary Statistics */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Summary</h4>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="solar:graph-up-bold" className="text-green-500" width={20} />
                  <span className="text-sm font-medium text-green-700">Average Score</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{avgScore}%</div>
                <div className="text-xs text-green-600 mt-1">Overall performance</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    icon="solar:users-group-two-rounded-bold"
                    className="text-purple-500"
                    width={20}
                  />
                  <span className="text-sm font-medium text-purple-700">Total Attempts</span>
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {totalAttempts.toLocaleString()}
                </div>
                <div className="text-xs text-purple-600 mt-1">Student attempts</div>
              </div>
              {/* Difficulty Distribution */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Difficulty Distribution
                </h4>
                <Chart
                  options={difficultyChartData.options}
                  series={difficultyChartData.series}
                  type="donut"
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QbanksTestInsights;
