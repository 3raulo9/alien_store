// screens/Login.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doLoginAsync,
  doLogout,
  selectUser,
  selectLogged,
  selectLoading,
} from "../reducerApi/loginSlice";

// STYLES AND ICONS
import "../assets/css/Forms.css";
import "../assets/css/ButtonForAll.css";
import "../assets/css/icons/LoginIconLayers.css";

import { Col } from "react-bootstrap";
import Loader from "../components/Loader";

const Login = () => {
  const logged = useSelector(selectLogged);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(doLoginAsync({ username, password }));
  };

  const handleLogout = () => {
    dispatch(doLogout());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {logged ? (
        <div>
          <Col style={{ fontSize: " 70px" }}>Hey user {user?.name}</Col>

          <div style={{ margin: `${87}px` }}></div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className="LoginIconLayers"></p>
          </div>
          <div style={{ margin: `${43}px` }}></div>
          <hr className="hr hr-blurry" />{" "}
          
          <button
            className="buttonSpecial"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
          
        </div>
      ) : (
        <div>
          <Col style={{ fontSize: " 70px" }}>Login</Col>
          <div style={{ margin: `${87}px` }}></div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className="LoginIconLayers"></p>
          </div>
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
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
