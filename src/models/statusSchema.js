import mongoose from "mongoose"
const statusSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "USER", required: true },
      mediaUrl: { type: String, required: true }, // Image/Video
      caption: { type: String },
      expiresAt: { type: Date, required: true }, // Auto-delete after 24 hours
      seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
    },
    { timestamps: true }
  );
  
  // Auto-delete expired statuses after 24 hours
  statusSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  
  export default mongoose.model("STATUS", statusSchema);
  