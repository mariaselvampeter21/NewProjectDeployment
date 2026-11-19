
import React from "react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h1>SRTMS</h1>
          <p>Student Recruitment & Training Management System</p>
        </div>

        <div className="auth-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="auth-content">
          {children}
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;
