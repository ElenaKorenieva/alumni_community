import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authOperations";
import UserInfo from "../../components/UserInfo/UserInfo";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="header">
      <button onClick={handleLogout}>Logout</button>
      <UserInfo />
    </header>
  );
};

export default Header;
