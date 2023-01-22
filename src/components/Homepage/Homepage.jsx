import "./Homepage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    navigate("/search-organization", { state: searchInput });
  };

  return (
    <div className="homepageContainer">
      <div className="box left">
        <p>Looking for specific organization?</p>
        <div className="clickBox" to="/search-organization">
          <form>
            <input
              className="searchInput"
              name="searchInput"
              type="text"
              placeholder="Type organization"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleForm}>
              <img className="fingerIcon" src="/media/fingerIcon.png" alt="finger icon" />
            </button>
          </form>
        </div>
      </div>

      <div className="box right">
        <p>Ever wonder how many organizations are there on github?</p>
        <Link className="clickBox counter" to="/organizations-counter">
          <p>Click to find out</p>
          <img className="fingerIcon" src="/media/fingerIcon.png" alt="finger icon" />
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
