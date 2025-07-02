// models/feedback-model.js
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  sentiment: { type: String, required: true },
  rating: { type: Number, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// export default mongoose.model("Feedback", feedbackSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
