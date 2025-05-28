import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Greenwood University
        </Link>
        
        <div className="d-flex align-items-center">
          {user && (
            <>
              <span className="text-light me-3">
                Welcome, {user.username}
              </span>
              <button 
                onClick={logout} 
                className="btn btn-outline-light"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}