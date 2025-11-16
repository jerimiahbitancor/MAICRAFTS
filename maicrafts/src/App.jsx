import React from 'react';
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div>
      <Navbar />

      {/* Home section should be the top section */}
      <section id="home">
        <Home />
      </section>

    </div>
  );
};

export default App;
