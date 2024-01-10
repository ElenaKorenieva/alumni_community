import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../../shared/images/sprite.svg";
import eyeHide from "../../shared/images/eye-hide.svg";
import { avatarURL, getUserData } from "../../redux/auth/authSelectors";
import { updateUser } from "../../redux/auth/authOperations";
import "./EditProfileUser.css";
import validation from "./Validation";
import { FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

function EditProfileUser() {
  const dispatch = useDispatch();
  const imgURL = useSelector(avatarURL);
  const userData = useSelector(getUserData);

  const [imageUrl, setImageUrl] = useState(imgURL || null);
  const [imageFile, setImageFile] = useState(null);
  const [userName, setUserName] = useState(userData.name);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [gitHub, setGitHub] = useState(userData.gitHub || "none");
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
      // console.log(name, email, password, gitHub);
      const newUserData = {
        name: name.value || userData.name,
        email: email.value || userData.email,
        gitHub: gitHub.value || userData.gitHub,
      };
      // console.log(newUserData);

      if (password.value) {
        newUserData.password = password.value;
      }

      if (imageFile) {
        newUserData.avatar = imageFile;
      }

      dispatch(updateUser(newUserData));
    }
  };

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

            <FormLabel className="file-user-wrapper">
              <Form.Control
                className="file-input edit-input"
                id="custom-file"
                label="+"
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif"
              />
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
    </>
  );
}

export default EditProfileUser;
