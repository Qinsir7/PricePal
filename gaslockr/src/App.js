import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
      </Router>
    </div>
  );
}

export default App;
