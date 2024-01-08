import React from "react";
import Home from "../../components/Home/Home";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";

const About = () => {
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

export default About;
