// import React from "react";
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
// import Home from '../src/Pages/Home';
// import Mentors from '../src/Pages/Mentors';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

// Pages
import Home from "./Pages/Home";
import Mentors from "./Pages/Mentors";
// import SignUp from "./Pages/SignUp";
// import Resources from "./Pages/Resources";

function App() {

  return (
    <div className="App">
    <Header />

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='signup/:user' element={<SignUp />} /> */}
          <Route path='/mentors' element={<Mentors />} />
          {/* <Route path='/resources' element={<Resources />} /> */}
        </Routes>
      </Router>

    <Footer />
    </div>
  );
}

export default App;
