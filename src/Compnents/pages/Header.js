import { Link } from "react-router-dom";
import "../stayle.css";
import Cookies from "universal-cookie";
import axios from "axios";

const Header = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handilLogOut() {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }
  return (
    <div className="container shadow">
      <nav
        className="p-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="d-flex">
          <Link to="/" className="register-nav">
            Home
          </Link>
          <Link to="/about" className="register-nav">
            About
          </Link>
        </div>
        <div
          className="d-flex"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!token ? (
            <>
              <Link
                to="/Register"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Register
              </Link>
              <Link
                to="/Login"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Dashboard
              </Link>
              <div className="register-nav" onClick={handilLogOut}>
                LogOut
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
