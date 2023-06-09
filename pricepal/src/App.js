import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import InsuranceTabs from "./components/InsuranceTabs";
import ClaimsPage from './components/ClaimsPage';
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto mt-10">
              <Home />
            </div>
          } />
          <Route path="/insurance" element={
            <div className="container mx-auto mt-10">
              <InsuranceTabs />
            </div>
          } />
          <Route path="/claims" element={
            <div className="container mx-auto mt-10">
              <ClaimsPage />
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
