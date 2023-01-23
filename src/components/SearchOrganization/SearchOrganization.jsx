import "./SearchOrganization.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import SingleOrganization from "../SingleOrganization/SingleOrganization";

function SearchOrganization(props) {
  const { octokit } = props;
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [organization, setOrganization] = useState(location.state);
  const [repos, setRepos] = useState([]);
  const [biggestRepo, setBiggestRepo] = useState("");
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

  useEffect(() => {
    if (organization) {
      getAllRepos();
    }
  }, [organization]);

  const handleSubmit = (e) => {
    setRepos([]);
    setErrorMessage("");
    e.preventDefault();
    setOrganization(e.target.elements.searchInput.value);
  };
  return (
    <div className="searchOrganizationContainer">
      <p>Check how many repositories does a github organization have:</p>
      <form onSubmit={handleSubmit}>
        <input
          className="searchInput"
          name="searchInput"
          type="text"
          placeholder="Type organization"
          value={searchInput}
          required
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input className="button" type="submit" value="Submit" />
      </form>
      {isLoading && <Loader />}

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {repos.length > 0 && (
        <SingleOrganization organization={organization} allRepos={repos} biggestRepo={biggestRepo} />
      )}
    </div>
  );
}

export default SearchOrganization;
