const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    image: String,
    admin: { type: Boolean, default: false },
    household: { type: Schema.Types.ObjectId, ref: "Household" },
    currentScore: { type: Number, default: 0 },
    shifts: [{ type: Schema.Types.ObjectId, ref: "Shift" }],
    pendingTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    completedTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
