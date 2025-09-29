import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date },
  location: {
    address: { type: String, required: true },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: undefined,
    },
  },
  media: [{ type: String }], // Array of Cloudinary URLs
  type: { type: String, enum: ["public", "private", "rsvp-only"], default: "public" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Event", eventSchema);
