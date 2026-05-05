import { Link } from "react-router-dom";
import './navbar.css'
import { Crown } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      {/* 👇 Click this → goes to "/" */}
      <Link to="/" className="brand-title">
        <Crown size={24} /> GlitZora
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
      </div>

    </nav>
  );
}

export default Navbar;