import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "USER", required: true },
      content: { type: String, required: true },
      chat: { type: mongoose.Schema.Types.ObjectId, ref: "CHAT", required: true },
      messageType: { type: String, enum: ["text", "image", "video"], default: "text" },
      seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }], // Users who have seen the message
    },
    { timestamps: true }
  );
  
  export default mongoose.model("MESSAGE", messageSchema);
  