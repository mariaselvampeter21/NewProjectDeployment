
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
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
      <h1>Admin Dashboard</h1>

      <h2>
        Welcome, {user?.name || "Administrator"}!
      </h2>

      <p>
        You have successfully logged in as ADMIN.
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
