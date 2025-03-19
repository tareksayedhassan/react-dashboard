import React, { useState, useContext } from "react";
import axios from "axios";
import Header from "../pages/Header";
import { User } from "../Context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  // get user

  const user = useContext(User);
  // get cookies
  const cookie = new Cookies();
  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordr,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);

      const userDetails = res.data.data.user;
      user.setauth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      } else {
        setAccept(true);
      }
    }
  }

  return (
    <>
      <Header />
      <div className="parent login">
        <div className="register login">
          <form onSubmit={submit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 2 && accept && (
              <p className="error">Name must be more than 2 characters</p>
            )}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError && (
              <p className="error">Email is already taken</p>
            )}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter Your Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">Password must be at least 8 characters</p>
            )}

            <label htmlFor="passwordConfirm">Repeat Password:</label>
            <input
              type="password"
              placeholder="Repeat Your Password..."
              value={passwordr}
              onChange={(e) => setPasswordr(e.target.value)}
            />
            {passwordr !== password && accept && (
              <p className="error">Passwords do not match</p>
            )}

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
