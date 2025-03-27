import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import GetBookById from "./components/GetBookById";
import SearchBookByTitle from "./components/SearchBookByTitle";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        {/* Include Navbar Component */}
        <Navbar />

        {/* Main Title */}
        <h1 className="text-3xl font-bold text-center mb-6">📚 Library Management System</h1>

        {/* Routes Section */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/all" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/getbookbyid" element={<GetBookById />} />
          <Route path="/searchbytitle" element={<SearchBookByTitle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
