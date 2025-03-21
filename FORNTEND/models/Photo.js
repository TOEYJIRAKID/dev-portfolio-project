// models/Photo.js

const { Schema, models, model } = require("mongoose");

const PhotoSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true, // automatically manage createdAt and updatedAt
  }
);

export const Photo = models.Photo || model("Photo", PhotoSchema, "photos");
