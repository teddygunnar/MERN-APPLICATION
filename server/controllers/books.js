import BookDetails from "../models/booksDetail.js";
import mongoose from "mongoose";

export const getBooks = async (req, res) => {
  try {
    //Fetching books
    const bookDetails = await BookDetails.find();

    res.status(200).json(bookDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const book = req.body;

  const newBook = new BookDetails(book);
  try {
    //adding books
    await newBook.save();
    res.status(200).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id: _id } = req.params;
  const book = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No book with that id");

  const updatedBook = await BookDetails.findByIdAndUpdate(
    _id,
    { ...book, _id },
    { new: true }
  );

  res.json(updatedBook);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No book with that id");

  await BookDetails.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const borrowBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No book with that id");

  const book = await BookDetails.findById(id);

  const updatedBook = await BookDetails.findByIdAndUpdate(
    id,
    { reservationStatus: book.reservationStatus + 1 },
    { new: true }
  );

  res.json(updatedBook);
};
