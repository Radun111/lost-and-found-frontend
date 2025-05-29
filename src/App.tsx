import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ItemsPage from './pages/ItemsPage';
import RequestsPage from './pages/RequestsPage';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute'; 
import RequestForm from './pages/RequestForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student', 'staff', 'admin']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/items" element={<ItemsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['staff', 'admin']} />}>
            <Route path="/requests" element={<RequestsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
  <Route path="/requests/new" element={<RequestForm />} />
</Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;