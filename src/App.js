import "./App.css";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  const [organization, setOrganization] = useState("octokit");
  const [repos, setRepos] = useState([]);
  const [biggestRepo, setBiggestRepo] = useState("");

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
    console.log(repoList);
    let biggestRepoSize = Math.max(...repoList.map((r) => r.size));
    let biggestRepository = repoList.find((r) => r.size === biggestRepoSize);
    setBiggestRepo(biggestRepository);
  };

  useEffect(() => {
    getAllRepos();
  }, []);

  console.log(biggestRepo);

  return (
    <div className="App">
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
