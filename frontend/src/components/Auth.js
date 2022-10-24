import React, { useState } from "react"
import Button from '@mui/material/Button';
import './Auth.css';

import AddUser from './AddUser';

export default function (props) {
  const [authMode, setAuthMode] = useState("signIn")
  const [login, setLogin] = useState('');

  const changeAuthMode = () => {
    setAuthMode(authMode === "signIn" ? "signup" : "signIn")
  }

  // Not working should verify user information...
  async function onSignIn() {
		const response = await fetch('localhost:4000/login');
		// check user email and password to ensure they match and
		// exist
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const login = await response.json();
    setLogin(login);
  }

  if (authMode === "signIn") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="not-registered">
              Not registered yet?{" "}
              <span className="sign-up" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group">
              <label>Username</label>
              <br/>
              <input
                type="text"
                id="userName"
                className="form-control"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <br/>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="submit-grid">
            <Button variant="contained" onClick={onSignIn} className="btn">
              Sign In
            </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
        <div className="Auth-form-container">
          <div className="Auth-form">
            <AddUser />
            <div className="already-registered">
              Already registered?{" "}
             <span className="sign-up" onClick={changeAuthMode}>
                Sign In
           </span>
           </div>
          </div>
        </div>
  )
}
