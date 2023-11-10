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
      <div>
        <h1 style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>FlavorFinder</h1>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10%", borderStyle: "solid", marginLeft: "10%", marginRight: "10%", padding: "10%", borderColor: "#d4d4d4", borderRadius: "10px" }}>
          <button id="more" onClick={() => { setLogin(true) }}>Login</button>
        </div>
      </div>

    );
  }

}

export default Login;