import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../Context";
import axios from "axios";

const Updateuser = () => {
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
  const id = window.location.pathname.split("/").slice(-1)[0];

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
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
      if (err.response && err.response.status === 422) {
        setEmailError(true);
      } else {
        setAccept(false);
      }
    }
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setName(data[0].name || "");
          setEmail(data[0].email || "");
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [id, token]);

  return (
    <>
      <h1>Update User</h1>
      <div className="parent">
        <div className="register">
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

            <button type="submit">Update User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Updateuser;
