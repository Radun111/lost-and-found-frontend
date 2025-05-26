import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactElement } from 'react';


export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}