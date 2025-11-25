import React from 'react';
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div>
      <Navbar />

      {/* Home section should be the top section */}
      <section id="home">
        <Home />
      </section>
    <Footer/>
    </div>
  );
};

export default App;
