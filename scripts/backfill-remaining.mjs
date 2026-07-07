/**
 * One-time migration: set `remaining = totalSessions - usedSessions` on every
 * existing code document (older codes were created before `remaining` was stored).
 *
 *   node --env-file=.env.local scripts/backfill-remaining.mjs
 */
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not set.");
  process.exit(1);
}

await mongoose.connect(uri);
const res = await mongoose.connection.db.collection("codes").updateMany({}, [
  {
    $set: {
      remaining: {
        $max: [0, { $subtract: ["$totalSessions", "$usedSessions"] }],
      },
    },
  },
]);
console.log(`✓ Updated ${res.modifiedCount} code(s) with a stored 'remaining' field.`);
await mongoose.disconnect();
