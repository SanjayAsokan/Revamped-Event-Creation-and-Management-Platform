import express from "express";
import multer from "multer";
import { protect, isOrganizer } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getTimeline,
} from "../controllers/eventController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage

// =======================
// Public routes
// =======================
router.get("/", getEvents);

// Timeline + Filter route (⚠️ must come BEFORE :id, otherwise it matches as an id)
router.get("/timeline", protect, getTimeline);

router.get("/:id", getEventById);

// =======================
// Protected routes (organizer only)
// =======================
router.post("/", protect, isOrganizer, upload.array("media"), createEvent);
router.put("/:id", protect, isOrganizer, upload.array("media"), updateEvent);
router.delete("/:id", protect, isOrganizer, deleteEvent);

export default router;
