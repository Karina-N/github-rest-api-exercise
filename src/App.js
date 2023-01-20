import "./App.css";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  const [organization, setOrganization] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [repos, setRepos] = useState([]);
  const [biggestRepo, setBiggestRepo] = useState("");
  const [organizationsCount, setOrganizationsCount] = useState(0);

  const getAllRepos = () => {
    octokit
      .paginate(`GET /orgs/${organization}/repos`, {})
      .then((res) => {
        setRepos(res);
        return res;
      })
      .then((res) => {
        getBiggestRepo(res);
      })
      .catch((err) => err.status);
  };

  const getBiggestRepo = (repoList) => {
    let biggestRepoSize = Math.max(...repoList.map((r) => r.size));
    let biggestRepository = repoList.find((r) => r.size === biggestRepoSize);
    setBiggestRepo(biggestRepository);
  };

  const getNumberOfOrganizations = () => {
    console.log("i'm in");
    octokit
      .request("GET /search/users?q=type%3Aorg", {})
      .then((result) => {
        console.log(result.data.total_count);
        setOrganizationsCount(result.data.total_count);
      })
      .catch((error) => console.log(error.status));
  };

  useEffect(() => {
    getAllRepos();
    getNumberOfOrganizations();
  }, [organization]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setOrganization(e.target[0].value);
  };

  return (
    <div className="App">
      <p>Currently there are {organizationsCount} organizations on Github</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type organization"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      <h3>All {organization} repos: </h3>

      {repos.length > 0 && (
        <>
          <p>TOTAL REPOS: {repos.length}</p>
          <p>
            The biggest repository of {organization} is: {biggestRepo.name}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
