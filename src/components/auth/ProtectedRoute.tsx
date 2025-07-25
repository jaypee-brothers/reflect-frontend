// import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, accessToken } = useAuthStore();
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated || !accessToken) {
    // Redirect to login page with return URL
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
