// maicrafts/src/pages/About.jsx
import "../css/About.css";
import FloatingCart from "../components/FloatingCart.jsx";

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

   <div className="arch-overlay">
    <span>Maicrafts</span>
  </div>
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
MaiCrafts aims to build a strong presence in online marketplaces and social media, while gaining loyal customers through quality products and good service. The business also plans to introduce at least five new handcrafted product designs within the next two years. For the long term, the company envisions opening a physical shop or showroom where customers can personally see and purchase its products. Also, this seeks to explore new types of handmade items, collaborate with local artists and suppliers to support sustainable craftsmanship, and establish itself as a trusted brand for handmade goods in the Philippines.
        </p>
        <div className="work-gallery">
          {/* Placeholder for images or projects */}
        </div>
      </section>
            <FloatingCart />

    </>
  );
};

export default About;
