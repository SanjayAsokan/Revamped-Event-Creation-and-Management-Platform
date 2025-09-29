import express from "express";
import {
  createRSVP,
  updateRSVP,
  getEventRSVPs,
  getUserRSVPs,
} from "../controllers/rsvpController.js";
import { protect, isOrganizer } from "../middleware/authMiddleware.js";

const router = express.Router();

// User RSVPs to an event
router.post("/", protect, createRSVP);

// Update RSVP
router.put("/:id", protect, updateRSVP);

// Organizer can view RSVPs for their event
router.get("/event/:eventId", protect, isOrganizer, getEventRSVPs);

// User can view their own RSVPs
router.get("/user", protect, getUserRSVPs);

export default router;
