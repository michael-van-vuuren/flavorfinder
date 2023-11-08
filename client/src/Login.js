import React, { useState } from "react";
import App from "./App";
import "./App.css";




function Login() {
  const [clicked, setClicked] = useState(false);
  if (clicked) {
    return (
      <App />
    )
  }
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
        <button onClick={() => { setClicked(true) }}>Login</button>
      </div>
    );
  }

}

export default Login;