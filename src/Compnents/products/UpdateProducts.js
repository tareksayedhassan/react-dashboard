import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [accept, setAccept] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split("/").slice(-1)[0]; // استخراج الـ id بشكل صحيح
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTitle(data.data.title);
        setDescription(data.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]); // إضافة الـ token كـ dependency

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = window.location.pathname.split("/").slice(-1)[0];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    axios
      .put(`http://127.0.0.1:8000/api/product/update/${id}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAccept(true);
      })
      .catch((err) => {
        setAccept(false);
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
      {!accept && (
        <p style={{ color: "red" }}>There was an error updating the product.</p>
      )}
    </div>
  );
};

export default UpdateProduct;
