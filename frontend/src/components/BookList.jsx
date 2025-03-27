import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/library/allbooks");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/library/delete/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Book</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Available: {book.availability ? "Yes" : "No"}</p>
            <div className="mt-2">
              <Link to={`/update/${book.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
              <button onClick={() => deleteBook(book.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
