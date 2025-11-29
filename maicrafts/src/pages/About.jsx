// maicrafts/src/pages/About.jsx
import "../css/About.css";

const About = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-wrapper d-flex align-items-center justify-content-center">
        <div className="hero-bg-circle"></div>
        <div className="container hero-inner text-center">
          <div className="row justify-content-end align-items-center">
            <div className="col-md-6 hero-right-content text-md-end text-center">
              {/* You can add hero text or image here */}
              <h1>About Us</h1>
              <p>Learn more about our mission, vision, and work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision d-flex justify-content-center align-items-center">
        <div className="mission">
          <h2>Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
        </div>

        <div className="center-arch">
          {/* Optional center shape or icon */}
        </div>

        <div className="vision">
          <h2>Vision</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="our-work text-center">
        <h2>Our Work</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
        <div className="work-gallery d-flex flex-wrap justify-content-center">
          {/* Placeholder for work images */}
        </div>
      </section>
    </>
  );
};

export default About;
