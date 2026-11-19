
import React, { useState } from "react";

function PasswordInput({ label, name, value, onChange, placeholder }) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">

      <label htmlFor={name}>{label}</label>

      <div className="password-wrapper">

        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>

      </div>

    </div>
  );
}

export default PasswordInput;
