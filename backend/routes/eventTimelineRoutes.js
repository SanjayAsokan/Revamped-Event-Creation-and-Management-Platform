import express from "express";
import { getEventTimeline } from "../controllers/eventTimelineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Timeline for logged-in users (RSVP status attached)
router.get("/", protect, getEventTimeline);

// Optional: public timeline without login
// router.get("/public", getEventTimeline);

export default router;
