import React from "react";
// import "./App.css";

import Home from '../src/Pages/Home';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
// import Mentors from '../src/Pages/Mentors';

function App() {
  return <div className="App">

    <Header />

    {/* just here for coding/testing/displaying -- delete later */}
    <Home />
    
    <Footer />

  </div>;
}

export default App;
