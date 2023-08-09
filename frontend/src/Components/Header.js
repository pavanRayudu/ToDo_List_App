import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem('userInfo'))

  const logoutHandler =() => {
    localStorage.removeItem('userInfo');
    navigate('/')
  }
  return (
    <div className="header">
      <Link to="/" style={{textDecoration:'none',color:'whitesmoke'}}>
        <h1 className="logo">To-DO List</h1>
      </Link>

      <nav className="nav-bar">
        {data && <ul>
          {/* <li>pic</li> */}
          <li className="nav-username">{data.username || ''}</li>
          <li onClick={logoutHandler}>Logout</li>
        </ul>}

      </nav>
    </div>
  );
};

export default Header;
