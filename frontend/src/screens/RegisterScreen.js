import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../reducers/registerSlice";
import { doLoginAsync } from "../reducers/loginSlice";

import "../assets/css/Forms.css";
import "../assets/css/ButtonForAll.css";
import "../assets/css/Loader.css";

import { Link, useNavigate } from "react-router-dom";
import withTranslation from "../hoc/withTranslation";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch the register action and wait for it to finish
    const actionResult = await dispatch(register({ username, email, password }));
    
    // Check if the register action was successful
    if (register.fulfilled.match(actionResult)) {
      // Dispatch the login action
      const loginResult = await dispatch(doLoginAsync({ username, password }));

      // Check if the login action was successful
      if (doLoginAsync.fulfilled.match(loginResult)) {
        // Redirect to the home page
        navigate('/');
      } else {
        // Handle login failure (e.g., show an error message)
        console.error("Login failed after registration");
      }
    } else {
      // Handle registration failure (e.g., show an error message)
      console.error("Registration failed");
    }
  };
  
  return (
    <div className="container">
      <span className="loader"></span>

      <form onSubmit={handleSubmit} className="form">
        <p style={{ fontSize: "70px" }} className="title">
          Register
        </p>
        <p style={{ fontSize: "30px" }} className="message">
          Signup now and get full access to our app.
        </p>
        <div className="textInputWrapper">
          <br />
          <br />
          <input
            required=""
            placeholder="Username"
            type="text"
            className="textInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="textInputWrapper">
          <input
            required=""
            placeholder="Email"
            type="email"
            className="textInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="textInputWrapper">
          <input
            required=""
            placeholder="Password"
            type="password"
            className="textInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ margin: `${52}px` }}></div>
        <hr className="hr hr-blurry" />{" "}
        <button type="submit" className="buttonSpecial">
          Register
        </button>
        <p className="signin">
          <br />
          Already have an account?{" "}
          <Link style={{ color: "white" }} to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default withTranslation(RegisterScreen);
