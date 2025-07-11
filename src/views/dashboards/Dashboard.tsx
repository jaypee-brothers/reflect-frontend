import { Link } from 'react-router';
import { useState } from 'react';
import InstitutionOverview from '../../components/analytics/InstitutionOverview';
import StudentEngagement from '../../components/analytics/StudentEngagement';
import RedZoneStudents from '../../components/analytics/RedZoneStudents';
import StudentsToWatch from '../../components/analytics/StudentsToWatch';
import ContentAnalytics from '../../components/analytics/ContentAnalytics';
import QbanksTestInsights from '../../components/analytics/QbanksTestInsights';
import CompetencyOverview from '../../components/analytics/CompetencyOverview';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedCollege, setSelectedCollege] = useState('7days');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Medical Institution Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1">DigiNerve - Medical Education Analytics Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">Last 7 Days</option>
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
            </select>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="jaypee">Jaypee Medical College</option>
              <option value="manipal">Manipal Medical College</option>
              <option value="dy-patil">DY Patil Medical College</option>
            </select>
          </div>
        </div>
      </div>

      {/* Institution Overview */}
      <InstitutionOverview timeRange={selectedTimeRange} />

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

      {/* QBank Insights */}
      <QbanksTestInsights />

      {/* Competency Overview */}
      <CompetencyOverview />

      {/* Reports & Exports */}
      {/* <ReportsExports /> */}

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-base text-gray-600">
          Powered by DigiNerve Medical Education Analytics Platform • Built with{' '}
          <Link
            to="https://adminmart.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            AdminMart
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
