import mongoose from "mongoose";

/**
 * A pack booking code (e.g. BTP-2026-0042) issued to a client who bought a
 * Pack 5 / Pack 10. Tracks how many sessions have been used.
 */
const CodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    packType: { type: String, enum: ["pack5", "pack10"], required: true },
    totalSessions: { type: Number, required: true },
    usedSessions: { type: Number, default: 0 },
    // Sessions left — stored (not virtual) so it's visible directly in the DB.
    remaining: { type: Number, required: true },
    // Who the code belongs to (optional at creation time)
    clientName: { type: String, default: "" },
    clientEmail: { type: String, default: "", lowercase: true, trim: true },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Code || mongoose.model("Code", CodeSchema);
