import "./OrganizationsTracker.css";
import { useState } from "react";

function OrganizationsTracker(props) {
  const { updateCounter, counter } = props;

  const [currentTime, setCurrentTime] = useState("");

  const handleClick = () => {
    setCurrentTime(new Date().toDateString() + " " + new Date().toLocaleTimeString());
    updateCounter();
  };
  return (
    <div className="organizationsTracker">
      <p>Currently there are {counter} organizations on Github</p>
      <button className="button" onClick={handleClick}>
        Refresh counter
      </button>
      {currentTime && <p className="currentTime">Last updated: {currentTime}</p>}
    </div>
  );
}

export default OrganizationsTracker;
