const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Task", taskSchema);
