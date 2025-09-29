import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // Role-based nav items
  const navItems = user
    ? user.role === "organizer"
      ? [
          { label: "Dashboard", href: "/dashboard-organizer" },
          { label: "Create Event", href: "/create-event" },
          { label: "Profile", href: "/profile" },
          { label: "Logout", href: "/logout" },
        ]
      : [
          { label: "Dashboard", href: "/dashboard-user" },
          { label: "Events", href: "/events" },
          { label: "Profile", href: "/profile" },
          { label: "Logout", href: "/logout" },
        ]
    : [];

  return (
    <div className="fixed top-6 right-6 left-6 bg-gray-900 bg-opacity-90 backdrop-blur-xl shadow-lg rounded-3xl flex justify-between items-center py-4 px-6 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-400">Event Platform</h1>
        {user && (
          <span className="text-white font-semibold text-lg">
            {user.name} ({user.role})
          </span>
        )}
      </div>

      <div className="flex gap-6 items-center">
        {navItems.map((item) =>
          item.label === "Logout" ? (
            <button
              key={item.label}
              onClick={handleLogout}
              className="text-white font-semibold hover:text-blue-400 transition-colors duration-300"
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              className="text-white font-semibold hover:text-blue-400 transition-colors duration-300"
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
