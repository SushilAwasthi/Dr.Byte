import User from "../models/user-model.js";
import Feedback from "../models/feedback-model.js";
// GET /api/feedback/users
export const getAllFeedbackUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name email role").lean();
        const feedbacks = await Feedback.find();
        // Map email to feedback count
        const userMap = new Map();
        for (const feedback of feedbacks) {
            userMap.set(feedback.email, (userMap.get(feedback.email) || 0) + 1);
        }
        // Enrich users with feedback count
        const enrichedUsers = users.map(user => ({
            ...user,
            feedbackCount: userMap.get(user.email) || 0,
        }));
        res.status(200).json({ users: enrichedUsers });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "Failed to fetch users",
            cause: error.message,
        });
    }
};
// GET /api/feedback/stats
export const getFeedbackStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: 1 });
        const normalUserCount = await User.countDocuments({ role: 0 });
        const feedbacks = await Feedback.find();
        const sentiments = {
            Positive: feedbacks.filter(f => f.sentiment === "Positive").length,
            Negative: feedbacks.filter(f => f.sentiment === "Negative").length,
            Neutral: feedbacks.filter(f => f.sentiment === "Neutral").length,
        };
        const ratings = {
            "1 Star": feedbacks.filter(f => f.rating === 1).length,
            "2 Stars": feedbacks.filter(f => f.rating === 2).length,
            "3 Stars": feedbacks.filter(f => f.rating === 3).length,
            "4 Stars": feedbacks.filter(f => f.rating === 4).length,
            "5 Stars": feedbacks.filter(f => f.rating === 5).length,
        };
        res.status(200).json({
            totalUsers,
            adminCount,
            normalUserCount,
            totalFeedbacks: feedbacks.length,
            sentiments,
            ratings,
        });
    }
    catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({
            message: "Failed to fetch stats",
            cause: error.message,
        });
    }
};
// POST /api/feedback/new
export const createFeedback = async (req, res) => {
    try {
        const { comment, sentiment, rating, email } = req.body;
        // Validate input
        if (!comment || !sentiment || !rating || !email) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const feedback = new Feedback({ comment, sentiment, rating, email });
        await feedback.save();
        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback,
        });
    }
    catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({
            message: "Failed to submit feedback",
            cause: error.message,
        });
    }
};
//# sourceMappingURL=feedback-controller.js.map