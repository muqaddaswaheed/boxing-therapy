import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, default: "", lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
  },
  { _id: false }
);

/**
 * A booking request created from the custom form. The actual time slot is
 * chosen on Calendly (Phase 4); `calendly` holds the synced event once booked.
 */
const BookingSchema = new mongoose.Schema(
  {
    sessionType: {
      type: String,
      enum: ["solo", "duo", "trio", "group"],
      required: true,
    },
    participants: {
      type: [ParticipantSchema],
      validate: (v) => Array.isArray(v) && v.length >= 1,
    },
    // Primary contact = first participant, duplicated for quick lookup
    contactEmail: { type: String, default: "", lowercase: true, trim: true },
    contactPhone: { type: String, default: "", trim: true },

    paymentMethod: {
      type: String,
      enum: ["transfer", "cash", "code"],
      required: true,
    },
    code: { type: String, default: "", uppercase: true, trim: true },
    codeConsumed: { type: Boolean, default: false }, // session deducted (on slot booking)
    lang: { type: String, default: "fr" },

    // Pack chosen on the Promotion page (if any) + its total sessions
    pack: { type: String, default: "" }, // "pack5" | "pack10"
    packSessions: { type: Number, default: null }, // 5 | 10

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    // Chosen time slot (wall-clock, timezone-safe)
    slotDate: { type: String, default: "" }, // "YYYY-MM-DD"
    slotHour: { type: Number, default: null }, // 0-23

    // Calendly link (filled by the webhook when the slot is scheduled)
    calendlyEventUri: { type: String, default: "" },
    calendlyStart: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
