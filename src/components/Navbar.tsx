import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Lost & Found
        </Link>
        {user && (
          <button 
            onClick={logout}
            className="btn btn-outline-light"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}