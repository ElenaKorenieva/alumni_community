import React from "react";
import "./HomePage.css";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideBarMenu />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="pb-5">
              <div className="home-container mt-5">
                <h3 className="home-title">Hello and welcome!</h3>

                <div className="row journey-section">
                  <div className="col-md-8">
                    <h4 className="homeArticle-title text-center">A Journey Beyond Bootcamp</h4>
                    <h5 className="text-center">Choose the topic in the left side menu and post now!</h5>
                  </div>
                  <div className="col-md-4 text-center">
                    <img
                      src="/images/logo_community.png"
                      width="80%"
                      alt="Programming"
                      className="image-home rounded"
                    />
                  </div>
                </div>

                <div className="menu-container pt-2">
                  <h2 className="menu-title topic-title border-bottom">How to use this community:</h2>
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
                  <h2 className="menu-title topic-title border-bottom">Check out the latest community posts:</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
