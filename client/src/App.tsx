// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Home } from "./Pages/Home";
import { Mentor } from "./Pages/Mentor";
import { SignUp } from "./Pages/SignUp";
import { Resources } from "./Pages/Resources";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
