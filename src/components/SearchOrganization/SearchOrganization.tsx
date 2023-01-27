import "./SearchOrganization.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import SingleOrganization from "../SingleOrganization/SingleOrganization";

export interface SearchOrganizationProps {
  octokit: {
    [key: string]: any;
  };
}

function SearchOrganization({ octokit }: SearchOrganizationProps) {
  const location = useLocation();

  const [searchInput, setSearchInput] = useState<string>("");
  const [organization, setOrganization] = useState<string>(location.state);
  const [repos, setRepos] = useState<any[]>([]);
  const [biggestRepo, setBiggestRepo] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getAllRepos = () => {
    setIsLoading(true);
    octokit
      .paginate(`GET /orgs/${organization}/repos`, {})
      .then((res: any) => {
        setIsLoading(false);
        setRepos(res);
        return res;
      })
      .then((res: any) => {
        getBiggestRepo(res);
      })
      .catch((err: any) => {
        if (err.status) {
          setIsLoading(false);
          setErrorMessage(`Hmm could not find organization with title ${organization}! Try typing again..`);
        }
      });
    setSearchInput("");
  };

  const getBiggestRepo = (repoList: any) => {
    let biggestRepoSize = Math.max(...repoList.map((r: any) => r.size));
    let biggestRepository = repoList.find((r: any) => r.size === biggestRepoSize);
    setBiggestRepo(biggestRepository);
  };

  useEffect(() => {
    if (organization) {
      getAllRepos();
    }
  }, [organization]);

  const handleSubmit = (e: any) => {
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
