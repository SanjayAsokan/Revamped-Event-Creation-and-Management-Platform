import { useEffect, useState } from "react";
import { useEvent } from "../context/EventContext";
import DashboardNavbar from "../components/user/DashboardNavbar";

export default function DashboardUser() {
  const { state, fetchEvents, fetchUserRsvps } = useEvent();
  const { events, rsvps, loading } = state;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser || null);

    fetchEvents();
    fetchUserRsvps();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  const now = new Date();
  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => new Date(e.startAt) > now);
  const pastEvents = events.filter((e) => new Date(e.startAt) <= now);
  const totalRSVPs = rsvps.length;

  // Handle RSVP choice
  const handleRSVP = async (eventId, status) => {
    await fetch("/api/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, userId: user._id, status }),
    });
    fetchUserRsvps(); // Refresh RSVPs
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-10">
      <DashboardNavbar />

      {/* Welcome + Insights */}
      <div className="text-center py-10 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">{`Welcome, ${user.name}`}</h1>
        <p className="text-gray-200 mt-2">{`Role: ${user.role}`}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-40 text-center hover:scale-105 transition">
            <h2 className="text-2xl font-bold">{totalEvents}</h2>
            <p>Total Events</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-40 text-center hover:scale-105 transition">
            <h2 className="text-2xl font-bold">{upcomingEvents.length}</h2>
            <p>Upcoming</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-40 text-center hover:scale-105 transition">
            <h2 className="text-2xl font-bold">{pastEvents.length}</h2>
            <p>Past Events</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-40 text-center hover:scale-105 transition">
            <h2 className="text-2xl font-bold">{totalRSVPs}</h2>
            <p>My RSVPs</p>
          </div>
        </div>
      </div>

      {/* All Events */}
      <section className="p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">All Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const userRSVP = rsvps.find(r => r.eventId?._id === event._id);

              return (
                <li
                  key={event._id}
                  className="bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {event.startAt ? new Date(event.startAt).toLocaleString() : "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {event.location
                      ? typeof event.location === "object"
                        ? `${event.location.address || "Unknown"}, ${event.location.city || ""}`
                        : event.location
                      : "N/A"}
                  </p>
                  <p className="mt-2 text-gray-300">{event.description || "No description"}</p>

                  {!userRSVP ? (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleRSVP(event._id, "attending")}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        ✅ Attending
                      </button>
                      <button
                        onClick={() => handleRSVP(event._id, "maybe")}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        🤔 Maybe
                      </button>
                      <button
                        onClick={() => handleRSVP(event._id, "not_attending")}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        ❌ Not Attending
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`mt-3 font-semibold ${
                        userRSVP.status === "attending"
                          ? "text-green-400"
                          : userRSVP.status === "maybe"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      You RSVPed: {userRSVP.status}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* My RSVPs */}
      <section className="p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">My RSVPs</h2>
        {loading ? (
          <p>Loading RSVPs...</p>
        ) : rsvps.length === 0 ? (
          <p>You have not RSVPed to any events yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rsvps.map((rsvp) => (
              <li
                key={rsvp._id}
                className="bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2">
                  Event: {rsvp.eventId?.title || "Deleted event"}
                </h3>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      rsvp.status === "attending"
                        ? "text-green-400"
                        : rsvp.status === "maybe"
                        ? "text-yellow-400"
                        : "text-red-400"
                    } font-semibold`}
                  >
                    {rsvp.status || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {rsvp.eventId?.startAt
                    ? new Date(rsvp.eventId.startAt).toLocaleString()
                    : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
