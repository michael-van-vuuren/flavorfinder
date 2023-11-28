import React, { useState, useContext } from "react"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

import App from "./App"
import { MainContext } from "./MainContext"
import "./App.css"

import "typeface-roboto"





function Login() {
  const { login, setLogin, setUserId } = useContext(MainContext)
  const [hasUsername, setHasUsername] = useState(false)
  const [username, setUsername] = useState('')
  const [sub, setSub] = useState('')

  const responseMessage = (response) => {
    console.log(response)
  };

  const errorMessage = (error) => {
    console.log(error)
  };

  const handleGoogleLogin = async (response) => {
    try {
      setLogin(true)
      setHasUsername(false)
      setUsername('')
      setSub('')

      // Decode credential to get user info, including unique sub field
      const decoded = jwtDecode(response.credential)
      setSub(decoded.sub)

      // Check if user is already in database
      const exists = await fetch(`http://localhost:3001/api/v1/users/exists/${decoded.sub}`)
      let responseData = await exists.json()

      if (exists.ok) {
        setUserId(responseData._id)
        setHasUsername(true)
      }

    } catch (e) {
      console.error('Error occurred during login: ', e.message)
    }
  }

  const handleDoneButtonClick = async () => {
    // Add new user
    const url = `http://localhost:3001/api/v1/users/new`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: sub,
        name: username
      })
    })
    const responseData = await res.json()
    setUserId(responseData._id)
    setHasUsername(true)
  }

  if (!login) {
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh", background: "white", zIndex: "-1", position: "absolute" }}></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", marginLeft: "auto", marginRight: "auto", width: "300px", height: "350px", padding: "20px", borderStyle: "solid", borderColor: "#d4d4d4", borderRadius: "10px", background: "white" }}>
          <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="FlavorFinder" style={{ width: "130px", marginBottom: "20px", marginTop: "40px" }} />
          <h1 style={{ display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "30px", fontFamily: "Roboto, sans-serif" }}>FlavorFinder</h1>
          <GoogleLogin onSuccess={(res) => { handleGoogleLogin(res); }} onError={errorMessage} />
        </div>
      </div>
    )
  }
  if (!hasUsername) {
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh", background: "white", zIndex: "-1", position: "absolute" }}></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", marginLeft: "auto", marginRight: "auto", width: "300px", height: "350px", padding: "20px", borderStyle: "solid", borderColor: "#d4d4d4", borderRadius: "10px" }}>
          <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="FlavorFinder" style={{ width: "130px", marginBottom: "20px", marginTop: "40px" }} />
          <p style={{ display: "flex", justifyContent: "center", marginTop: "1%", marginBottom: "20px", fontFamily: "Roboto, sans-serif" }}>Welcome! What should we call you?</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <input type="text" id="username" name="username" placeholder="Enter your username" required
              style={{ display: "flex", justifyContent: "center", fontFamily: "Roboto, sans-serif", padding: "9px" }} onChange={(e) => setUsername(e.target.value)}></input>
            <button onClick={handleDoneButtonClick} style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}>Done</button>
          </div>
        </div>
      </div >
    )
  }
  return <App />
}

export default Login