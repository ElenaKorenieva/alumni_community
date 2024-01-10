import React, { useEffect } from "react";
import "./HomePage.css";
import Home from "../../components/Home/Home";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getImageFromGitHub } from "../../redux/auth/authOperations";
import { avatarURL, gitHubURL, isLogin } from "../../redux/auth/authSelectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const gitHubUserLink = useSelector(gitHubURL) || "";
  const avatarUserLink = useSelector(avatarURL);
  const isAuth = useSelector(isLogin);
  let userName = "";
  if (
    gitHubUserLink !== "none" ||
    gitHubUserLink !== "" ||
    gitHubUserLink !== undefined
  ) {
    const splittedUserName = gitHubUserLink.split("/");
    userName = splittedUserName[3];
  }

  console.log(!avatarUserLink && isAuth && userName && isAuth);
  useEffect(() => {
    if (!avatarUserLink && isAuth && userName && isAuth)
      dispatch(getImageFromGitHub(userName));
  }, [avatarUserLink, dispatch, gitHubUserLink, isAuth, userName]);

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideBarMenu />
        </div>
        <div className="col-md-9">
          <div className="row pb-5">
            <div className="col-13 pb-5">
              <Home />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
