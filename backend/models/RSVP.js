import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  status: { type: String, enum: ["attending", "maybe", "not attending"], default: "maybe", },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now,}});

export default mongoose.model("RSVP", rsvpSchema);
