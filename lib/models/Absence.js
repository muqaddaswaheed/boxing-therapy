import mongoose from "mongoose";

/**
 * A blocked date (coach unavailable). `value` is either the string "all"
 * (whole day blocked) or an array of blocked hour numbers.
 */
const AbsenceSchema = new mongoose.Schema(
  {
    dateKey: { type: String, required: true, unique: true }, // "YYYY-MM-DD"
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Absence ||
  mongoose.model("Absence", AbsenceSchema);
