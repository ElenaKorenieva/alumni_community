import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserInfo from "../../components/UserInfo/UserInfo";

const Header = () => {

  return (
    <header className="header">
      <UserInfo />
    </header>
  );
};

export default Header;
