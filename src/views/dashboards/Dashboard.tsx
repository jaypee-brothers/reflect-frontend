import InstitutionOverview from '../../components/analytics/InstitutionOverview';
import StudentEngagement from '../../components/analytics/StudentEngagement';
import RedZoneStudents from '../../components/analytics/RedZoneStudents';
import StudentsToWatch from '../../components/analytics/StudentsToWatch';
import ContentAnalytics from '../../components/analytics/ContentAnalytics';
import QbanksTestInsights from '../../components/analytics/QbanksTestInsights';
import { useUiStore } from '../../stores/uiStore';

const Dashboard = () => {
  // Get UI state from store
  const { } = useUiStore();
  return (
    <div className="space-y-6">
      {/* Display current filters */}
      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-blue-800">Current Filters:</span>
          <span className="text-sm text-blue-600">
            Time Range: <strong>{selectedTimeRange}</strong>
          </span>
          <span className="text-sm text-blue-600">
            College: <strong>{selectedCollege}</strong>
          </span>
          <span className="text-sm text-blue-600">
            Academic Years: <strong>
              {selectedYears.length === 0 
                ? 'All Years' 
                : selectedYears.length === 1 
                  ? selectedYears[0]
                  : `${selectedYears.length} selected`
              }
            </strong>
          </span>
        </div>
      </div> */}

      {/* Institution Overview */}
      <InstitutionOverview />

      {/* QBank Insights */}
      <QbanksTestInsights />
      {/* Student Engagement & Red Zone in parallel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <StudentEngagement />
        </div>
        <div className="xl:col-span-1">
          <RedZoneStudents />
        </div>
      </div>

      {/* Students to Watch */}
      <StudentsToWatch />

      {/* Content Analytics */}
      <ContentAnalytics />

      {/* Competency Overview */}
      {/* <CompetencyOverview /> */}

      {/* Reports & Exports */}
      {/* <ReportsExports /> */}
    </div>
  );
};

export default Dashboard;
