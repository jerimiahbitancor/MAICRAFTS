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
              <p className="hero-desc lead mb-4">
                Order your Custom Gift Now!
              </p>
              <a href="/products" className="btn hero-btn-primary">
                Customize!
              </a>
            </div>
          </div>
        </div>
      </section>

    
    </>
  );
};

export default Products;
