import React from "react";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../../components/Home/Home";
import Header from "../../shared/Header/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default HomePage;
