import "../css/About.css";

const About = () => {
  return (
    <>


      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
           To create handcrafted products that are both useful and beautiful. It aims to provide customers with high-quality items that exceed expectations and to offer personalized services so that every order feels special and meaningful. The brand works to promote handmade crafts, to give value to traditional skills, and to support local creativity. At the same time, it strives to use online platforms to reach a wider audience, to share its products, and to build strong connections with customers—all while continuing to deliver quality, personal, and creative handmade products.

          </p>
        </div>

    <div className="center-arch">
  <video 
    src="/maicraftss.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="arch-video"
  />
</div>


        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To become a well-known Filipino name recognized for handmade products that reflect creativity and quality, that fulfill customer needs and expectations. In the future, it envisions expanding its product offerings and establishing a physical shop where people can personally experience and purchase its crafts. The brand is committed to promoting local craftsmanship and inspiring greater appreciation for handmade items.

          </p>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="our-work">
        <h2>Our Work</h2>
        <p>
          We take pride in delivering exceptional results in every project we handle.
        </p>
        <div className="work-gallery">
          {/* Placeholder for images or projects */}
        </div>
      </section>
    </>
  );
};

export default About;
