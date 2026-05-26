import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: [true, "Subject field is required"],
      trim: true,
      minlength: [4, "Subject must be at least 4 characters"]
    },
    message: {
      type: String,
      required: [true, "Message payload is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"]
    }
  },
  {
    timestamps: true // Automatically sets up createdAt and updatedAt
  }
);

// Apply indexes on lookup keys to prevent performance degradation on scale
submissionSchema.index({ email: 1 });
submissionSchema.index({ createdAt: -1 });

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
