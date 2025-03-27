import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetBookById = () => {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  // Fetch book details by ID
  const fetchBookById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/library/getbookbyid/${bookId}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
      alert("Book not found! Please enter a valid Book ID.");
      setBook(null);
    }
  };

  // Handle book deletion
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/library/delete/${id}`);
      alert("Book deleted successfully!");
      setBook(null); // Clear book details after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  return (
    <div className="container">
      <h2>Get Book Details by ID</h2>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
      />
      <button onClick={fetchBookById}>Search</button>

      {book && (
        <div className="book-details">
          <h3>Book Details:</h3>
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Availability:</strong> {book.availability ? "Available" : "Not Available"}
          </p>

          <button onClick={() => navigate(`/update/${book.id}`)}>Update</button>
          <button onClick={() => deleteBook(book.id)} style={{ marginLeft: "10px", color: "red" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default GetBookById;
