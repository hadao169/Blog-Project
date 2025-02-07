import React from "react";
import logo from "../../public/blog.png";

const LoginSignUp = ({
  onSubmit,
  errorMessage,
  onChangeUsername,
  onChangePassword,
  username,
  password,
}) => {
  return (
    <div className="login-signup">
      <p className="error">{errorMessage}</p>
      <div className="login-header">
        <img src={logo} className="logo-img" />
        <h2>My Blog App</h2>
      </div>
      <h2>Enter your login credentials</h2>
      <form className="sign-in-form" onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="first"
          placeholder="Enter your Username"
          required
          onChange={onChangeUsername}
          value={username}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your Password"
          required
          onChange={onChangePassword}
          value={password}
        />
        <div className="wrap">
          <button type="submit">Login</button>
        </div>
      </form>
      <p className="register-link">
        Not registered?
        <a href="#" style={{ textDecoration: "none" }}>
          Create an account
        </a>
      </p>
    </div>
  );
};

export default LoginSignUp;
