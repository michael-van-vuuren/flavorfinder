import React, { useState, useContext } from "react";
import App from "./App";
import { MainContext } from "./MainContext"
import "./App.css";




function Login() {
  const { login, setLogin } = useContext(MainContext);

  if (login) {
    return (
      <App />
    )
  }
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
        <button id="more" onClick={() => { setLogin(true) }}>Login</button>
      </div>
    );
  }

}

export default Login;