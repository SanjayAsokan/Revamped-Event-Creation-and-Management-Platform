import { createContext, useReducer, useContext, useEffect } from "react";
import api from "../api/axios";

const EventContext = createContext();

const initialState = {
  events: [],
  rsvps: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_EVENTS_SUCCESS":
      return { ...state, events: action.payload, loading: false };
    case "FETCH_RSVPS_SUCCESS":
      return { ...state, rsvps: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "ADD_EVENT":
      return { ...state, events: [action.payload, ...state.events] };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => e._id !== action.payload),
      };
    case "UPDATE_RSVP":
      return {
        ...state,
        rsvps: state.rsvps.map((r) =>
          r._id === action.payload._id ? action.payload : r
        ),
      };
    default:
      return state;
  }
}

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.token) return;

      const res = await api.get("/events", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: "FETCH_EVENTS_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Fetch all RSVPs (for organizer)
  const fetchUserRsvps = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.token) return;

      const res = await api.get("/rsvps", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: "FETCH_RSVPS_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Add new event
  const addEvent = async (eventData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.post("/events", eventData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: "ADD_EVENT", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Update event
  const updateEvent = async (eventId, eventData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.put(`/events/${eventId}`, eventData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: "UPDATE_EVENT", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.delete(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: "DELETE_EVENT", payload: eventId });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Update RSVP (perform action)
  const updateRSVP = async (rsvpId, status) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.put(
        `/rsvps/${rsvpId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({ type: "UPDATE_RSVP", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUserRsvps();
  }, []);

  return (
    <EventContext.Provider
      value={{
        state,
        dispatch,
        fetchEvents,
        fetchUserRsvps,
        addEvent,
        updateEvent,
        deleteEvent,
        updateRSVP,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
