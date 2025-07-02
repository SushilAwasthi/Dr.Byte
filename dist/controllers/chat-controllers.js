import axios from "axios";
import User from "../models/user-model.js";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User not registered or token invalid" });
            return;
        }
        // Push user message to chats
        const chats = user.chats?.map((chat) => ({
            role: chat.role,
            content: chat.content,
        })) || [];
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const response = await axios.post("http://localhost:5005/predict", {
            message: message,
        });
        const aiReply = response.data.reply;
        if (aiReply) {
            user.chats.push({ role: "assistant", content: aiReply });
        }
        await user.save();
        res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error in generateChatCompletion:", error);
        res.status(500).json({ message: "Failed to generate chat", cause: error.message });
    }
};
// GET all chats
export const getAllChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(403).json({ message: "Permission denied" });
            return;
        }
        res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (err) {
        console.error("Error in getAllChats:", err);
        res.status(500).json({ message: "Failed to get chats", cause: err.message });
    }
};
// DELETE all chats
export const deleteAllChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(403).json({ message: "Permission denied" });
            return;
        }
        user.chats.splice(0);
        await user.save();
        res.status(200).json({ message: "Chats deleted", chats: user.chats });
    }
    catch (err) {
        console.error("Error in deleteAllChats:", err);
        res.status(500).json({ message: "Failed to delete chats", cause: err.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map