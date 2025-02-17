import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        isGroup: { type: Boolean, default: false },
        chatName: { type: String },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "USER" }, 
        latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "MESSAGE" }, 
    },
    { timestamps: true }
);

export default mongoose.model("CHAT", chatSchema);
