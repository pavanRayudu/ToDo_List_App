import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);
  return (
    <div className="main-page">
      <div className="hero-section">
        <span className="main-heading">Plan your Day with ToDos</span>
        <div className="section">
          <span className="tag-line">
            We are here to Oraganise your day with todo, Just add task and focus
            on accomplish it. <br /> Be Focused, Be Todoist
          </span>
          <Link to="/register" className="get-started-btn">
            <span >Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
