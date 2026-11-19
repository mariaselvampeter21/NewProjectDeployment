
import React from "react";

function GoogleLoginButton({ onClick, text = "Continue with Google" }) {

  return (
    <button
      type="button"
      className="google-login-button"
      onClick={onClick}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="google-icon"
      />

      <span>{text}</span>
    </button>
  );
}

export default GoogleLoginButton;
