import "./App.css";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  const [owner, setOwner] = useState("octokit");
  const [repos, setRepos] = useState([]);

  const getAllRepos = (owner) => {
    octokit
      .request(`GET /orgs/${owner}/repos`, {})
      .then((result) => {
        setRepos(result.data);
      })
      .catch((error) => console.log(error.status));
  };

  const getBiggestRepo = () => {
    let biggestRepoSize = Math.max(...repos.map((r) => r.size));
    let biggestRepo = repos.find((r) => r.size === biggestRepoSize);
    return biggestRepo.name;
  };

  useEffect(() => {
    getAllRepos(owner);
  }, []);

  return (
    <div className="App">
      <h3>All {owner} repos: </h3>
      <p>number of repos: {repos.length}</p>
      {repos.length > 0 && (
        <p>
          The biggest repository of {owner}: is {getBiggestRepo()}
        </p>
      )}
    </div>
  );
}

export default App;
