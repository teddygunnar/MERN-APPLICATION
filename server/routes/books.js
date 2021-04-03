import express from "express";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
} from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);
router.patch("/:id/borrowBook", borrowBook);

export default router;
