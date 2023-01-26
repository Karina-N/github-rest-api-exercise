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
  const [repos, setRepos] = useState(0);
  // const [biggestRepo, setBiggestRepo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function getNumberOfRepos(url) {
    setIsLoading(true);
    let numOfReposInFullPages = 0;
    let totalPages = 0;

    octokit
      .request(`GET ${url}`, { per_page: 100, rel: "last" })
      .then((res) => {
        /* if there is 100 items per page, find the count of total pages */
        if (res.data.length === 100) {
          const linkHeader = res.headers.link;

          // example of linkHeader format:
          // github.com/orgs/rel=last&page=2>; rel="next", github.com/orgs/rel=last&page=5>; rel="last"

          let totalPages = linkHeader.split(" ")[2].split("rel=last&page=")[1].split(">")[0];
          numOfReposInFullPages = 100 * (totalPages - 1);
        }
        return octokit.request(`GET /orgs/${organization}/repos`, { per_page: 100, page: totalPages });
      })
      .then((res) => {
        setIsLoading(false);
        let totalNumOfRepos = numOfReposInFullPages + res.data.length;
        setRepos(totalNumOfRepos);
      })
      .catch((err) => console.log(err));

    setSearchInput("");
  }

  // const getBiggestRepo = (repoList) => {
  //   let biggestRepoSize = Math.max(...repoList.map((r) => r.size));
  //   let biggestRepository = repoList.find((r) => r.size === biggestRepoSize);
  //   setBiggestRepo(biggestRepository);
  // };

  useEffect(() => {
    if (organization) {
      getNumberOfRepos(`/orgs/${organization}/repos`);
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
      {repos > 0 && <SingleOrganization organization={organization} allRepos={repos} />}
    </div>
  );
}

export default SearchOrganization;
