import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Octokit } from "octokit";
import { Route, Routes } from "react-router";

import Navigation from "./components/Navigation/Navigation";
import Homepage from "./components/Homepage/Homepage";
import SearchOrganization from "./components/SearchOrganization/SearchOrganization";
import OrganizationsTracker from "./components/OrganizationsTracker/OrganizationsTracker";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search-organization" element={<SearchOrganization octokit={octokit} />} />
        <Route path="/organizations-counter" element={<OrganizationsTracker octokit={octokit} />} />
      </Routes>
    </div>
  );
}

export default App;
