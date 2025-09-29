import Event from "../models/Event.js";
import RSVP from "../models/RSVP.js";

// Get Event Timeline for a user
export const getEventTimeline = async (req, res) => {
  const userId = req.user?._id; // optional for logged-in users
  const { type, search } = req.query; // filter options

  try {
    let filter = {};
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: "i" };

    const events = await Event.find(filter)
      .sort({ startAt: 1 })
      .populate("createdBy", "name email role");

    // If user is logged in, attach RSVP status
    if (userId) {
      const rsvps = await RSVP.find({ userId });
      const rsvpMap = {};
      rsvps.forEach(r => (rsvpMap[r.eventId] = r.status));

      const eventsWithRSVP = events.map(event => ({
        ...event.toObject(),
        userRSVP: rsvpMap[event._id] || null,
      }));
      return res.json(eventsWithRSVP);
    }

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
