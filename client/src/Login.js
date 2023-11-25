import React, { useState, useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import App from "./App";
import { MainContext } from "./MainContext"
import "./App.css";





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
        <h1 style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>FlavorFinder</h1>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10%", borderStyle: "solid", marginLeft: "10%", marginRight: "10%", padding: "10%", borderColor: "#d4d4d4", borderRadius: "10px" }}>
          <GoogleLogin onSuccess={(res) => { setLogin(true); handleGoogleLogin(res); }} onError={errorMessage} />
        </div>

      </div>

    );
  }

}

export default Login;