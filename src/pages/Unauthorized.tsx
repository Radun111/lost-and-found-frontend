import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You don't have permission to access this page.
        </p>
        <Link 
          to="/dashboard" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}