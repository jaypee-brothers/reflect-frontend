import { useState } from 'react';
import { Icon } from '@iconify/react';
import RevenueSummaryCards from '../../components/stakeholder/RevenueSummaryCards';
import RevenueAnalytics from '../../components/stakeholder/RevenueAnalytics';
import YearOnYearComparison from '../../components/stakeholder/YearOnYearComparison';
import CourseSalesDistribution from '../../components/stakeholder/CourseSalesDistribution';
import GeographyRevenue from '../../components/stakeholder/GeographyRevenue';
import CourseRevenueTable from '../../components/stakeholder/CourseRevenueTable';
import SalesTeamPerformance from '../../components/stakeholder/SalesTeamPerformance';
import InstituteLevelEngagement from '../../components/stakeholder/InstituteLevelEngagement';

const StakeholderDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1month');
  const [selectedView, setSelectedView] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-300 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Stakeholder Revenue & <br></br>Performance Dashboard
            </h1>
            <p className="text-emerald-100 mt-1">DigiNerve Business Intelligence & Analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex grow flex-col">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="self-end w-[150px] px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              >
                <option value="7days" className="text-gray-900">
                  Last 7 Days
                </option>
                <option value="1month" className="text-gray-900">
                  Last Month
                </option>
                <option value="3months" className="text-gray-900">
                  Last 3 Months
                </option>
                <option value="6months" className="text-gray-900">
                  Last 6 Months
                </option>
                <option value="1year" className="text-gray-900">
                  Last Year
                </option>
              </select>
              <div className="flex gap-2 rounded-md mt-4 bg-white/20 ">
                {[
                  { id: 'overview', label: 'Overview', icon: 'solar:chart-2-bold-duotone' },
                  {
                    id: 'revenue',
                    label: 'Revenue',
                    icon: 'solar:dollar-minimalistic-bold-duotone',
                  },
                  { id: 'courses', label: 'Courses', icon: 'solar:book-bold-duotone' },
                  { id: 'geography', label: 'Geography', icon: 'solar:map-point-bold-duotone' },
                  {
                    id: 'sales',
                    label: 'Sales Team',
                    icon: 'solar:users-group-two-rounded-bold-duotone',
                  },
                ].map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setSelectedView(view.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedView === view.id
                        ? 'bg-white text-emerald-600 shadow-sm'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon icon={view.icon} width={16} />
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
            {/* <button className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2">
              <Icon icon="solar:download-bold-duotone" width={16} />
              Export Report
            </button> */}
          </div>
        </div>
      </div>

      {/* Revenue Summary Cards - Always visible */}
      <RevenueSummaryCards timeRange={selectedTimeRange} />

      {/* Dynamic Content Based on Selected View */}
      {selectedView === 'overview' && (
        <>
          {/* Revenue Analytics */}
          <RevenueAnalytics timeRange={selectedTimeRange} />

          {/* Key Performance Grid */}
          {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> */}
          <YearOnYearComparison timeRange={selectedTimeRange} />
          <CourseSalesDistribution timeRange={selectedTimeRange} />
          {/* </div> */}

          {/* Institute Engagement */}
          <InstituteLevelEngagement timeRange={selectedTimeRange} />
        </>
      )}

      {selectedView === 'revenue' && (
        <>
          <RevenueAnalytics timeRange={selectedTimeRange} />
          <YearOnYearComparison timeRange={selectedTimeRange} />
          <CourseRevenueTable timeRange={selectedTimeRange} />
        </>
      )}

      {selectedView === 'courses' && (
        <>
          <CourseSalesDistribution timeRange={selectedTimeRange} />
          <CourseRevenueTable timeRange={selectedTimeRange} />
          <InstituteLevelEngagement timeRange={selectedTimeRange} />
        </>
      )}

      {selectedView === 'geography' && (
        <>
          <GeographyRevenue timeRange={selectedTimeRange} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RevenueAnalytics timeRange={selectedTimeRange} showGeographyFilter={true} />
            <CourseSalesDistribution timeRange={selectedTimeRange} showGeographyFilter={true} />
          </div>
        </>
      )}

      {selectedView === 'sales' && (
        <>
          <SalesTeamPerformance timeRange={selectedTimeRange} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RevenueAnalytics timeRange={selectedTimeRange} showSalesFilter={true} />
            <InstituteLevelEngagement timeRange={selectedTimeRange} />
          </div>
        </>
      )}

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-base text-gray-600">
          DigiNerve Stakeholder Dashboard • Business Intelligence Platform •{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default StakeholderDashboard;
