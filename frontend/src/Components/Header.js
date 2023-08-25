import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div className="header">
      <div className="nav-section">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="logo">MyTodos</h1>
        </Link>


        <nav className="nav-bar">
          {data ? (
            <ul>
              {/* <li>pic</li> */}
              <li className="nav-link">Hi, {data.username || ""}</li>
              <li onClick={logoutHandler} className="styled-button"><MdLogout /></li>
            </ul>
          ) : (
            <ul>
              {/* <li>pic</li> */}
              <Link to='/login'><li className="nav-link">Login</li></Link>
              <Link to='/register'><li className='styled-button'>Register</li></Link>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
