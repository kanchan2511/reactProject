import { NavLink } from 'react-router-dom';
import './Navbar.css'
export default function Navbar () {
    return (
       <nav className="nav">
      <div className="nav_brand">
        Barabari</div>
      <div className="nav_links">
        <NavLink to="/careers" className={({ isActive }) => (isActive ? "link link--active" : "link")}>
          Careers
        </NavLink>
      </div>
    </nav>
    )
}
