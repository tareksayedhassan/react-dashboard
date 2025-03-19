import React from "react";
import Topbar from "../pages/Topbar";
import SideBar from "../pages/SideBar";
import { Outlet } from "react-router-dom";

const Dashborad = () => {
  return (
    <div>
      <Topbar />
      <div className="content-flex">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashborad;
