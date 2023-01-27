import "./SingleOrganization.css";

export interface SingleOrganizationProps {
  organization: string;
  allRepos: Array<object>;
  biggestRepo: {
    name: string;
  };
}

function SingleOrganization({ organization, allRepos, biggestRepo }: SingleOrganizationProps) {
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
