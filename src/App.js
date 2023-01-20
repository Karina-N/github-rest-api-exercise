import "./App.css";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_MY_TOKEN,
});

function App() {
  const [organization, setOrganization] = useState("octokit");
  const [repos, setRepos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const getReposFromOnePage = () => {
    console.log("getting repos");
    octokit
      .request(`GET /orgs/${organization}/repos`, { per_page: itemsPerPage, page: pageNumber })
      .then((result) => {
        let updatedRepos = repos.concat(result.data);
        setRepos(updatedRepos);
        if (result.data.length >= itemsPerPage) setPageNumber((prev) => prev + 1);
      })
      .catch((error) => console.log(error.status));
  };

  const getAllRepos = () => {
    if (repos.length === 0 || repos.length === itemsPerPage) getReposFromOnePage();
  };

  const getBiggestRepo = () => {
    let biggestRepoSize = Math.max(...repos.map((r) => r.size));
    let biggestRepo = repos.find((r) => r.size === biggestRepoSize);
    return biggestRepo.name;
  };

  useEffect(() => {
    getAllRepos();
  }, [pageNumber]);

  console.log(repos.length);

  return (
    <div className="App">
      <h3>All {organization} repos: </h3>
      <p>number of repos per page: {itemsPerPage}</p>
      <p>TRUE REPOS COUNT: {repos.length}</p>
      {repos.length > 0 && (
        <p>
          The biggest repository of {organization}: is {getBiggestRepo()}
        </p>
      )}
    </div>
  );
}

export default App;
