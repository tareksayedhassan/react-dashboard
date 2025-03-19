import React from "react";
import { Link } from "react-router-dom";
const Topbar = () => {
  return (
    <div className="d-flex container shadow">
      <h1>store</h1>
      <Link to="/" className="register-nav" style={{ width: "200px" }}>
        go to the web site
      </Link>
    </div>
  );
};

export default Topbar;
