import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password || !role) {
        setError("Please enter email, password, and select your role");
        setIsLoading(false);
        return;
      }

      if (role === "student") {
        navigate("/dashboard");
      } else if (role === "staff" || role === "admin") {
        navigate("/admin/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-gray-500">Sign in to access the Lost and Found system</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">University Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@greenwood.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password" className="text-sm text-emerald-700 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-700 hover:underline">
            Register with your university ID
          </Link>
        </p>
      </div>

      <div className="text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Greenwood University. All rights reserved.</p>
        <p>For technical support, contact helpdesk@greenwood.edu</p>
      </div>
    </div>
  );
}
