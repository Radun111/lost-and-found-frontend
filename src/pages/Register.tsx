import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Campus Registration
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Campus Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Account Type
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:opacity-70"
          >
            {isLoading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}