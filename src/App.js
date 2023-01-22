import "./App.css";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";

import OrganizationsTracker from "./components/OrganizationsTracker/OrganizationsTracker";
import SingleOrganization from "./components/SingleOrganization/SingleOrganization";
import Loader from "./components/Loader/Loader";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  const [organization, setOrganization] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [repos, setRepos] = useState([]);
  const [biggestRepo, setBiggestRepo] = useState("");
  const [organizationsCount, setOrganizationsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getAllRepos = () => {
    setIsLoading(true);
    octokit
      .paginate(`GET /orgs/${organization}/repos`, {})
      .then((res) => {
        setIsLoading(false);
        setRepos(res);
        return res;
      })
      .then((res) => {
        getBiggestRepo(res);
      })
      .catch((err) => {
        if (err.status) {
          setIsLoading(false);
          setErrorMessage(`Hmm could not find organization with title ${organization}! Try typing again..`);
        }
      });
    setSearchInput("");
  };

  const getBiggestRepo = (repoList) => {
    let biggestRepoSize = Math.max(...repoList.map((r) => r.size));
    let biggestRepository = repoList.find((r) => r.size === biggestRepoSize);
    setBiggestRepo(biggestRepository);
  };

  const getNumberOfOrganizations = () => {
    octokit
      .request("GET /search/users?q=type%3Aorg", {})
      .then((result) => {
        setOrganizationsCount(result.data.total_count);
      })
      .catch((error) => console.log(error.status));
  };

  useEffect(() => {
    if (organization) {
      getAllRepos();
    }
  }, [organization]);

  useEffect(() => {
    getNumberOfOrganizations();
  }, []);

  const handleSubmit = (e) => {
    setRepos([]);
    setErrorMessage("");
    e.preventDefault();
    setOrganization(e.target.elements.searchInput.value);
  };

  return (
    <div className="App">
      <img className="octocatGif" src="/media/octocat.gif" alt="octocat gif" />

      <p>Check how many repositories does a github organization have:</p>

      <form onSubmit={handleSubmit}>
        <input
          className="searchInput"
          name="searchInput"
          type="text"
          placeholder="Type organization"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input className="button" type="submit" value="Submit" />
      </form>
      {isLoading && <Loader />}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {repos.length > 0 && (
        <SingleOrganization organization={organization} allRepos={repos} biggestRepo={biggestRepo} />
      )}

      {/* <OrganizationsTracker counter={organizationsCount} updateCounter={getNumberOfOrganizations} /> */}
    </div>
  );
}

export default App;
