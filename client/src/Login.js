import React, { useState, useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';

import App from "./App";
import { MainContext } from "./MainContext"
import "./App.css";

import "typeface-roboto";





function Login() {
  const { login, setLogin } = useContext(MainContext);

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  if (login) {
    return (
      <App />
    )
  }
  else {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", marginLeft: "auto", marginRight: "auto", width: "300px", padding: "20px", borderStyle: "solid", borderColor: "#d4d4d4", borderRadius: "10px" }}>
          <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="FlavorFinder" style={{ width: "100px", marginBottom: "20px", marginTop: "40px" }} />
          <h1 style={{ display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "30px", fontFamily: "Roboto, sans-serif" }}>FlavorFinder</h1>
          <GoogleLogin onSuccess={(res) => { setLogin(true); responseMessage(res); }} onError={errorMessage} />
        </div>
      </div>
    );
  }

}

export default Login;