import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">Maicrafts Admin</div>
      <ul>
        <li><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</Link></li>
        <li><Link to="/users" style={{ color: "inherit", textDecoration: "none" }}>Users</Link></li>
        <li><Link to="/products" style={{ color: "inherit", textDecoration: "none" }}>Products</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
