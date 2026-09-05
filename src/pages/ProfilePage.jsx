import { useAuth } from "../contexts/AuthContext.jsx";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user?.name}</p>
    </div>
  );
}

export default ProfilePage;