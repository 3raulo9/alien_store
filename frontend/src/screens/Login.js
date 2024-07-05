// screens/Login.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import {
  doLoginAsync,
  doLogout,
  selectUser,
  selectLogged,
  selectLoading,
} from "../reducers/loginSlice";

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
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleLogin = () => {
    dispatch(doLoginAsync({ username, password }));
    setRefresh(!refresh)
  };

  const handleLogout = () => {
    dispatch(doLogout());
    setRefresh(!refresh)
  };

  useEffect(() => {
    if (logged) {
      navigate("/"); // Navigate to HomeScreen when logged in
    }
  }, [logged, navigate,refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {logged ? (
        <div>
          <Col style={{ fontSize: "70px" }}>Hey user {user?.name}</Col>
          <div style={{ margin: `${87}px` }}></div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className="LoginIconLayers"></p>
          </div>
          <div style={{ margin: `${43}px` }}></div>
          <hr className="hr hr-blurry" />{" "}
          <button className="buttonSpecial" onClick={handleLogout}>
            LOG OUT
          </button>
        </div>
      ) : (
        <div>
          <Col style={{ fontSize: "70px" }}>Login</Col>
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
          <button className="buttonSpecial" onClick={handleLogin}>
            Log In
          </button>
          <p className="signin">
          <br />
          doesn't have an account?{" "}
          <Link style={{ color: "white" }} to="/register">
            Register
          </Link>
        </p>
        </div>
      )}
    </div>
  );
};

export default Login;
