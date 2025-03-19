import React, { useState, useContext } from "react";
import axios from "axios";
import Header from "../pages/Header";
import { User } from "../Context"; // Assuming this is where User context is defined.
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  // get user
  const user = useContext(User);
  // set cookies
  const cookie = new Cookies();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userdetiles = res.data.data.user;
      user.setAuth({ token, userdetiles });
      nav("/dashboard/Users");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErr(true);
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <button type="submit">Login</button>
            {accept && Err && <p className="error">rong Email or password</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
