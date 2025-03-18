const { Schema, models, model } = require("mongoose");

const CommentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  contentpera: { type: String, required: true },
  maincomment: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  children: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] }, // Add this line
  parentName: { type: String, default: null },
});

export const Comment =
  models.Comment || model("Comment", CommentSchema, "comments");
