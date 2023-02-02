import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page & Component Imports
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
import Home from "./Pages/Home";
import Mentors from "./Pages/Mentors";
import SignUp from "./Pages/SignUp";
import Resources from "./Pages/Resources";
import Login from "./Components/Login";

function App() {

  return (
    <div className="App">
    <Header />

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup/:user' element={<SignUp />} />
          <Route path='/mentors' element={<Mentors />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>

    <Footer />
    </div>
  );
}

export default App;
