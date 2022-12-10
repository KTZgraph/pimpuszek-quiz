import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lessonName: String,
  lessonNumber: String,
  classDate: String,
  title: String,
  description: String,
  notionDatabaseId: String,
  notionQuizList: [{ type: mongoose.Schema.Types.Mixed }],
  emailOwner: { type: String },
});

module.exports =
  mongoose.models.Lessons || mongoose.model("Lessons", lessonSchema);
