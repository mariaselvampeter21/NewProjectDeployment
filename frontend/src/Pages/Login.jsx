
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import GoogleLoginButton from "../components/GoogleLoginButton";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_USER_API_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      const role = data.role?.toUpperCase();

      if (role !== "ADMIN" && role !== "USER") {
        throw new Error("Invalid user role");
      }

      sessionStorage.setItem("srtmsUser", JSON.stringify(data));

      if (role === "ADMIN") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }

    } catch (err) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login will be connected after OAuth configuration.");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your SRTMS account"
    >
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="auth-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <GoogleLoginButton
        text="Continue with Google"
        onClick={handleGoogleLogin}
      />

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
