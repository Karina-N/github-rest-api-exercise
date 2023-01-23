import "./App.css";
import { Octokit } from "octokit";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import OrganizationsTracker from "./components/OrganizationsTracker/OrganizationsTracker";
import SearchOrganization from "./components/SearchOrganization/SearchOrganization";
import Homepage from "./components/Homepage/Homepage";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <Link className="navbarLink left" to="/">
          <img className="octocatGifIcon" src="/media/octocat.gif" alt="octocat gif" />
        </Link>
        <Link className="navbarLink right" to="/search-organization">
          SEARCH ORGANIZATION
        </Link>
        <Link className="navbarLink right" to="/organizations-counter">
          ORGANIZATIONS COUNTER
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search-organization" element={<SearchOrganization octokit={octokit} />} />
        <Route path="/organizations-counter" element={<OrganizationsTracker octokit={octokit} />} />
      </Routes>
    </div>
  );
}

export default App;
