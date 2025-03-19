import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../Context";
const Createuser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  // get user
  const context = useContext(User);
  const token = context.auth.token;
  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/user/create`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordr,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/Users");
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
      <div className="parent">
        <div className="register ">
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

            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Createuser;
