import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Compnents/pages/Home";
import About from "./Compnents/pages/About";
import Signup from "./Compnents/pages/Signup";
import Login from "./Compnents/pages/Login";
import Dashborad from "./Compnents/pages/Dashborad";
import Users from "./Compnents/pages/Users";
import Createuser from "./Compnents/pages/Createuser";
import Updateuser from "./Compnents/pages/Updateuser";
import Requerdauth from "./Compnents/Requerdauth";
import Presistogin from "./Compnents/presistogin";
import Products from "./Compnents/products/products";
import NewProducts from "./Compnents/products/NewProducts";
import UpdateProducts from "./Compnents/products/UpdateProducts";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Register" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route element={<Presistogin />}>
          <Route element={<Requerdauth />}>
            <Route path="/dashboard" element={<Dashborad />}>
              <Route path="Users" element={<Users />} />
              <Route path="user/create" element={<Createuser />} />
              <Route path="users/:id" element={<Updateuser />} />
              <Route path="products" element={<Products />} />
              <Route path="NewProducts" element={<NewProducts />} />
              <Route path="updateProducts" element={<UpdateProducts />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
