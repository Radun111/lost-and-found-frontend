import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ItemsPage = lazy(() => import('./pages/ItemsPage'));
const RequestForm = lazy(() => import('./pages/RequestForm'));
const RequestsPage = lazy(() => import('./pages/RequestsPage'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow-1" style={{ minHeight: `calc(100vh - 56px - 72px)` }}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Student Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student', 'staff', 'admin']} />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/items" element={<ItemsPage />} />
                  <Route path="/requests/new" element={<RequestForm />} />
                </Route>

                {/* Protected Staff/Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['staff', 'admin']} />}>
                  <Route path="/requests" element={<RequestsPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

// ProtectedRoute component remains the same as before
function ProtectedRoute({ allowedRoles }: { allowedRoles: ('student' | 'staff' | 'admin')[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default App;