import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/auth/authOperations";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container mt-5">
      <h3 className="home-title">Hello and welcome!</h3>
      <div className="d-flex align-items-center journey-section">
        <div className="homeArticle-wrapper">
          <h4 className="homeArticle-title">A Journey Beyond Bootcamp</h4>
          <h5>Choose the topic in the left side menu and post now!</h5>
        </div>
        <div className="homeImg-wrapper">
          <img
            src="/images/logo_community.png"
            width="50%"
            alt="Programming"
            className="image-home rounded"
          />
        </div>
      </div>

      <div className="menu-container pt-2">
        <h2 className="menu-title topic-title border-bottom">
          How to use this community:
        </h2>
        <div className="aboutImg-wrapper">
          <img
            src="/images/home_img_howto.png"
            width="80%"
            alt="Programming"
            className="rounded mx-auto"
          />
        </div>
      </div>

      <div className="menu-container pt-2">
        <h2 className="menu-title topic-title border-bottom">
          Check out the latest community posts:
        </h2>
      </div>
    </div>
  );
};

export default Home;
