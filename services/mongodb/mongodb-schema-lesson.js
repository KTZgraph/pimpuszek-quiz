import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lessonName: String,
  lessonNumber: String,
  classDate: String,
  title: String,
  description: String,
  emailOwner: { type: String },
  // TODO dołożyć taki i przedmiot
  // tags: [
  //   {
  //     type: String,
  //   },
  // ],
  // subject: String
});

module.exports =
  mongoose.models.Lessons || mongoose.model("Lessons", lessonSchema);
