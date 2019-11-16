import mongoose from 'mongoose';

const HelpOrder = new mongoose.Schema(
  {
    student: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    answerAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('helpOrder', HelpOrder);
