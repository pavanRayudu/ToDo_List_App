import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './MainPage.css'

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo) {
      navigate('/UserPage',{replace : true})
    }
  },[navigate])
  return (
    <div className="main-page">
      <div className="links">
        <Link to="/register">
          Register
        </Link>
        <Link to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
