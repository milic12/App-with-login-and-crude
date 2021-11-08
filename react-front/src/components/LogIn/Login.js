import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/login-logo.svg";
import styles from "./Login.module.scss";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/login", { email, password })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            userMail: email,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        history.push("/home");
      })
      .catch((error) => setError(error.response.data.message));
  };
  return (
    <div className={styles["main-container"]}>
      <div className={styles["logo-container"]}>
        <Logo className={styles["logo-image"]} />
      </div>
      <form className={styles["form-container"]} onSubmit={login}>
        <div>
          <h1 className={styles["login-text"]}>Log In</h1>
          {error && <p className={styles["error-text"]}>{error}</p>}
          <p className={styles["login-label"]}>Email adress</p>

          <input
            id="email"
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className={styles["login-input"]}
          />
        </div>
        <div>
          <p className={styles["login-label"]}>Password</p>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["login-input"]}
          />
        </div>
        <div>
          <button
            variant="contained"
            className={styles["button"]}
            type="submit"
          >
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
