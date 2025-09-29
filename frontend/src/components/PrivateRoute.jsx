import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // <-- correct key

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // User doesn't have the required role
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
}
