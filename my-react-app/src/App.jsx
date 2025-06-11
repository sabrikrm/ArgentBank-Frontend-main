import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div className="page-wrapper">
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
