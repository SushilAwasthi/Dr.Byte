import express from "express";
import { verifyToken } from "../utils/token-manager.js";
import { createFeedback, getAllFeedbackUsers, getFeedbackStats, } from "../controllers/feedback-controller.js";
const router = express.Router();
// Routes that require authentication
router.get("/users", verifyToken, getAllFeedbackUsers);
router.get("/stats", verifyToken, getFeedbackStats);
// Route to submit new feedback (no auth required)
router.post("/new", createFeedback);
export default router;
//# sourceMappingURL=feedback-routes.js.map