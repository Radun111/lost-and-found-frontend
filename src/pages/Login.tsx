import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const emailError = validateEmail(username);
  const passwordError = validatePassword(password);
  
  if (emailError || passwordError) {
    setError(emailError || passwordError);
    return;
  }
  };

  return (
    <div className="bg-primary bg-gradient" style={{ minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg">
              {/* University Header */}
              <div className="card-header bg-dark text-white text-center py-4">
                <h1 className="display-5 fw-bold mb-1">Greenwood University</h1>
                <p className="mb-0 text-light">Lost & Found Management System</p>
              </div>

              {/* Login Form */}
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-bold">
                      Campus ID / Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="john.doe@greenwood.edu"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 mb-3"
                  >
                    Sign In
                  </button>

                  <div className="text-center">
                    <Link to="/register" className="text-decoration-none">
                      Create an account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}