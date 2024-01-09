import React from "react";
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
            <div className="about-container pt-5">
              <h2 className="about-title topic-title border-bottom">About the Alumni Community</h2>
              <div className="aboutImg-wrapper">
                <img
                  src="/images/about_img.png"
                  width="80%"
                  alt="Programming"
                  className="rounded mx-auto"
                />
              </div>
              <div className="aboutArticle-wrapper">
                <h5 className="aboutArticle-title">What is the purpose of this community?</h5>
                <p className="aboutArticle-desc">
                  Welcome to the Alumni Community, a dedicated space designed for the
                  vibrant network of Matrix Master bootcamp graduates. Here, we believe
                  in the power of connections, shared knowledge, and ongoing growth.
                  Whether you're seeking career opportunities, sharing insights, or
                  simply connecting with developer professionals, you're here to be a
                  part of a dynamic and supportive community that continues to thrive
                  beyond the bootcamp experience.
                </p>
              </div>
              <div className="aboutArticle-wrapper">
                <h5 className="aboutArticle-title">Who is the target audience for this community?</h5>
                <p className="aboutArticle-desc">
                  For the dynamic and accomplished individuals who have successfully
                  navigated the transformative journey of the Matrix Master Bootcamp.
                  If you're an alumni member, This space is specifically crafted for alumni members.
                </p>
              </div>
              <div className="aboutArticle-wrapper">
                <h5 className="aboutArticle-title">How to use this community:</h5>
                <p className="aboutArticle-desc">
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
              <div className="aboutArticle-wrapper">
                <h5 className="aboutArticle-title">Who are the creators of this project?</h5>
                <p className="aboutArticle-desc">
                  Former students of the Matrix Master #14 2023 class. This was the final project
                  to obtain the Bootcamp certificate. Designed and created by <a href="https://github.com/francielleabreu" target="_blank" rel="noopener noreferrer">Francielle Abreu</a> and <a href="https://github.com/ElenaKorenieva" target="_blank" rel="noopener noreferrer">Helena Korenieva</a>,
                  under the supervision of tutor <a href="https://github.com/IslamAltayeb" target="_blank" rel="noopener noreferrer">Islam Osman</a>.
                  Check out the whole project on GitHub <a href="https://github.com/ElenaKorenieva/alumni_community" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default About;