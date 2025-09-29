import RSVP from "../models/RSVP.js";
import Event from "../models/Event.js";

// Create RSVP
export const createRSVP = async (req, res) => {
  const { eventId, status, notes } = req.body;
  const userId = req.user._id;

  try {
    // Check if RSVP already exists
    const existing = await RSVP.findOne({ eventId, userId });
    if (existing) return res.status(400).json({ message: "RSVP already exists" });

    const rsvp = await RSVP.create({ eventId, userId, status, notes });
    res.status(201).json(rsvp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update RSVP
export const updateRSVP = async (req, res) => {
  const { status, notes } = req.body;
  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (!rsvp) return res.status(404).json({ message: "RSVP not found" });

    // Only owner can update
    if (rsvp.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (status) rsvp.status = status;
    if (notes !== undefined) rsvp.notes = notes;

    await rsvp.save();
    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get RSVPs for Event (Organizer)
export const getEventRSVPs = async (req, res) => {
  const { eventId } = req.params;
  try {
    const rsvps = await RSVP.find({ eventId }).populate("userId", "name email");
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get RSVPs for User
export const getUserRSVPs = async (req, res) => {
  const userId = req.user._id;
  try {
    const rsvps = await RSVP.find({ userId }).populate("eventId", "title startAt endAt");
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
