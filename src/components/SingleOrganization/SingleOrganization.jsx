import "./SingleOrganization.css";

function SingleOrganization(props) {
  const { organization, allRepos, biggestRepo, error } = props;
  return (
    <div className="singleOrganizationContainer">
      {error && <p className="errorMessage">{error}</p>}

      {allRepos.length > 0 && (
        <>
          <h3>{organization} info: </h3>
          <p>Total repositories: {allRepos.length}</p>
          <p>The biggest repository: {biggestRepo.name}</p>
        </>
      )}
    </div>
  );
}

export default SingleOrganization;
