import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../../shared/images/sprite.svg";
import eyeHide from "../../shared/images/eye-hide.svg";
import { avatarURL, getUserData } from "../../redux/auth/authSelectors";
import { updateUser } from "../../redux/auth/authOperations";
import "./EditProfileUser.css";
import validation from "./Validation";

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
      <form onSubmit={formSubmit} className="user-form">
        <div className="wrapper">
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

            <label className="file-user-wrapper">
              <input
                className="file-input"
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif"
              />
              +
            </label>
          </div>

          <div className="inputs">
            <div>
              <input
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
            </div>

            <div>
              <input
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
            </div>
            <div>
              <input
                name="gitHub"
                type="text"
                value={gitHub}
                onChange={(e) => {
                  setGitHub(e.target.value);
                  setErrorAPI("");
                }}
              />
            </div>
            <div className="password-input">
              <input
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
              <span className="password-view" onClick={onPasswordVisible}>
                {showPassword ? (
                  <img className="password-icon" src={eyeHide} alt="eye-icon" />
                ) : (
                  <svg className="svg-icon">
                    <use stroke="white" href={`${sprite}#icon-eye`} />
                  </svg>
                )}
              </span>
              {errors.password && password === "" && (
                <p className="errorText">{errors.password}</p>
              )}
            </div>
          </div>
          {errorAPI && Object.values(errors).length === 0 && (
            <p className="errorText">{errorAPI}</p>
          )}
          <button className="send-user-btn" type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfileUser;
