
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    sessionStorage.getItem("srtmsUser") || "null"
  );

  const handleLogout = () => {
    sessionStorage.removeItem("srtmsUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <h2>
        Welcome, {user?.name || "User"}!
      </h2>

      <p>
        You have successfully logged in as USER.
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;
