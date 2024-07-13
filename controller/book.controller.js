import Book from "../models/book.model.js";

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books) {
      res.status(200).json(books);
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

const getBook = async (req, res) => {
  const id = req.params.id
  try {
    const book = await Book.findOne({_id:id});
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(503).send({
        success: false,
        message: "Book not found",
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
    if (!id) {
      return res.status(400).send({ message: "Book ID is required" });
    }

    // Uncomment and modify the below code if you want to enforce certain fields in the request body
    // const { name, author, publishYear, description } = req.body;
    // if (!name && !author && !publishYear && !description) {
    //   return res.status(400).send({ message: "Send required changes" });
    // }

    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    } else {
      return res
        .status(200)
        .send({ message: "Book successfully updated", data: result });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};


const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
     const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    } else {
      return res.status(200).send({ message: "Book successfully deleted", data: result });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};

export { getBooks, getBook, createBook, editBook, deleteBook };
