import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Profile from "../components/Profile";
type Owner = {
  id: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  phoneNumber: string;
};

const GetAllOwnersPage = () => {
  const [owners, setOwners] = useState<Owner[]>();
  useEffect(() => {
    async function fetchAllOwners() {
      const url: string =
        "http://localhost:8080/api/owner-account-manager/owners";
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiMiIsImV4cCI6MTcyMTIxNzIyMywiaWF0IjoxNzIxMjEzNjIzLCJzY29wZSI6Ik9XTkVSIn0.XcItRwAUqP620zuxrMFJ3Dy5BbVFLXqVi0MC1dE5EyyAzGugjmZq9Zo4dMDzYjEAreonkwOePerRHbSFWYcaQHXlSoirBy2tWeWafk0R3oLcebzvUnS5a1BPDTcwdt4NmXxLA9qsm3Tas_lxGap8m-NFT22ZbzL-ML8K3M5d3HRMXWVOfXbfj5lvc7xJPprMxHqiKQAqyUrNISAaS9lanx89CfV6GYykqZ7ZA7PLB6dyofHOm8qDhrXJgnnx5fuFQVOmKGGxkh7dt-AHJJVkuuhP3zGhkKbRW_bE0sJipVHAEG_zA9Wdqb23f6DoESqWREOh4BjUHKQIaQzxv93J8A",
        },
      };
      const response = await fetch(url, options);
      const jsonRes: Owner[] = await response.json();
      setOwners(jsonRes);
    }
    fetchAllOwners();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {owners?.map((owner) => (
            <Profile profile={owner}></Profile>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetAllOwnersPage;
