import "./SingleOrganization.css";

function SingleOrganization(props) {
  const { organization, allRepos, biggestRepo } = props;
  return (
    <div className="singleOrganizationContainer">
      {allRepos.length > 0 && (
        <>
          <p>
            Organization: <strong>{organization}</strong>
          </p>
          <p>Total repositories: {allRepos.length}</p>
          <p>The biggest repository: {biggestRepo.name}</p>
        </>
      )}
    </div>
  );
}

export default SingleOrganization;
