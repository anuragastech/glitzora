import { Link } from "react-router-dom";
import './navbar.css'
import { Crown } from "lucide-react";


function Navbar() {
  return (
    <nav className="navbar">
<h2 className="brand-title">
  <Crown size={24} /> GlitZora
</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        {/* <Link to="/admin">Admin</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;