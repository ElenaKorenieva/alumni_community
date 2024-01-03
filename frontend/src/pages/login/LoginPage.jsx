import React, { useState } from "react";
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(`Login with email address: ${email} and password: ${password}`); //authentication
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>ALUMNI COMMUNITY</h1>
        <h2>The journey continues!</h2>
        <h2>Be part of the alumni community and stay connected.</h2>
        <div className="container mb-2">
          <div className="row align-items-center">
            <div className="col">
              <div className="row">
                <img
                  src="/images/logo-b.png"
                  alt="Matrix Master logo"
                  className="image-logo"
                />
              </div>
            </div>
            <div className="col mt-3">
              <div className="row">
                <div className="col">
                  <form className="form-text">
                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        className="form-control custom-input"
                        id="email"
                        placeholder="Type Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        className="form-control custom-input"
                        id="password"
                        placeholder="Type Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleLogin}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Login
                    </button>
                  </form>
                  <div className="row mt-3">
                    <div className="col">
                      Don't have an account? <a href="/signup">Sign Up</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
