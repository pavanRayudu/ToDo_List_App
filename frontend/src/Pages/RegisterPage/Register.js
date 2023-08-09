import React, {  useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  const submitHandler =async (e) => {
    e.preventDefault();

    try{
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post('http://localhost:5000/register',{username, email, password},config);
      setSuccess(true);
      setError(false)
      console.log(data)
      

    } catch(error) {
      setError(error.response.data.message)
      console.log(error.response.data.message)
    }
    
    setEmail("");
    setUserName("");
    setPassword("");
  };

  return (
    <div className="register">
      <form className="form" onSubmit={submitHandler}>
        <h2>Create Account</h2>

        <div className="input-fields">
          <label htmlFor="username">Your name</label>
          <input
            id="username"
            type="text"
            placeholder="First name"
            onChange={(e) => setUserName(e.target.value)}
            value={username || ''}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
            value={email || ''}
          />
        </div>

        <div className="input-fields">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 5 characters"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ''}
          />
        </div>

        <button type="submit">
          Submit
        </button>

        {success && <span style={{color:"green",fontWeight:'bold'}}>Registration Successfull</span>}

       {error && <div className="error">
          <span style={{color:"red",fontWeight:'bold'}}>{error}</span>
        </div>}

        <div className="link">
          <span>
            Already a user?<Link to="/login"> Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
