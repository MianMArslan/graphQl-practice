import mongoose from "mongoose";
const schema = mongoose.Schema;
const eventSchema = new schema({
  title: {
    type: String,
  },
  description: String,
  price: Number,
  date: Date,
  creator: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Event", eventSchema);
