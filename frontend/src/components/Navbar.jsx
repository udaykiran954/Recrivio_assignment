import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 rounded-lg mb-6">
      <div className="flex justify-center space-x-4">
        <Link to="/all" className="hover:bg-gray-700 px-3 py-2 rounded">
          📚 View All Books
        </Link>
        <Link to="/add" className="hover:bg-gray-700 px-3 py-2 rounded">
          ➕ Add Book
        </Link>
        <Link to="/getbookbyid" className="hover:bg-gray-700 px-3 py-2 rounded">
          🔍 Get Book by ID
        </Link>
        <Link to="/searchbytitle" className="hover:bg-gray-700 px-3 py-2 rounded">
          🔎 Search by Title
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
