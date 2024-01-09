import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/auth/authOperations";
import homeImg from "./images/homeimg.png";
import homeImgRetina from "./images/homeimg2x.png";
import "./Home.css";

const Home = () => {
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
          Welcome to the Alumni Community, a dedicated space designed for the
          vibrant network of Matrix Master bootcamp graduates. Here, we believe
          in the power of connections, shared knowledge, and ongoing growth.
          Whether you're seeking career opportunities, sharing insights, or
          simply connecting with developer professionals, you're here to be a
          part of a dynamic and supportive community that continues to thrive
          beyond the bootcamp experience.
        </p>
      </div>
      <div className="homeArticle-wrapper">
        <h5 className="homeArticle-title">How to use this community:</h5>
        <p className="homeArticle-desc">
          Navigating the Alumni Community is easy and intuitive! Enjoy the full
          potential of this platform by actively participating in discussions,
          sharing your experiences, and tapping into the collective expertise of
          your peers. Feel free to make posts and comments on the relevant
          topics, from showcasing your skills and seeking job opportunities to
          engaging in random tech subjects. This community is your digital home,
          and your contributions fuel its vibrancy. Let's connect, learn, and
          grow together! The strength of our community is in each one of you.
        </p>
      </div>
    </div>
  );
};

export default Home;
