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
      <Link to="/">
        <img className="octocatGif" src="/media/octocat.gif" alt="octocat gif" />
      </Link>

      <div className="menu">
        <Link className="menuLink" to="/search-organization">
          Search Organization
        </Link>
        <Link className="menuLink" to="/organizations-counter">
          Organizations Counter
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search-organization" element={<SearchOrganization octokit={octokit} />} />
        <Route path="/organizations-counter" element={<OrganizationsTracker octokit={octokit} />} />
      </Routes>
    </div>
  );
}

export default App;
