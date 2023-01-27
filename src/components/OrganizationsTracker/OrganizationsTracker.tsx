import "./OrganizationsTracker.css";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

export interface SearchOrganizationProps {
  octokit: {
    [key: string]: any;
  };
}

export interface responseType {
  res: {
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
}

function OrganizationsTracker({ octokit }: SearchOrganizationProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [organizationsCount, setOrganizationsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNumberOfOrganizations = () => {
    setIsLoading(true);
    octokit
      .request("GET /search/users?q=type%3Aorg", {})
      .then((res: responseType) => {
        setIsLoading(false);
        setOrganizationsCount(res.data.total_count);
      })
      .catch((error: any) => {
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
