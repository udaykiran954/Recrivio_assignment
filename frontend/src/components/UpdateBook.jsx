import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateBook() {
  const [book, setBook] = useState({
    bookId: "",
    title: "",
    author: "",
    genre: "",
    availability: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/library/getbookbyid/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/library/update/${id}`, book);
      navigate("/");
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input name="bookId" placeholder="Book ID" value={book.bookId} onChange={handleChange} className="border p-2 w-full" required disabled />
      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} className="border p-2 w-full" required />
      <input name="author" placeholder="Author" value={book.author} onChange={handleChange} className="border p-2 w-full" required />
      <input name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Book</button>
    </form>
  );
}

export default UpdateBook;
