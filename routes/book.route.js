import express from "express";
import {
  getBooks,
  createBook,
  editBook,
  deleteBook,
  getBook,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/",getBooks);
router.get("/:id",getBook);
router.post("/", createBook);
router.put('/:id',editBook);
router.delete('/:id',deleteBook)

export default router;