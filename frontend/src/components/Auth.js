import React, { useState } from "react"
import './Auth.css';

export default function (props) {
  let [authMode, setAuthMode] = useState("signIn")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signIn" ? "signup" : "signIn")
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
              <label>Email</label>
              <br/>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <br/>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="submit-grid">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="already-registered">
            Already registered?{" "}
            <span className="sign-up" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group">
            <label>Upload Avatar</label>
            <br/>
            <input
              type="file"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <br/>
            <input
              type="name"
              className="form-control"
              placeholder="e.g Jane"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <br/>
            <input
              type="name"
              className="form-control"
              placeholder="e.g Doe"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <br/>
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <br/>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="submit-grid">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}