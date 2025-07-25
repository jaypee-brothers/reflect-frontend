import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, accessToken, refreshToken, logout, isTokenExpired } = useAuthStore();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If not authenticated or no tokens, redirect to login
      if (!isAuthenticated || !accessToken || !refreshToken) {
        setIsChecking(false);
        return;
      }

      // Check if access token is expired
      if (isTokenExpired(accessToken)) {
        console.log('Access token expired, attempting refresh...');

        // Try to get a valid token (will refresh if needed)
        const validToken = await useAuthStore.getState().getValidToken();

        if (!validToken) {
          console.log('Token refresh failed, logging out...');
          logout();
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, accessToken, refreshToken, logout, isTokenExpired]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated || !accessToken || !refreshToken) {
    // Redirect to login page with return URL
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
