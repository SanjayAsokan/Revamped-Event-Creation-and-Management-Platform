import Event from "../models/Event.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

// CREATE EVENT (organizer only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, startAt, endAt, location, type } = req.body;

    // ✅ Parse location if it comes as JSON string
    let parsedLocation = {};
    if (location) {
      try {
        parsedLocation = typeof location === "string" ? JSON.parse(location) : location;
      } catch (err) {
        return res.status(400).json({ message: "Invalid location format" });
      }
    }

    let mediaUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        mediaUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    const event = await Event.create({
      title,
      description,
      startAt,
      endAt,
      location: parsedLocation, // ✅ now correct format
      type,
      media: mediaUrls,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("❌ Create event error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email role");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE EVENT (organizer only)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, startAt, endAt, location, type } = req.body;

    // ✅ Parse location
    let parsedLocation = event.location;
    if (location) {
      try {
        parsedLocation = typeof location === "string" ? JSON.parse(location) : location;
      } catch (err) {
        return res.status(400).json({ message: "Invalid location format" });
      }
    }

    let mediaUrls = event.media;
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        mediaUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    Object.assign(event, {
      title,
      description,
      startAt,
      endAt,
      location: parsedLocation,
      type,
      media: mediaUrls,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error("❌ Update event error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE EVENT (organizer only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TIMELINE + FILTER API
export const getTimeline = async (req, res) => {
  try {
    const { type, from, to, search } = req.query;

    let filter = {};

    if (type) filter.type = type;

    if (from || to) filter.startAt = {};
    if (from) filter.startAt.$gte = new Date(from);
    if (to) filter.startAt.$lte = new Date(to);

    if (search) filter.title = { $regex: search, $options: "i" };

    const events = await Event.find(filter)
      .populate("createdBy", "name email role")
      .sort({ startAt: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
