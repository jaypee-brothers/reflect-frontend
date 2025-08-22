import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const QbanksTestInsights = () => {
  const { qbankInsights, fetchQbankInsights } = useInstitutionalStore();

  const [selectedCategory] = useState('all');

  useEffect(() => {
    fetchQbankInsights({ type: 'qbank' });
  }, [fetchQbankInsights]);

  // QBank data
  const { data: qbankData, loading, error } = qbankInsights;
  const testData = qbankData?.qbanks || [];
  // QBank summary
  const qbankSummary = qbankData?.qbank_summary;

  // Filter data based on selected category
  const filteredData =
    selectedCategory === 'all'
      ? testData
      : testData.filter((test: any) => test.subject_name === selectedCategory);

  // Prepare data for horizontal bar chart - sorted by average accuracy
  const sortedData = [...filteredData].sort(
    (a: any, b: any) => b.average_accuracy_score - a.average_accuracy_score,
  );

  // Function to get color based on accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy < 50) return '#EF4444'; // Red
    if (accuracy >= 50 && accuracy <= 70) return '#F59E0B'; // Yellow/Orange
    return '#10B981'; // Green
  };

  // Chart data for horizontal bar chart showing only average accuracy with color coding
  const accuracyChartData = {
    series: [
      {
        name: 'Average Accuracy',
        data: sortedData.map((test: any) => ({
          x: test.subject_name,
          y: test.average_accuracy_score,
          fillColor: getAccuracyColor(test.average_accuracy_score),
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
          distributed: true,
        },
      },
      colors: sortedData.map((test: any) => getAccuracyColor(test.average_accuracy_score)),
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
        categories: sortedData.map((test: any) => test.subject_name),
        title: {
          text: 'Average Accuracy (%)',
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
        show: false,
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

  //   const difficultyChartData = {
  //     series: [
  //       qbankSummary?.difficulty_distribution?.easy || 0,
  //       qbankSummary?.difficulty_distribution?.medium || 0,
  //       qbankSummary?.difficulty_distribution?.hard || 0,
  //     ],
  //     options: {
  //       chart: {
  //         type: 'donut' as const,
  //         height: 250,
  //       },
  //       labels: ['Easy', 'Medium', 'Hard'],
  //       colors: ['#10B981', '#F59E0B', '#EF4444'],
  //       legend: {
  //         position: 'bottom' as const,
  //       },
  //       dataLabels: {
  //         enabled: true,
  //         formatter: function (val: number) {
  //           return Math.round(val) + '%';
  //         },
  //       },
  //     },
  //   };

  // Calculate summary statistics for QBank
  const totalAttempts = qbankSummary?.total_attempts || 0;
  const avgAccuracy = Math.round(qbankSummary?.average_score || 0);

  // Test Series summary (horizontal cards below QBank insights)

  if (loading) {
    return (
      <div className="rounded-xl shadow-md bg-white p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-[500px] bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Average Accuracy by Medical Subject
                  </h3>
                  <Popover content={INFO_POPOVER_CONTENTS['qbank-analytics']} />
                </div>
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
                options={accuracyChartData.options}
                series={accuracyChartData.series}
                type="bar"
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 h-full flex flex-col">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 h-full flex flex-col">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">QBank Summary</h4>
            <div className="space-y-4 flex-1">
              <div className="bg-green-50 rounded-md p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="solar:graph-up-bold" className="text-green-500" width={20} />
                  <span className="text-sm font-medium text-green-700">Average Accuracy</span>
                  <Popover content={INFO_POPOVER_CONTENTS['qbank-average-accuracy']} align="end" />
                </div>
                <div className="text-2xl font-bold text-green-800">{avgAccuracy}%</div>
                <div className="text-xs text-green-600 mt-1">Overall performance</div>
              </div>

              <div className="bg-purple-50 rounded-md p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    icon="solar:users-group-two-rounded-bold"
                    className="text-purple-500"
                    width={20}
                  />
                  <span className="text-sm font-medium text-purple-700">Total Attempts</span>
                  <Popover content={INFO_POPOVER_CONTENTS['qbank-total-attempts']} align="end" />
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {totalAttempts.toLocaleString()}
                </div>
                <div className="text-xs text-purple-600 mt-1">Student attempts</div>
              </div>
              {/* Difficulty Distribution */}
              {/* <div>
                <div className="flex items-center gap-2 justify-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 mb-0 text-center">
                    Difficulty Distribution
                  </h4>
                  <Popover
                    content={INFO_POPOVER_CONTENTS['qbank-difficulty-distribution']}
                    align="end"
                  />
                </div>
                <Chart
                  options={difficultyChartData.options}
                  series={difficultyChartData.series}
                  type="donut"
                  height={250}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Test Series Summary Cards (horizontal, below insights) */}
      {/* {testSeriesInsights?.error && (
        <div className="mt-8">
          <div className="text-red-500">{testSeriesInsights.error}</div>
        </div>
      )}
      {testSeriesSummary && !testSeriesInsights?.error && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Series Summary</h3>
          <div className="flex flex-row gap-6">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:graph-up-bold" className="text-yellow-500" width={20} />
                <span className="text-sm font-medium text-yellow-700">Average Score</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">
                {testSeriesSummary.avgScore}%
              </div>
              <div className="text-xs text-yellow-600 mt-1">Overall performance</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  icon="solar:users-group-two-rounded-bold"
                  className="text-blue-500"
                  width={20}
                />
                <span className="text-sm font-medium text-blue-700">Total Attempts</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">
                {testSeriesSummary.totalAttempts.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600 mt-1">Student attempts</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:clipboard-list-bold" className="text-purple-500" width={20} />
                <span className="text-sm font-medium text-purple-700">Difficulty Distribution</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-purple-700">
                  Easy: {testSeriesSummary.difficultyDistribution.easy}
                </span>
                <span className="text-xs text-purple-700">
                  Medium: {testSeriesSummary.difficultyDistribution.medium}
                </span>
                <span className="text-xs text-purple-700">
                  Hard: {testSeriesSummary.difficultyDistribution.hard}
                </span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default QbanksTestInsights;
