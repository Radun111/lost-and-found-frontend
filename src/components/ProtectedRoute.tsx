import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  allowedRoles: ('student' | 'staff' | 'admin')[];
}

/**
 * Handles route protection with:
 * - Authentication checks
 * - Role-based access control
 * - Loading states
 * - Error boundaries (handled at App level)
 */
export default function ProtectedRoute({ 
  allowedRoles 
}: ProtectedRouteProps): ReactElement {
  const { user, isLoading } = useAuth();

  // Show spinner while auth state is loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user has required role
  const hasRequiredRole = allowedRoles.includes(user.role);
  
  // Redirect to unauthorized if role doesn't match
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render child routes if all checks pass
  return <Outlet />;
}