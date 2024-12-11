import "./App.css";
import BookPage from "./BookPage";
import Home from "./Home";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [hash, setHash] = useState('');

  const fetchHash = async () => {
    console.log('Botão Verificar Hash clicado'); // Log para depuração
    try {
      const response = await fetch('http://localhost:5000/hash-csv');
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Hash recebido:', data.hash_sha256); // Log para depuração
      setHash(data.hash_sha256);
    } catch (error) {
      console.error('Erro ao buscar o hash:', error);
      setHash('Erro ao buscar o hash.');
    }
  };
  

  

  return (
    <Router>
      <div className="nav">
        <Link className="tab-link" to="/">
          Home
        </Link>
        <Link className="tab-link" to="/Livros">
          Livros
        </Link>
        <button onClick={fetchHash} className="tab-link">
          Verificar Hash
        </button>

      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Livros" element={<BookPage />}></Route>
      </Routes>
      {hash && (
        <div className="hash-display">
          <h3>Hash SHA256 do arquivo CSV:</h3>
          <p>{hash}</p>
        </div>
      )}
    </Router>
  );
}

export default App;
