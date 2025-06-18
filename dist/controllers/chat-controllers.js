import User from "../models/user-model.js";
import { configureOpenAI } from "../configs/open-ai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User not registered or token invalid" });
            return;
        }
        const chats = user.chats?.map((chat) => ({
            role: chat.role,
            content: chat.content,
        })) || [];
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const openai = configureOpenAI();
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful medical assistant." },
                ...chats,
            ],
        });
        const aiReply = chatResponse.choices[0]?.message;
        if (aiReply) {
            user.chats.push(aiReply);
        }
        await user.save();
        res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error in generateChatCompletion:", error);
        res.status(500).json({ message: "Failed to generate chat", cause: error.message });
    }
};
//get
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
// DELETE 
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
        //user.chats = [];
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