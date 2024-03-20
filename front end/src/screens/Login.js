import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doLoginAsync,
  selectLogged,
  selectToken,
  doLogout ,
} from "../reducerApi/loginSlice";
import "../assets/css/Login.css"; // Assuming your CSS styles are in Login.css
import "../assets/css/ButtonForAll.css";

import { Row, Col } from "react-bootstrap";

const Login = () => {
  const logged = useSelector(selectLogged);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Col style={{ fontSize: " 70px" }}>Login</Col>
      <br />
      <br />
      <br />
      {logged ? (
        <button className="ButtonForAll" onClick={() => dispatch(doLogout ())}>
          LOG OUT
        </button>
      ) : (
        <div>
          <div className="textInputWrapper">
            <input
              placeholder="USERNAME"
              class="textInput"
              required="required"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="textInputWrapper">
            <input
              placeholder="PASSWORD"
              class="textInput"
              required="required"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <hr class="hr hr-blurry" />{" "}
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
