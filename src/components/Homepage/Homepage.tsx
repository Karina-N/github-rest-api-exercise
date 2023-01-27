import "./Homepage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleForm = (e: any) => {
    e.preventDefault();
    navigate("/search-organization", { state: searchInput });
  };

  return (
    <div className="homepageContainer">
      <div className="octokatContainer">
        <img className="octocatGif" src="/media/octocat.gif" alt="octocat gif" />
      </div>
      <div className="homepageBoxes">
        <div className="box left">
          <p>Looking for specific organization?</p>
          <div className="clickBox" data-to="/search-organization">
            <form>
              <input
                className="searchInput"
                name="searchInput"
                type="text"
                placeholder="Type organization"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button onClick={handleForm}>Search</button>
            </form>
          </div>
        </div>

        <div className="box right">
          <p>Ever wonder how many organizations are there on github?</p>
          <Link className="clickBox counter" to="/organizations-counter">
            <p>Click to find out</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
