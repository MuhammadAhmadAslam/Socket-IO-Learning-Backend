import mongoose from "mongoose"
const notificationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "USER", required: true },
        type: { type: String, enum: ["message", "status"], required: true },
        referenceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Message or Status ID
        seen: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("NOTIFICATION", notificationSchema);
