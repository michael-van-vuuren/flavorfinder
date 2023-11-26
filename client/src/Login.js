import React, { useState, useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import App from "./App";
import { MainContext } from "./MainContext"
import "./App.css";

import "typeface-roboto";





function Login() {
  const { login, setLogin, setUserId } = useContext(MainContext);

  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleGoogleLogin = async (response) => {
    try {
      // Decode credential to get user info, including unique sub field
      const decoded = jwtDecode(response.credential)
      const sub = decoded.sub

      // Check if user is already in database
      const exists = await fetch(`http://localhost:3001/api/v1/users/exists/${sub}`)
      let responseData = await exists.json()
      let _id = responseData._id
      console.log(_id)
      
      if (!exists.ok) {
        // Add new user
        const url = `http://localhost:3001/api/v1/users/new`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            user: sub,
          })
        })
        responseData = await res.json()
        _id = responseData._id
        console.log(_id)
      }
      setUserId(_id)
    } catch (e) {
      console.error('Error occurred during login: ', e.message)
    }
  }

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