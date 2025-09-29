import { Routes, Route, useParams } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardUser from "./pages/DashboardUser";
import DashboardOrganizer from "./pages/DashboardOrganizer";
import CreateEvent from "./pages/CreateEvent";
import EventList from "./pages/EventList";
import Profile from "./pages/Profile";

// Components
import PrivateRoute from "./components/PrivateRoute";
import EventRSVP from "./components/organizer/EventRSVP";

// Wrapper to extract eventId from URL and pass to EventRSVP
function EventRSVPPage() {
  const { id } = useParams();
  return <EventRSVP eventId={id} />;
}

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Dashboard (Protected) */}
      <Route
        path="/dashboard-user"
        element={
          <PrivateRoute role="user">
            <DashboardUser />
          </PrivateRoute>
        }
      />

      {/* Organizer Dashboard (Protected) */}
      <Route
        path="/dashboard-organizer"
        element={
          <PrivateRoute role="organizer">
            <DashboardOrganizer />
          </PrivateRoute>
        }
      />

      {/* Organizer Pages */}
      <Route
        path="/create-event"
        element={
          <PrivateRoute role="organizer">
            <CreateEvent />
          </PrivateRoute>
        }
      />

      {/* Organizer Event RSVP Page */}
      <Route
        path="/events/:id/rsvp"
        element={
          <PrivateRoute role="organizer">
            <EventRSVPPage />
          </PrivateRoute>
        }
      />

      {/* User Pages */}
      <Route
        path="/events"
        element={
          <PrivateRoute role="user">
            <EventList />
          </PrivateRoute>
        }
      />

      {/* Profile page (accessible by any logged-in user) */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
