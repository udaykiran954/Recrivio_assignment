import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBookByTitle = () => {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const searchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/library/getbook/${title}`);
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('No books found with this title.');
      setBooks([]);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/library/delete/${id}`);
      alert('Book deleted successfully!');
      searchBooks();
    } catch (err) {
      alert('Error deleting book.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Books by Title</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={searchBooks}>Search</button>

      {error && <div className="alert alert-danger">{error}</div>}
      {books.length > 0 && (
        <div className="mt-3">
          {books.map((book) => (
            <div className="card mb-3" key={book.id}>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}<br />
                  <strong>Genre:</strong> {book.genre}<br />
                  <strong>Availability:</strong> {book.availability ? 'Available' : 'Not Available'}
                </p>
                <button className="btn btn-warning me-2" onClick={() => handleUpdate(book.id)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBookByTitle;
