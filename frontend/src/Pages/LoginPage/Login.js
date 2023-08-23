import React, { useState } from "react";
// import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const[error, setError] = useState(false);
  const navigate = useNavigate();

  

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log({Email : email, Password : password})
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      const { data } = await axios.post("http://localhost:5000/login", { email, password }, config);
      navigate(`/dashboard`,{replace : true})
      localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
      setError(error.response.data.message)
      console.log(error.response.data.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login-page">
      <form className="form" onSubmit={submitHandler}>
        <h2>Login</h2>

        <div className="input-fields">
          <label htmlFor="email">Email</label>
          <input
          required
            id="email"
            type="email"
            placeholder=""
            onChange={(e) => {setEmail(e.target.value)}}
            value={email || ''}
          />
        </div>

        <div className="input-fields">
          <label htmlFor="password">Password</label>
          <input
          required
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ''}
          />
        </div>

        <button type="submit" value="Sign In" >
          Sign In
        </button>
        {error && <div className="error">
            <span style={{fontWeight:'bold',color:'red'}}>{error}</span>
        </div>}

        <div className="link">
          <span>
            New user?<Link to="/register"> Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
