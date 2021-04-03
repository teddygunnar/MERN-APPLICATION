import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  year: String,
  genre: [String],
  selectedFile: String,
  reservationStatus: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const BooksDetails = mongoose.model("BooksDetails", bookSchema);

export default BooksDetails;
