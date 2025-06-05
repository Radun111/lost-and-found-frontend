import type React from "react"
import { Link } from "react-router-dom"

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">🔍</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/login"
            className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
