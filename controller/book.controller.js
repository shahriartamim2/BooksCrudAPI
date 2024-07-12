import Book from "../models/book.model.js";

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books) {
      res.status(200).send({
        success: true,
        books,
      });
    } else {
      res.status(503).send({
        success: false,
        message: "Books not found",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createBook = async (req, res, next) => {
  try {
    const { name, author, publishYear, description } = req.body;
    const book = await Book.findOne({ name: name });
    if (book) {
      return res.send({
        message: "Book already exists",
      });
    } else {
      const newBook = new Book({
        name: name,
        author: author,
        publishYear: publishYear,
        description: description,
      });
      newBook.save();
      res.status(200).send({
        success: true,
        newBook,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};

const editBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    // if(name||author||publishYear||description){
    //   return res.status(500).send({message:"Send required changes"})
    // }
    const result = Book.findByIdAndUpdate(id,req.body)
    if (!result) {
      return res.status(500).send({ message: "Book not found" });
    } else {
      return res.status(200).send({ message: " Successfully Book Updated ",
        data:result
       });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.deleteOne({ _id: id })
      .then(() =>
        res.status(200).send({
          success: true,
          book
        })
      )
      .catch((err) =>
        res.status(401).send({
          success: false,
          error: err,
        })
      );
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};

export { getBooks, createBook, editBook, deleteBook };
