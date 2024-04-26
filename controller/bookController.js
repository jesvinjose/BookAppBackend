import { Book } from "../models/bookSchema.js";
import { ObjectId } from "mongodb";

export const listBooks = async (req, res) => {
  try {
    const searchQuery = req.query.q; 

    if (searchQuery) {
      
      const books = await Book.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } }, 
          { description: { $regex: searchQuery, $options: "i" } }, 
        ],
      });

      res.status(200).json({ books });
    } else {

      const books = await Book.find({});

      res.status(200).json({ books });
    }
  } catch (error) {

    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id; 
    console.log(typeof id);
    const deletedbook = await Book.findOneAndDelete({ _id: new ObjectId(id) }); 

    if (!deletedbook) {
      return res.status(404).json({ error: "Book not found" });
    }
    const books = await Book.find({});
    res.status(200).json({
      message: "Book deleted successfully",
      deletedBook: deletedbook,
      updatedBooks: books,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.find({ _id: new ObjectId(id) });
    res.status(200).json({
      message: "Book found successfully",
      book: book,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addBook = (req, res) => {
  const { name, description, publishDate, price } = req.body; 
  console.log("inside the controller");


  const newBook = new Book({
    name: name,
    description: description,
    date: new Date(publishDate), 
    price: price,
  });

  console.log("newBook:", newBook);

  // Save the new book to the database
  newBook
    .save()
    .then((savedBook) => {
      console.log("Book saved successfully:", savedBook);

      res
        .status(201)
        .json({ message: "Book added successfully", book: savedBook });
    })
    .catch((error) => {
      console.error("Error saving book:", error);
      res.status(500).json({ error: error.message });
    });
};

export const editBook = async (req, res) => {
  try {
    const id = req.params.id;
K
    const { name, description, publishDate, price } = req.body; // Get updated book details from request body
    //   console.log(publishDate,"------------------------");
    let parsedPublishDate; // Declare parsedPublishDate variable
    // Check if publishDate is not a string (e.g., already a Date object)
    if (typeof publishDate !== 'string') {
      parsedPublishDate = publishDate; // Use the provided Date object
    } else {
      parsedPublishDate = new Date(publishDate); // Convert publishDate string to Date object
    }
    // console.log(parsedPublishDate,"------------------");
    // Update book details in the database using findByIdAndUpdate
    const updatedBook = await Book.findByIdAndUpdate(
      id, // Filter to find book by id
      { name, description, date: parsedPublishDate, price }, // Updated book details with parsed publishDate
      { new: true } // Return the updated document
    );

    if (!updatedBook) {
      // If book with the provided ID is not found, send a 404 response
      return res.status(404).json({ error: "Book not found" });
    }

    // If the book is updated successfully, send a success response with the updated book
    res.status(200).json({ message: "Book edited successfully", updatedBook });
  } catch (error) {
    console.log(error);
    // If an error occurs, send an error response
    res.status(500).json({ error: "Internal server error" });
  }
};
