import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doLoginAsync,
  selectLogged,
  selectToken,
  doLogout,
  selectLoading,
} from "../reducerApi/loginSlice";

// STYLES AND ICONS
import "../assets/css/Forms.css";
import "../assets/css/ButtonForAll.css";
import "../assets/css/icons/LoginIconLayers.css";

import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader"; // Make sure you have a Loader component

const Login = () => {
  const logged = useSelector(selectLogged);
  const loading = useSelector(selectLoading);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {};
  const handleLogin = () => {
    dispatch(doLoginAsync({ username, password }));
  };

  const handleLogout = () => {
    dispatch(doLogout());
  };

  if (loading) {
    return <Loader />; // Or show it in a way that doesn't replace the whole form
  }

  return (
    <div>
      {loading && <div className="loader"></div>}
      <Col style={{ fontSize: " 70px" }}>Login</Col>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        {/* This div centers its children */}
        <p className="LoginIconLayers"></p>
      </div>
      {logged ? (
        <button className="ButtonForAll" onClick={() => dispatch(doLogout())}>
          LOG OUT
        </button>
      ) : (
        <div>
          
          <div style={{ margin: `${13}px` }}></div>
          {loading && <div className="loader"></div>}{" "}
          <div className="textInputWrapper">
            <input
              placeholder="Username"
              className="textInput"
              required="required"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="textInputWrapper">
            <input
              placeholder="Password"
              className="textInput"
              required="required"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>{" "}
          <div style={{ margin: `${100}px` }}></div>
          <hr className="hr hr-blurry" />
          <button
            className="buttonSpecial"
            onClick={() => dispatch(doLoginAsync({ username, password }))}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
