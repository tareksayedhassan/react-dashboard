import { NavLink } from "react-router-dom";
import grupe from "../img/group.png";
import user from "../img/user.png";
import img from "../img/3.png";
import plus from "../img/plus.png";
const SideBar = () => {
  return (
    <div className="side-bar" style={styles.sideBar}>
      <NavLink
        to="/dashboard/Users"
        className="item-link"
        style={styles.itemLink}
      >
        <img src={grupe} alt="Group icon" style={styles.icon} />
        Users
      </NavLink>
      <NavLink
        to="/dashboard/User/create"
        className="item-link"
        style={styles.itemLink}
      >
        <img src={user} alt="User icon" style={styles.icon} />
        New User
      </NavLink>
      <NavLink
        to="/dashboard/products"
        className="item-link"
        style={styles.itemLink}
      >
        <img src={img} alt="Product icon" style={styles.icon} />
        Products
      </NavLink>
      <NavLink
        to="/dashboard/NewProducts"
        className="item-link"
        style={styles.itemLink}
      >
        <img src={plus} alt="New product icon" style={styles.icon} />
        New Products
      </NavLink>
    </div>
  );
};

const styles = {
  sideBar: {
    width: "200px",
    padding: "20px",
  },
  itemLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    margin: "15px 0",
    color: "#183153" /* لون النص */,
    fontSize: "16px" /* حجم الخط */,
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  icon: {
    width: "25px",
    height: "25px",
    marginRight: "15px" /* مسافة بين الأيقونة والنص */,
    transition: "transform 0.3s ease",
  },
};

export default SideBar;
