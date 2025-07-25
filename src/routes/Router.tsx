import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import ProtectedRoute from '../components/auth/ProtectedRoute';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

// Dashboard
const Dashboard = lazy(() => import('../views/dashboards/Dashboard'));
// const InternalDashboard = lazy(() => import('../views/dashboards/InternalDashboard'));
// const StakeholderDashboard = lazy(() => import('../views/dashboards/StakeholderDashboard'));

// Profile
// const StudentProfile = lazy(() => import('../views/profile/StudentProfile'));
// const SalesAgentProfile = lazy(() => import('../views/profile/SalesAgentProfile'));

// utilities
// const Typography = lazy(() => import('../views/typography/Typography'));
// const Table = lazy(() => import('../views/tables/Table'));
// const Form = lazy(() => import('../views/forms/Form'));
// const Shadow = lazy(() => import('../views/shadows/Shadow'));
// const Alert = lazy(() => import('../views/alerts/Alerts'));

// Table Management
const QBankAnalytics = lazy(() => import('../views/tables/QBankAnalytics'));
const TestSeriesManagement = lazy(() => import('../views/tables/TestSeriesManagement'));
const UserManagement = lazy(() => import('../views/tables/UserManagement'));
const VideoContentManagement = lazy(() => import('../views/tables/VideoContentManagement'));

// icons
// const Solar = lazy(() => import('../views/icons/Solar'));

// authentication
const Login = lazy(() => import('../views/auth/Login'));
// const Register = lazy(() => import('../views/auth/register/Register'));
// const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const Error = lazy(() => import('../views/auth/error/Error'));

const Router = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', exact: true, element: <Dashboard /> },
      //   { path: '/', exact: true, element: <InternalDashboard /> },
      //   { path: '/stakeholder', exact: true, element: <StakeholderDashboard /> },
      //   { path: '/profile/student', exact: true, element: <StudentProfile /> },
      //   { path: '/profile/sales-agent', exact: true, element: <SalesAgentProfile /> },
      //   { path: '/ui/typography', exact: true, element: <Typography /> },
      //   { path: '/ui/table', exact: true, element: <Table /> },
      //   { path: '/ui/form', exact: true, element: <Form /> },
      //   { path: '/ui/alert', exact: true, element: <Alert /> },
      //   { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/tables/qbank-analytics', exact: true, element: <QBankAnalytics /> },
      { path: '/tables/test-series', exact: true, element: <TestSeriesManagement /> },
      { path: '/tables/users', exact: true, element: <UserManagement /> },
      { path: '/tables/videos', exact: true, element: <VideoContentManagement /> },
      //   { path: '/icons/solar', exact: true, element: <Solar /> },
      //   { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      //   { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
