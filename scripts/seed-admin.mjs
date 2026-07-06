/**
 * Seed / update an admin user in MongoDB.
 * Usage:
 *   node --env-file=.env.local scripts/seed-admin.mjs [email] [password]
 * Defaults to admin@gmail.com / 123456 if no args are given.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const email = (process.argv[2] || "admin@gmail.com").toLowerCase();
const password = process.argv[3] || "123456";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not set. Run with: node --env-file=.env.local scripts/seed-admin.mjs");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  { email: { type: String, unique: true, lowercase: true, trim: true }, passwordHash: String, name: String },
  { timestamps: true }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

await mongoose.connect(uri);
const passwordHash = await bcrypt.hash(password, 10);
const doc = await Admin.findOneAndUpdate(
  { email },
  { email, passwordHash },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);
console.log(`✓ Admin seeded: ${doc.email}  (password: ${password})`);
await mongoose.disconnect();
