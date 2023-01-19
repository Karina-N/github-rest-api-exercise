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

  useEffect(() => {
    getAllRepos(owner);
  }, []);

  return (
    <div className="App">
      <h3>All {owner} repos: </h3>
      <p>number of repos: {repos.length}</p>
    </div>
  );
}

export default App;
