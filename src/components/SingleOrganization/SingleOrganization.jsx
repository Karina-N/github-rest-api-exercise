import "./SingleOrganization.css";

function SingleOrganization(props) {
  const { organization, allRepos } = props;
  
  return (
    <div className="singleOrganizationContainer">
      {allRepos > 0 && (
        <>
          <p>
            Organization: <strong>{organization}</strong>
          </p>
          <p>Total repositories: {allRepos}</p>
        </>
      )}
    </div>
  );
}

export default SingleOrganization;
