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

CodeSchema.virtual("remaining").get(function () {
  return Math.max(0, this.totalSessions - this.usedSessions);
});

CodeSchema.set("toJSON", { virtuals: true });
CodeSchema.set("toObject", { virtuals: true });

export default mongoose.models.Code || mongoose.model("Code", CodeSchema);
