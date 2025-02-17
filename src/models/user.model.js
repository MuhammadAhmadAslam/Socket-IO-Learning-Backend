import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        statuses: [{ type: mongoose.Schema.Types.ObjectId, ref: "STATUS" }],
    },
    { timestamps: true }
);

const UserModal = mongoose.model("USER", userSchema);

export default UserModal;