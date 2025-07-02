import mongoose from "mongoose";
import chatSchema from "./chat-model.js";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        enum: [0, 1], // 0 = user, 1 = admin
        default: 0,
    },
    chats: [chatSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user-model.js.map