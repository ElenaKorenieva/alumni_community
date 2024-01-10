import React, { useState } from "react";
import "./SignUpPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validation from "./Validation";

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorAPI, setErrorAPI] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetform = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setGithub("");
    setRepeatPassword("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    let gitHubLink = "";
    if (e.target.elements.github.value === "") {
      gitHubLink = "none";
    } else {
      gitHubLink = e.target.elements.github.value;
    }
    const newUser = {
      name: e.target.elements.fullName.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      // gitHub: gitHubLink,
    };

    const newUserForValidation = {
      name: e.target.elements.fullName.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      gitHub: e.target.elements.github.value,
      repeatPassword: e.target.elements.repeatPassword.value,
    };

    if (Object.values(validation(newUserForValidation)).length !== 0) {
      setErrorAPI("");
      setErrors(validation(newUserForValidation));
    } else {
      const response = await dispatch(register(newUser));
      if (response.error) {
        setErrors({});
        setErrorAPI(response.payload);
      } else {
        navigate("/home");
      }
      resetform("");
    }
  };

  return (
    <div className="signup-container">
      <div className="left-column">
        <img src="/images/signup-img.jpg" alt="Logo" className="left-image" />
      </div>
      <div className="right-column">
        <h1 className="text-center">ALUMNI COMMUNITY</h1>
        <img
          src="/images/logo-b.png"
          alt="Matrix Master logo"
          className="image-logo w-50 mx-auto d-block"
        />
        <h2 className="text-center">
          Welcome to the <br /> Matrix Master Alumni Community!
        </h2>
        <h3>Sign Up for the Community:</h3>
        <form onSubmit={handleSignUp}>
          <div className="form-group mb-3">
            <label htmlFor="fullName" className="form-label">
              <span className="asterisk">*</span>Full Name:
            </label>
            <input
              type="text"
              className="form-control custom-input"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrorAPI("");
              }}
            />
            {errors.name && fullName === "" && (
              <p className="error">{errors.name}</p>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              <span className="asterisk">*</span>Email Address:
            </label>
            <input
              type="email"
              className="form-control custom-input"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorAPI("");
              }}
            />
            {errors.email && email === "" && (
              <p className="error">{errors.email}</p>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="github" className="form-label">
              GitHub:
            </label>
            <input
              type="text"
              className="form-control custom-input"
              id="github"
              name="github"
              placeholder="Enter your GitHub link"
              value={github}
              onChange={(e) => {
                setGithub(e.target.value);
                setErrorAPI("");
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              <span className="asterisk">*</span>Password:
            </label>
            <input
              type="password"
              className="form-control custom-input"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorAPI("");
              }}
            />
            {errors.password && password === "" && (
              <p className="error">{errors.password}</p>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="repeatPassword" className="form-label">
              <span className="asterisk">*</span>Repeat Password:
            </label>
            <input
              type="password"
              className="form-control custom-input"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setErrorAPI("");
              }}
            />
            {errors.repeatPassword && repeatPassword === "" && (
              <p className="error">{errors.repeatPassword}</p>
            )}
          </div>
          {errorAPI && Object.values(errors).length === 0 && (
            <p className="error">{errorAPI}</p>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
