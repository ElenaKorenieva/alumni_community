import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/auth/authOperations";
import homeImg from "./images/homeimg.png";
import homeImgRetina from "./images/homeimg2x.png";
import "./Home.css";

const Home = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/");
  // };
  return (
    <div className="home-container">
      <h3 className="home-title">Alumni Community</h3>
      <div className="homeImg-wrapper">
        <picture>
          <source
            srcSet={`${homeImg} 1x, ${homeImgRetina} 2x`}
            width="647"
            media="(min-width: 768px)"
          />
          <img src={homeImg} width="675" alt="Wallet" />
        </picture>
      </div>
      <div className="homeArticle-wrapper">
        <h5 className="homeArticle-title">Why are you here?</h5>
        <p className="homeArticle-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incidi Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incidi Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
        </p>
      </div>
      <div className="homeArticle-wrapper">
        <h5 className="homeArticle-title">How to use this community:</h5>
        <p className="homeArticle-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incidi Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incidi Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
        </p>
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Home;
