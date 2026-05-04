import { useState } from "react";
import './LoginForm.css';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);

  function handlePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div>
        <input type="text" placeholder="Email" className="input-email" />
      </div>
      <div>
        <input
          type={showPassword ? "password" : "text"}
          placeholder="Password"
          className="input-password"
        />
        <button className="show-button" onClick={handlePassword}>
          {showPassword ? "Show" : "Hide"}
        </button>
      </div>
      <button className="login-button">Login</button>
      <button className="sign-up-button">Sign Up</button>
    </>
  );
}

export default LoginForm;