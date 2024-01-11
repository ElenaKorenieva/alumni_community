import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import sprite from "../../shared/images/sprite.svg";
import eyeHide from "../../shared/images/eye-hide.svg";
import {
  avatarURL,
  getError,
  getUserData,
  isRefreshing,
} from "../../redux/auth/authSelectors";
import { updateUser } from "../../redux/auth/authOperations";
import validation from "./Validation";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import "./EditProfileUser.css";

function EditProfileUser() {
  const dispatch = useDispatch();
  let isRefresh = useSelector(isRefreshing);
  const imgURL = useSelector(avatarURL);
  const userData = useSelector(getUserData);
  const errorFromState = useSelector(getError);
  let emptyGitHubLink = userData.gitHub;
  if (userData.gitHub === "none") {
    emptyGitHubLink = "";
  }

  const [imageUrl, setImageUrl] = useState(imgURL || null);
  const [imageFile, setImageFile] = useState(null);
  const [userName, setUserName] = useState(userData.name);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [gitHub, setGitHub] = useState(emptyGitHubLink);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorAPI, setErrorAPI] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
    } else {
      setImageUrl(imgURL);
    }
  }, [imageFile, imgURL]);

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
      const newUserData = {
        name: userName,
        email: userEmail,
        gitHub: gitHub || "none",
      };

      if (password) {
        newUserData.password = password;
      }

      if (imageFile) {
        newUserData.avatar = imageFile;
      }

      dispatch(updateUser(newUserData));
      console.log(errorFromState);
      if (errorFromState) {
        setShowToastError(true);
        setToastMessage(errorFromState);
        console.log(toastMessage);
      } else {
        setShowToast(true);
        setToastMessage("User profile data is updated successfully!");
        console.log(toastMessage);
      }
    }
  };

  console.log(showToast);
  console.log(toastMessage);

  return (
    <>
      <Form onSubmit={formSubmit} className="user-form mx-auto">
        <div className="wrapper mt-5 ">
          <div className="avatar-user-wrapper">
            {!imageUrl && !userData.avatarURL ? (
              <svg className="icon-user-svg">
                <use href={`${sprite}#icon-user`}></use>
              </svg>
            ) : (
              <img
                className="avatar-user-img"
                src={imageUrl || userData.avatarURL}
                alt="avatar"
                width={68}
                height={68}
              />
            )}

            {/* <label className="fw">
              <input
                className="file-input"
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif"
              />
              +
            </label> */}

            <FormLabel className="file-user-wrapper">
              <Form.Control
                className="file-input edit-input"
                id="custom-file"
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif"
              />
              +
            </FormLabel>
          </div>

          <div className="inputs">
            <FormGroup>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl
                autoFocus
                name="name"
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrorAPI("");
                }}
              />
              {errors.name && userName === "" && (
                <p className="errorText">{errors.name}</p>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl
                name="email"
                type="email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setErrorAPI("");
                }}
              />
              {errors.email && userEmail === "" && (
                <p className="errorText">{errors.email}</p>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="gitHub">GitHub</FormLabel>
              <FormControl
                name="gitHub"
                type="text"
                placeholder="Add your GitHub link"
                value={gitHub}
                onChange={(e) => {
                  setGitHub(e.target.value);
                  setErrorAPI("");
                }}
              />
            </FormGroup>

            <FormGroup className="password-input">
              <FormLabel htmlFor="password">Enter new password</FormLabel>
              <FormControl
                className="password-input-field"
                name="password"
                minLength="8"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorAPI("");
                }}
              />
              <p className="errorText" name="password" component="div" />
              <FormText
                className="password-view password-view-edit-profile"
                onClick={onPasswordVisible}
              >
                {showPassword ? (
                  <img className="password-icon" src={eyeHide} alt="eye-icon" />
                ) : (
                  <svg className="svg-icon">
                    <use stroke="white" href={`${sprite}#icon-eye`} />
                  </svg>
                )}
              </FormText>
              {errors.password && password === "" && (
                <p className="errorText">{errors.password}</p>
              )}
            </FormGroup>
          </div>
          {errorAPI && Object.values(errors).length === 0 && (
            <p className="errorText">{errorAPI}</p>
          )}
          <Button className="send-btn" type="submit">
            Send
          </Button>
        </div>
      </Form>
      <Toast
        show={!isRefresh && showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: 200,
          backgroundColor: showToastError ? "#dc3545" : "#28a745",
          color: "#fff",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default EditProfileUser;
