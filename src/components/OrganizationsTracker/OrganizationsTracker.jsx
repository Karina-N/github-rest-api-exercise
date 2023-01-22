import "./OrganizationsTracker.css";
import { useState } from "react";

function OrganizationsTracker(props) {
  const [currentTime, setCurrentTime] = useState("");

  const handleClick = () => {
    setCurrentTime(new Date().toDateString() + " " + new Date().toLocaleTimeString());
    props.updateCounter();
  };
  return (
    <div className="organizationsTracker">
      <p>Currently there are {props.counter} organizations on Github</p>
      <button className="button" onClick={handleClick}>
        Refresh counter
      </button>
      {currentTime && <p className="currentTime">Last updated: {currentTime}</p>}
    </div>
  );
}

export default OrganizationsTracker;
