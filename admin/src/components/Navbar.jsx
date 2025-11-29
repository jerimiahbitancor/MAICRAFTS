export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" style={{ marginLeft: '280px', zIndex: 900 }}>
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold text-success">
          <i className="bi bi-shop"></i> Flower Shop Admin
        </span>
        <div>
          <button className="btn btn-outline-danger btn-sm">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  )
}   