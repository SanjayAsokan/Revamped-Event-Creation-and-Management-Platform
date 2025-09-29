import PublicLayout from "@/layouts/PublicLayout";
import { useEvent } from "../context/EventContext.jsx";

export default function Home() {
  const { state } = useEvent();
  const { events, loading, error } = state;

  return (
    <PublicLayout>
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Events</h1>

        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white shadow rounded p-4 text-gray-900">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="mb-1">{event.description}</p>
              <p className="text-sm">
                Date: {new Date(event.startAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
