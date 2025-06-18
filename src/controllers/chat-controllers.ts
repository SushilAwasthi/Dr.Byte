// import { Request, Response, NextFunction } from "express";
// import User from "../models/user-model.js";
// import axios from "axios";

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { message } = req.body;

//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       res.status(401).json({ message: "User not registered or token invalid" });
//       return;
//     }

//     const chats = user.chats?.map((chat: any) => ({
//       role: chat.role,
//       content: chat.content,
//     })) || [];

//     chats.push({ role: "user", content: message });
//     user.chats.push({ role: "user", content: message });


//     const chatResponse = await axios.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful medical assistant." },
//         ...chats,
//       ],
//     });

//     const aiReply = chatResponse.choices[0]?.message;
//     if (aiReply) {
//       user.chats.push(aiReply);
//     }

//     await user.save();
//     res.status(200).json({ chats: user.chats });
//   } catch (error: any) {
//     console.error("Error in generateChatCompletion:", error);
//     res.status(500).json({ message: "Failed to generate chat", cause: error.message });
//   }
// };

// //get
// export const getAllChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const user = await User.findById(res.locals.jwtData.id);

//     if (!user) {
//       res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
//       return;
//     }

//     if (user._id.toString() !== res.locals.jwtData.id) {
//       res.status(403).json({ message: "Permission denied" });
//       return;
//     }

//     res.status(200).json({ message: "OK", chats: user.chats });
//   } catch (err: any) {
//     console.error("Error in getAllChats:", err);
//     res.status(500).json({ message: "Failed to get chats", cause: err.message });
//   }
// };

// // DELETE 
// export const deleteAllChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const user = await User.findById(res.locals.jwtData.id);

//     if (!user) {
//       res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
//       return;
//     }

//     if (user._id.toString() !== res.locals.jwtData.id) {
//       res.status(403).json({ message: "Permission denied" });
//       return;
//     }

//     //user.chats = [];
//     user.chats.splice(0);
//     await user.save();

//     res.status(200).json({ message: "Chats deleted", chats: user.chats });
//   } catch (err: any) {
//     console.error("Error in deleteAllChats:", err);
//     res.status(500).json({ message: "Failed to delete chats", cause: err.message });
//   }
// };
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import User from "../models/user-model.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message } = req.body;

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res.status(401).json({ message: "User not registered or token invalid" });
      return;
    }

    // Push user message to chats
    const chats = user.chats?.map((chat: any) => ({
      role: chat.role,
      content: chat.content,
    })) || [];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // 🔁 Replace OpenAI with call to your trained model's API
    const response = await axios.post("http://localhost:5005/chat", {
      message: message,
    });

    const aiReply = response.data.reply;

    if (aiReply) {
      user.chats.push({ role: "assistant", content: aiReply });
    }

    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("Error in generateChatCompletion:", error);
    res.status(500).json({ message: "Failed to generate chat", cause: error.message });
  }
};

// GET all chats
export const getAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  } catch (err: any) {
    console.error("Error in getAllChats:", err);
    res.status(500).json({ message: "Failed to get chats", cause: err.message });
  }
};

// DELETE all chats
export const deleteAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  } catch (err: any) {
    console.error("Error in deleteAllChats:", err);
    res.status(500).json({ message: "Failed to delete chats", cause: err.message });
  }
};
