import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../Context";
import trash from "../img/trash-2.svg";
import edite from "../img/edit.svg";

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [runEffect, setRunEffect] = useState(0);
  const [error, setError] = useState(null);

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [runEffect]);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        setRunEffect((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const showProducts = Products.map((product, index) => (
    <tr key={product.id}>
      <th>{index + 1}</th>
      <th>{product.title}</th>
      <th>{product.description}</th>
      <th>
        <img
          src={trash}
          alt="Delete icon"
          style={{ cursor: "pointer" }}
          onClick={() => deleteUser(product.id)}
        />
        <Link to={`/updateProducts/${product.id}`}>
          <img src={edite} alt="Edit icon" style={{ cursor: "pointer" }} />
        </Link>
      </th>
    </tr>
  ));

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
};

export default Products;
