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
import CollegePerformanceOverview from '../../components/stakeholder/CollegePerformanceOverview';
import CollegeEngagementAnalytics from '../../components/stakeholder/CollegeEngagementAnalytics';
import CollegeSubjectPerformance from '../../components/stakeholder/CollegeSubjectPerformance';
import { TIME_RANGES, MEDICAL_SUBJECTS, GEOGRAPHIC_ZONES } from '../../utils/constants';

const StakeholderDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1month');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Stakeholder Revenue & <br></br>Performance Dashboard
            </h1>
            <p className="text-emerald-100 mt-1">DigiNerve Business Intelligence & Analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex grow flex-col">
              <div className="flex gap-2 self-end mb-2">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-[130px] px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                >
                  {TIME_RANGES.map((range) => (
                    <option key={range.value} value={range.value} className="text-gray-900">
                      {range.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-[130px] px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                >
                  <option value="all" className="text-gray-900">
                    All Subjects
                  </option>
                  {MEDICAL_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject} className="text-gray-900">
                      {subject}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-[130px] px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                >
                  <option value="all" className="text-gray-900">
                    All Zones
                  </option>
                  {GEOGRAPHIC_ZONES.map((zone) => (
                    <option key={zone} value={zone} className="text-gray-900">
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 rounded-md mt-4 bg-white/20 ">
                {[
                  { id: 'overview', label: 'Overview', icon: 'solar:chart-2-bold-duotone' },
                  {
                    id: 'revenue',
                    label: 'Revenue',
                    icon: 'solar:dollar-minimalistic-bold-duotone',
                  },
                  { id: 'courses', label: 'Courses', icon: 'solar:book-bold-duotone' },
                  { id: 'colleges', label: 'Colleges', icon: 'solar:buildings-3-bold-duotone' },
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
            {/* <button className="px-4 py-2 bg-white text-emerald-600 rounded-md hover:bg-gray-100 transition-colors font-medium flex items-center gap-2">
              <Icon icon="solar:download-bold-duotone" width={16} />
              Export Report
            </button> */}
          </div>
        </div>
      </div>

      {/* Revenue Summary Cards - Always visible */}
      <RevenueSummaryCards
        timeRange={selectedTimeRange}
        selectedSubject={selectedSubject}
        selectedZone={selectedZone}
      />

      {/* Dynamic Content Based on Selected View */}
      {selectedView === 'overview' && (
        <>
          {/* Revenue Analytics */}
          <RevenueAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />

          {/* Key Performance Grid */}
          {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> */}
          <YearOnYearComparison
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CourseSalesDistribution
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          {/* </div> */}

          {/* Institute Engagement */}
          <InstituteLevelEngagement
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {selectedView === 'revenue' && (
        <>
          <RevenueAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <YearOnYearComparison
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CourseRevenueTable
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {selectedView === 'courses' && (
        <>
          <CourseSalesDistribution
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CourseRevenueTable
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          {/* <InstituteLevelEngagement
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          /> */}
        </>
      )}

      {selectedView === 'colleges' && (
        <>
          <CollegePerformanceOverview
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CollegeEngagementAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <CollegeSubjectPerformance
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          <InstituteLevelEngagement
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {selectedView === 'geography' && (
        <>
          <GeographyRevenue
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          {/* <RevenueAnalytics
              timeRange={selectedTimeRange}
              selectedSubject={selectedSubject}
              selectedZone={selectedZone}
              showGeographyFilter={true}
            />
            <CourseSalesDistribution
              timeRange={selectedTimeRange}
              selectedSubject={selectedSubject}
              selectedZone={selectedZone}
              showGeographyFilter={true}
            /> */}
        </>
      )}

      {selectedView === 'sales' && (
        <>
          <SalesTeamPerformance
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
          {/* <RevenueAnalytics
        timeRange={selectedTimeRange}
        selectedSubject={selectedSubject}
        selectedZone={selectedZone}
        showSalesFilter={true}
        />
        <InstituteLevelEngagement
        timeRange={selectedTimeRange}
        selectedSubject={selectedSubject}
        selectedZone={selectedZone}
        /> */}
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
