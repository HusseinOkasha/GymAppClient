interface Profile {
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  phoneNumber: string;
  birthDate?: string;
}
interface ProfileProps {
  profile: Profile;
}

function Profile(props: ProfileProps) {
  const profile: Profile = props.profile;
  const title: string =
    profile.firstName + " " + profile.secondName + " " + profile.thirdName;

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Email:{profile.email}</p>
          <p className="card-text">Phone number: {profile.phoneNumber}</p>
          {profile.birthDate && (
            <p className="card-text">Birth date: {profile.birthDate}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
