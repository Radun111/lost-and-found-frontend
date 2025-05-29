import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  allowedRoles?: ('student' | 'staff' | 'admin')[];
  redirectPath?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = '/unauthorized'
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    } else if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, isLoading, allowedRoles, navigate, location, redirectPath]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : null;
}