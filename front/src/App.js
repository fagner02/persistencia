import "./App.css";
import BookPage from "./BookPage";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div className="nav">
        <Link className="tab-link" to="/">
          Home
        </Link>
        <Link className="tab-link" to="/Livros">
          Livros
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Livros" element={<BookPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
