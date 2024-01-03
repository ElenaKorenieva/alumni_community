import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authOperations";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div>Home page</div>
      <h3>Welcome!</h3>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
