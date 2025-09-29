// components/organiser/EventRSVP.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios"; // make sure this path is correct

export default function EventRSVP({ eventId }) {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch attendees from backend
  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) throw new Error("Unauthorized");

        const res = await api.get(`/events/${eventId}/attendees`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAttendees(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, [eventId]);

  // Filter attendees by name or email
  const filtered = attendees.filter(
    (att) =>
      att.name.toLowerCase().includes(search.toLowerCase()) ||
      att.email.toLowerCase().includes(search.toLowerCase())
  );

  // Color coding for RSVP status
  const statusColors = {
    attending: "bg-green-500",
    maybe: "bg-yellow-500",
    not_attending: "bg-red-500",
  };

  // Calculate counts
  const counts = attendees.reduce(
    (acc, att) => {
      acc[att.status] = (acc[att.status] || 0) + 1;
      return acc;
    },
    { attending: 0, maybe: 0, not_attending: 0 }
  );

  if (loading) return <p>Loading attendees...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">RSVP Dashboard</h2>

      {/* Search and counts */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <input
          type="text"
          placeholder="Search attendees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full sm:w-1/3"
        />
        <div className="space-x-4 mt-2 sm:mt-0">
          <span>Total: {attendees.length}</span>
          <span className="text-green-400">Attending: {counts.attending}</span>
          <span className="text-yellow-400">Maybe: {counts.maybe}</span>
          <span className="text-red-400">Not Attending: {counts.not_attending}</span>
        </div>
      </div>

      {/* Attendees table */}
      {filtered.length === 0 ? (
        <p>No attendees match your search.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-700 p-2">Name</th>
              <th className="border border-gray-700 p-2">Email</th>
              <th className="border border-gray-700 p-2">RSVP Status</th>
              <th className="border border-gray-700 p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((att) => (
              <tr key={att.id} className="text-center">
                <td className="border border-gray-700 p-2">{att.name}</td>
                <td className="border border-gray-700 p-2">{att.email}</td>
                <td className="border border-gray-700 p-2">
                  <span
                    className={`px-2 py-1 rounded ${statusColors[att.status] || "bg-gray-500"}`}
                  >
                    {att.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td className="border border-gray-700 p-2">{att.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
