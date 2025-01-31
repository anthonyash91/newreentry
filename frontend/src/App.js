import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Course from "./pages/Course";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:useLanguage" element={<Home />} />
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </div>
    </div>
  );
}
