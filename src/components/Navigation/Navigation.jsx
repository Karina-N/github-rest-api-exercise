import { Link } from "react-router-dom";
import "./Navigation.css";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  return (
    <nav className="navbar">
      <Link className="navbarLink left" to="/">
        <img className="octocatGifIcon" src="/media/octocat.gif" alt="octocat gif" />
      </Link>

      <div className="navbarDesktop">
        <Link className="navbarLink right" to="/search-organization">
          SEARCH ORGANIZATION
        </Link>
        <Link className="navbarLink right" to="/organizations-counter">
          ORGANIZATIONS COUNTER
        </Link>
      </div>

      <NavDropdown className="navbarMobile" id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/search-organization">
          SEARCH ORGANIZATION
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/organizations-counter">
          ORGANIZATIONS COUNTER
        </NavDropdown.Item>
      </NavDropdown>
    </nav>
  );
}

export default Navigation;
