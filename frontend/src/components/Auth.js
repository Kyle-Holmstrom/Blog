import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './Auth.css';

import AddUser from './AddUser';

export default function (props) {
  const [authMode, setAuthMode] = useState("signIn")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signIn" ? "signup" : "signIn")
  }

  function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const user = {
      userName: form[0].value,
      password: form[1].value
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token)
    });
    
  }

  if (authMode === "signIn") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={event => handleLogin(event)}>
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
                required
                className="form-control"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <br/>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="submit-grid">
            <Button variant="contained" type="submit" value="Submit" className="btn">
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
