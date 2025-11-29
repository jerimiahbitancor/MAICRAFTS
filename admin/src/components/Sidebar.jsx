import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 position-fixed d-flex flex-column" style={{ width: '280px', top: 0, left: 0, zIndex: 1000 }}>
      <div className="p-4 text-center border-bottom border-secondary">
        <h3 className="mb-0 text-warning">
          <i className="bi bi-flower1 me-2"></i>Bloom Admin
        </h3>
        <small className="text-muted">Flower Shop Panel</small>
      </div>

      <nav className="flex-grow-1 px-3 py-4">
        <ul className="nav flex-column gap-2">
          <li>
            <NavLink to="/" className="nav-link text-white px-3 py-3 rounded-3 d-flex align-items-center gap-3" 
              style={({ isActive }) => ({ background: isActive ? '#4a5568' : 'transparent' })}>
              <i className="bi bi-speedometer2 fs-4"></i>
              <span className="fs-5">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="nav-link text-white px-3 py-3 rounded-3 d-flex align-items-center gap-3"
              style={({ isActive }) => ({ background: isActive ? '#4a5568' : 'transparent' })}>
              <i className="bi bi-flower2 fs-4"></i>
              <span className="fs-5">Products</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-top border-secondary">
        <div className="text-center text-muted small">
          © 2025 Bloom Shop
        </div>
      </div>
    </div>
  )
}