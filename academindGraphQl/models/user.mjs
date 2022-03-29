import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvent: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.model("User", userSchema);
