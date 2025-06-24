import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";
config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat/", chatRoutes);
// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URL, { dbName: "chatbot" })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log("MongoDB connected successfully.");
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err.message);
});
//# sourceMappingURL=index.js.map