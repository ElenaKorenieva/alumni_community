import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useLocation } from "react-router-dom";

import UserInfo from "../../components/UserInfo/UserInfo";

const Header = () => {
  const location = useLocation();
  let isProfilePage = location.pathname === "/profile";

  console.log(isProfilePage);

  return <header className="header">{!isProfilePage && <UserInfo />}</header>;
};

export default Header;
