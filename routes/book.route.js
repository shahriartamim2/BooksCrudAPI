import express from "express";
import {
  getBooks,
  createBook,
  editBook,
  deleteBook,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/",getBooks);
router.post("/", createBook);
router.put('/:id',editBook);
router.delete('/:id',deleteBook)

export default router;