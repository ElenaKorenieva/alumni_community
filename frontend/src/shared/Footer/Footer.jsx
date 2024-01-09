import React from "react";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import devImg1 from "../images/francielle.png";
import devImg2 from "../images/olena.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>
          <a
            className="footer-link"
            href="https://matrixmaster.info/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Matrix Master
          </a>{" "}
          © 2024
        </p>
      </div>
      <div className="dev-wrapper">
        <h5 className="dev-title">Developers</h5>
        <div className="dev-container">
          <div className="dev-card">
            <div className="image-wrapper">
              <img src={devImg1} alt="developer" />
            </div>
            <h6 className="dev-name">Francielle Abreu da Silva</h6>
            <a
              className="dev-link"
              href="https://github.com/francielleabreu"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="dev-link"
              href="https://www.linkedin.com/in/francielle-abreu"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkeIn
            </a>
          </div>
          <div className="dev-card">
            <div className="image-wrapper">
              <img src={devImg2} alt="developer" />
            </div>
            <h6 className="dev-name">Olena Korenieva</h6>
            <a
              className="dev-link"
              href="https://www.linkedin.com/in/olena-korenieva-555391109/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="dev-link"
              href="https://github.com/ElenaKorenieva"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkeIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
