import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const [book, setBook] = useState({
    bookId: "",
    title: "",
    author: "",
    genre: "",
    availability: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/library/add", book);
      alert("Book added successfully! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input name="bookId" placeholder="Book ID" value={book.bookId} onChange={handleChange} className="border p-2 w-full" required />
      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} className="border p-2 w-full" required />
      <input name="author" placeholder="Author" value={book.author} onChange={handleChange} className="border p-2 w-full" required />
      <input name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Book</button>
    </form>
  );
}

export default AddBook;