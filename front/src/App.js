import "./App.css";
import TransactionPage from "./TransactionPage";
import PersonPage from "./BookPage";
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
        <Link className="tab-link" to="/People">
          People
        </Link>
        <Link className="tab-link" to="/Transactions">
          Transactions
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Transactions" element={<TransactionPage />}></Route>
        <Route path="/People" element={<PersonPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
