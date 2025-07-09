import { Link } from 'react-router';
import { useState } from 'react';
import BusinessOverview from '../../components/internal/BusinessOverview';
import CoursePerformance from '../../components/internal/CoursePerformance';
import InstitutionManagement from '../../components/internal/InstitutionManagement';
import ContentAnalytics from '../../components/internal/ContentAnalytics';
import RevenueMetrics from '../../components/internal/RevenueMetrics';
import ContentProduction from '../../components/internal/ContentProduction';
import UserEngagement from '../../components/internal/UserEngagement';
import SystemHealth from '../../components/internal/SystemHealth';
import { TIME_RANGES, MEDICAL_SUBJECTS, GEOGRAPHIC_ZONES } from '../../utils/constants';

const InternalDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1month');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">DigiNerve Leadership Dashboard</h1>
            <p className="text-indigo-100 mt-1">Internal Operations & Business Intelligence</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
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
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
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
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
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

            <div className="flex bg-white/20 backdrop-blur-sm rounded-md p-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'courses', label: 'Courses' },
                { id: 'institutions', label: 'Institutions' },
                { id: 'content', label: 'Content' },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedView === view.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            <button className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-colors font-medium">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content Based on Selected View */}
      {selectedView === 'overview' && (
        <>
          {/* Business Overview */}
          <BusinessOverview
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RevenueMetrics
              timeRange={selectedTimeRange}
              selectedSubject={selectedSubject}
              selectedZone={selectedZone}
            />
            <UserEngagement
              timeRange={selectedTimeRange}
              selectedSubject={selectedSubject}
              selectedZone={selectedZone}
            />
          </div>

          {/* System Health */}
          <SystemHealth />
        </>
      )}

      {selectedView === 'courses' && (
        <>
          {/* Course Performance */}
          <CoursePerformance
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />

          {/* Content Production */}
          <ContentProduction
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {selectedView === 'institutions' && (
        <>
          {/* Institution Management */}
          <InstitutionManagement
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />

          {/* Revenue Metrics focused on institutions */}
          <RevenueMetrics
            timeRange={selectedTimeRange}
            viewType="institutions"
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {selectedView === 'content' && (
        <>
          {/* Content Analytics */}
          <ContentAnalytics
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />

          {/* Content Production */}
          <ContentProduction
            timeRange={selectedTimeRange}
            selectedSubject={selectedSubject}
            selectedZone={selectedZone}
          />
        </>
      )}

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Link
            to="/courses/new"
            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500 text-white rounded-md flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">New Course</span>
          </Link>

          <Link
            to="/institutions/new"
            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
          >
            <div className="w-12 h-12 bg-green-500 text-white rounded-md flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Add Institution</span>
          </Link>

          <Link
            to="/content/upload"
            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
          >
            <div className="w-12 h-12 bg-purple-500 text-white rounded-md flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Upload Content</span>
          </Link>

          <Link
            to="/analytics/reports"
            className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
          >
            <div className="w-12 h-12 bg-orange-500 text-white rounded-md flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Generate Report</span>
          </Link>

          <Link
            to="/users/manage"
            className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            <div className="w-12 h-12 bg-red-500 text-white rounded-md flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
          </Link>

          <Link
            to="/settings"
            className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          >
            <div className="w-12 h-12 bg-gray-500 text-white rounded-md flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Settings</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-base text-gray-600">
          DigiNerve Internal Leadership Dashboard • Confidential • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default InternalDashboard;
