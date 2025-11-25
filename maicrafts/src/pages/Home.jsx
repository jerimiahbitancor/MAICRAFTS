import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";

const products = [
  { img: "/flower1.svg", title: "Eternal Rose Bouquet" },
  { img: "/crochet1.svg", title: "Handmade Crochet Bunny" },
  { img: "/flower2.svg", title: "Luxury Preserved Roses" },
];

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="circular-gradient-bg"></div>

        <div className="container hero-content py-5">
          <div className="row justify-content-center">
            <div className="header-section col-lg-10 col-xl-8">
              <h1 className="featured-title display-4 display-sm-3 display-md-2 display-lg-1 fw-bold mb-4 lh-1">
                Your Vision
                <br />
                <span className="text-accent">Artfully Made</span>
              </h1>

              <p className="featured-desc lead mb-5 fs-5 fs-md-4 col-12 col-md-10 col-lg-8 mx-auto opacity-90">
                Let us help you create a gift as unique as your love
              </p>

             <div className="cta-container">
  <a href="#products" className="btn-primary-custom">
    Explore Products
  </a>

  <a href="/about" className="btn-outline-custom">
    Learn Our Story
  </a>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="featured-prod py-5 py-md-7">
        <div className="container">
          <div className="section-title mb-5 mb-md-6">
            <h2 className="prod-title display-5 text-center m-0">
              Featured Products
            </h2>
          </div>

  <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <div className="product-card">
                <div className="img-wrapper">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="transition-scale"
                    loading="lazy"
                  />
                  <div className="img-overlay"></div>
                  <div className="product-info">
                    <h5 className="product-title">{product.title}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* Dots Indicator */}
          <div className="text-center mt-5">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
     
    </>
  );
};

export default Home;
