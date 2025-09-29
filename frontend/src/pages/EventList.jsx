import { useEffect } from "react";
import { useEvent } from "../context/EventContext.jsx";
import UserLayout from "@/layouts/UserLayout";

export default function EventList() {
  const { state, fetchEvents } = useEvent();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <UserLayout>
      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">All Events</h1>

        {state.events.length === 0 ? (
          <p className="text-center text-gray-400">No events found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {state.events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transform transition duration-300"
              >
                {/* Event Media */}
                <img
                  src={
                    event.mediaUrl && event.mediaUrl.trim() !== ""
                      ? event.mediaUrl
                      : "https://via.placeholder.com/400x200?text=Event+Image"
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                {/* Event Details */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-3">
                    {event.description?.length > 100
                      ? event.description.slice(0, 100) + "..."
                      : event.description}
                  </p>

                  <p className="text-gray-400 text-sm">
                    <span className="font-semibold">Start:</span>{" "}
                    {new Date(event.startAt).toLocaleString()}
                  </p>
                  {event.location && (
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {event.location}
                    </p>
                  )}

                  {/* RSVP Count if available */}
                  {event.rsvps && (
                    <p className="text-gray-400 text-sm mt-2">
                      <span className="font-semibold">Attendees:</span>{" "}
                      {event.rsvps.length}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
