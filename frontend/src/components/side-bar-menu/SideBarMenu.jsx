import React from "react";
import "./SideBarMenu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authOperations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfo,
  faRoad,
  faCode,
  faBullseye,
  faLaptopCode,
  faRandom,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const SideBarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="menu">
      <div className="logo-container">
        <img src="/images/logo-menu.png" />
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/about">
            <FontAwesomeIcon icon={faInfo} className="mr-2" />
            About the Community
          </Link>
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon icon={faRoad} className="mr-2" />
          The Road so Far
          <ul>
            <li className="list-group-item">
              <Link to="/posts/road-presentation">Presentation</Link>
            </li>
            <li className="list-group-item">
              <Link to="/posts/road-reflections">Reflections</Link>
            </li>
          </ul>
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon icon={faCode} className="mr-2" />
          Programming
          <ul>
            <li className="list-group-item">
              <Link to="/posts/programming-front-end">Front-end</Link>
            </li>
            <li className="list-group-item">
              <Link to="/posts/programming-back-end">Back-end</Link>
            </li>
            <li className="list-group-item">
              <Link to="/posts/programming-random">Random Programming</Link>
            </li>
          </ul>
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon icon={faBullseye} className="mr-2" />
          Job Opportunities
          <ul>
            <li className="list-group-item">
              <Link to="/posts/job-opportunities">Opportunities</Link>
            </li>
            <li className="list-group-item">
              <Link to="/posts/job-showcase">Showcase</Link>
            </li>
          </ul>
        </li>
        <li className="list-group-item">
          <Link to="/posts/random-topics">
            <FontAwesomeIcon icon={faRandom} className="mr-2" />
            Random Topics
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
        </li>
        <li className="list-group-item">
          <Link onClick={handleLogout} to={'/'}>
            <FontAwesomeIcon icon={faSignOut} className="mr-2" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarMenu;
