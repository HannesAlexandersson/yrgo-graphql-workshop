import mongoose from "mongoose";
import { Books } from "./books.js";
const { model, Schema, SchemaTypes } = mongoose;

export const AuthorSchema = new Schema({
  name: { type: SchemaTypes.String },
  books: [{ type: SchemaTypes.ObjectId, ref: "Books" }],
});

AuthorSchema.pre("deleteOne", async function (next) {
  await Books.deleteMany({ author: this._conditions._id });
  next();
});

export const Author = model("Author", AuthorSchema);
