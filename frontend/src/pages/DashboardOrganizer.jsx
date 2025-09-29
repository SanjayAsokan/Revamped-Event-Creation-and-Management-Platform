import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import DashboardNavbar from "../components/user/DashboardNavbar";

// Static placeholder image
const placeholderImage = "https://via.placeholder.com/400x200?text=No+Image";

export default function DashboardOrganizer() {
  const { state, fetchEvents, deleteEvent } = useEvent();
  const { events, rsvps, loading } = state;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventRsvps, setSelectedEventRsvps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser || null);
    fetchEvents(); // fetch events once organizer logs in
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  // Filter events created by this organizer
  const myEvents = events.filter((event) => event.createdBy?._id === user._id);
  const now = new Date();
  const upcomingEvents = myEvents.filter(
    (event) => new Date(event.startAt) > now
  );
  const pastEvents = myEvents.filter((event) => new Date(event.startAt) <= now);

  const getRSVPCounts = (eventId) => {
    const eventRSVPs = rsvps.filter((r) => r.eventId?._id === eventId);
    const counts = { attending: 0, maybe: 0, not_attending: 0 };
    eventRSVPs.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });
    return counts;
  };

  const handleViewRsvps = (eventId) => {
    const eventRSVPs = rsvps.filter((r) => r.eventId?._id === eventId);
    setSelectedEventRsvps(eventRSVPs);
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(eventId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <DashboardNavbar />

      <div className="pt-28 max-w-7xl mx-auto px-4">
        {/* Organizer Stats */}
        <div className="p-6 text-center bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-3xl shadow-lg mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <div className="flex justify-center gap-8 mt-4 flex-wrap">
            <div className="bg-white text-blue-600 px-6 py-4 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-xl font-bold">{myEvents.length}</h2>
              <p>Total Events</p>
            </div>
            <div className="bg-white text-blue-600 px-6 py-4 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-xl font-bold">{rsvps.length}</h2>
              <p>Total RSVPs</p>
            </div>
            <div className="bg-white text-blue-600 px-6 py-4 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-xl font-bold">{upcomingEvents.length}</h2>
              <p>Upcoming Events</p>
            </div>
            <div className="bg-white text-blue-600 px-6 py-4 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-xl font-bold">{pastEvents.length}</h2>
              <p>Past Events</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/create-event")}
            className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-lg font-medium shadow hover:bg-gray-100 transition"
          >
            + Create New Event
          </button>
        </div>

        {/* Insights Section */}
        <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">📊 Insights & Stats</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-lg font-bold">Most Popular Event</h3>
              <p className="mt-2 text-gray-700">
                {myEvents.length
                  ? myEvents.reduce((a, b) =>
                      getRSVPCounts(a._id).attending >
                      getRSVPCounts(b._id).attending
                        ? a
                        : b
                    ).title
                  : "N/A"}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-lg font-bold">Highest RSVPs</h3>
              <p className="mt-2 text-gray-700">
                {myEvents.length
                  ? Math.max(
                      ...myEvents.map((e) => getRSVPCounts(e._id).attending)
                    )
                  : 0}{" "}
                attending
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-lg font-bold">Events This Month</h3>
              <p className="mt-2 text-gray-700">
                {
                  myEvents.filter(
                    (e) =>
                      new Date(e.startAt).getMonth() === now.getMonth() &&
                      new Date(e.startAt).getFullYear() === now.getFullYear()
                  ).length
                }
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">📅 Upcoming Events</h2>
          {loading ? (
            <p>Loading events...</p>
          ) : upcomingEvents.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const counts = getRSVPCounts(event._id);
                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={event.media?.[0]?.url || placeholderImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {new Date(event.startAt).toLocaleString()} -{" "}
                        {new Date(event.endAt).toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm mb-1">
                        Location: {event.location?.address || event.location}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Type: {event.type}
                      </p>
                      <div className="flex gap-4 text-sm mb-3">
                        <span className="text-green-500 font-medium">
                          ✅ {counts.attending}
                        </span>
                        <span className="text-yellow-500 font-medium">
                          🤔 {counts.maybe}
                        </span>
                        <span className="text-red-500 font-medium">
                          ❌ {counts.not_attending}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleViewRsvps(event._id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          View RSVPs
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/create-event?id=${event._id}`)
                          }
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Past Events */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">📜 Past Events</h2>
          {loading ? (
            <p>Loading events...</p>
          ) : pastEvents.length === 0 ? (
            <p>No past events.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {pastEvents.map((event) => {
                const counts = getRSVPCounts(event._id);
                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={event.media?.[0]?.url || placeholderImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {new Date(event.startAt).toLocaleString()} -{" "}
                        {new Date(event.endAt).toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm mb-1">
                        Location: {event.location?.address || event.location}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Type: {event.type}
                      </p>
                      <div className="flex gap-4 text-sm mb-3">
                        <span className="text-green-500 font-medium">
                          ✅ {counts.attending}
                        </span>
                        <span className="text-yellow-500 font-medium">
                          🤔 {counts.maybe}
                        </span>
                        <span className="text-red-500 font-medium">
                          ❌ {counts.not_attending}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleViewRsvps(event._id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          View RSVPs
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">RSVP List</h2>
            {selectedEventRsvps.length > 0 ? (
              <table className="w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEventRsvps.map((rsvp, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{rsvp.user?.name || "Guest"}</td>
                      <td className="p-2">{rsvp.user?.email || "N/A"}</td>
                      <td className="p-2 capitalize">{rsvp.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No RSVPs yet.</p>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
