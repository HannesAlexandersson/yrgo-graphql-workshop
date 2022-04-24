import mongoose from "mongoose";
import { Author } from "./author.js";

const { model, Schema, SchemaTypes } = mongoose;

export const BooksSchema = new Schema({
  title: { type: SchemaTypes.String },
  author: { type: SchemaTypes.ObjectId, ref: "Author" },
});

BooksSchema.pre("deleteOne", async function (next) {
  const author = await Author.findOne({
    books: { $in: [this._conditions._id] },
  });
  if (author) {
    const updatedBooks = author.books.filter((book) => {
      if (book.equals(this._conditions._id)) {
        return false;
      }
      return mongoose.Types.ObjectId(book);
    });
    author.books = updatedBooks;
    await author.save();
    next();
  }
});

export const Books = model("Books", BooksSchema);
