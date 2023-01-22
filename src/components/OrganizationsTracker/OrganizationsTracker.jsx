import "./OrganizationsTracker.css";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

function OrganizationsTracker(props) {
  const { octokit } = props;

  const [currentTime, setCurrentTime] = useState("");
  const [organizationsCount, setOrganizationsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getNumberOfOrganizations = () => {
    setIsLoading(true);
    octokit
      .request("GET /search/users?q=type%3Aorg", {})
      .then((result) => {
        setIsLoading(false);
        setOrganizationsCount(result.data.total_count);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.status);
      });
  };

  useEffect(() => {
    getNumberOfOrganizations();
  }, []);

  const handleClick = () => {
    setCurrentTime(new Date().toDateString() + " " + new Date().toLocaleTimeString());
    getNumberOfOrganizations();
  };

  return (
    <>
      <div className="organizationsTracker">
        <div className="counterContainer">
          {isLoading ? (
            <>
              <p>Counting...</p>
              <Loader />
            </>
          ) : (
            <p>Currently there are {organizationsCount} organizations on Github</p>
          )}
        </div>

        <button className="button" onClick={handleClick}>
          Refresh counter
        </button>
      </div>
      {currentTime && <p className="currentTime">Last updated: {currentTime}</p>}
    </>
  );
}

export default OrganizationsTracker;
