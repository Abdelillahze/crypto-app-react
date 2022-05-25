import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coins from "./pages/Coins";
import Header from "./components/Header";
import Home from "./pages/Home";
import Coin from "./pages/Coin";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/coins/:coin" element={<Coin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
