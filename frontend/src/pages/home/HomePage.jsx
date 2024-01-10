import React, { useEffect } from "react";
import "./HomePage.css";
import Home from "../../components/Home/Home";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getImageFromGitHub } from "../../redux/auth/authOperations";
import { avatarURL, gitHubURL } from "../../redux/auth/authSelectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const gitHubUserLink = useSelector(gitHubURL) || "";
  const avatarUserLink = useSelector(avatarURL);

  const links = {
    gitHubURL: gitHubUserLink,
    avatar_url: avatarUserLink,
  };
  console.log(gitHubUserLink);
  console.log(avatarUserLink);

  useEffect(() => {
    // Dispatch the fetchData thunk only on the first render
    dispatch(getImageFromGitHub(links));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
