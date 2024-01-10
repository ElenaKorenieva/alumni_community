import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../../shared/images/sprite.svg";
import eyeHide from "../../shared/images/eye-hide.svg";
import { getUserData } from "../../redux/auth/authSelectors";
import { updateUser } from "../../redux/auth/authOperations";
import "./EditUser.css";
import validation from "./Validation";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

function EditUser({ onClose }) {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [userName, setUserName] = useState(userData.name);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [gitHub, setGitHub] = useState(
    userData.gitHub
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorAPI, setErrorAPI] = useState("");

  const onPasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let gitHubLink = "";
    if (e.target.elements.gitHub.value === "") {
      gitHubLink = "none";
    } else {
      gitHubLink = e.target.elements.gitHub.value;
    }
    const userForValidation = {
      name: e.target.elements.name.value || userName,
      email: e.target.elements.email.value || userEmail,
      password: e.target.elements.password.value,
      gitHub: gitHubLink,
    };

    if (Object.values(validation(userForValidation)).length !== 0) {
      setErrorAPI("");
      setErrors(validation(userForValidation));
    } else {
      const { name, email, password, gitHub } = e.target.elements;
      const newUserData = {
        name: name.value || userData.name,
        email: email.value || userData.email,
        gitHub: gitHub.value || userData.gitHub,
      };

      if (password.value) {
        newUserData.password = password.value;
      }

      if (imageFile) {
        newUserData.avatar = imageFile;
      }

      dispatch(updateUser(newUserData));
      onClose();
    }
  };

  return (
    <>

      <Form onSubmit={formSubmit}>
        <div className="wrapper mt-5 mx-auto">
          <div className="avatar-wrapper">
            {!imageUrl && !userData.avatarURL ? (
              <svg className="icon-user">
                <use href={`${sprite}#icon-user`}></use>
              </svg>
            ) : (
              <img
                className="avatar-img"
                src={imageUrl || userData.avatarURL}
                alt="avatar"
                width={68}
                height={68}
              />
            )}

            <Form.Group controlId="file" className="file-wrapper">
              <Form.Label className="file-input-label">+</Form.Label>
              <Form.Control
                className="file-input edit-input"
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif"
              />
            </Form.Group>
          </div>

          <div className="inputs edit-input">
            <Form.Group controlId="name">
              <Form.Control
                autoFocus
                name="name"
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrorAPI("");
                }}
              />
              {errors.name && userName === "" && (
                <p className="errorText">{errors.name}</p>
              )}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setErrorAPI("");
                }}
              />
              {errors.email && userEmail === "" && (
                <p className="errorText">{errors.email}</p>
              )}
            </Form.Group>

            <Form.Group controlId="gitHub">
              <Form.Control
                name="gitHub"
                type="text"
                placeholder="Enter your GitHub username"
                value={gitHub}
                onChange={(e) => {
                  setGitHub(e.target.value);
                  setErrorAPI("");
                }}
              />
            </Form.Group>

            <Form.Group controlId="password" className="password-input">
              <Form.Control
                className="password-input-field"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorAPI("");
                }}
              />
              <Form.Text className="errorText" name="password" component="div" />
              <span className="password-view" onClick={onPasswordVisible}>
                {showPassword ? (
                  <img
                    className="password-icon"
                    src={eyeHide}
                    alt="eye-icon"
                  />
                ) : (
                  <svg className="svg-icon">
                    <use stroke="white" href={`${sprite}#icon-eye`} />
                  </svg>
                )}
              </span>
              {errors.password && password === "" && (
                <p className="errorText">{errors.password}</p>
              )}
            </Form.Group>
          </div>

          {errorAPI && Object.values(errors).length === 0 && (
            <p className="errorText">{errorAPI}</p>
          )}

          <Button className="send-btn" type="submit">
            Send
          </Button>
        </div>
      </Form>
    </>
  );
}

export default EditUser;
