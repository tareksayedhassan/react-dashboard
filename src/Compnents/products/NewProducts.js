import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../Context";

const NewProducts = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState(""); // تم تصحيح الإملاء هنا
  const [img, setimg] = useState(null);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;

  const submit = async (e) => {
    e.preventDefault();
    setAccept(true);

    if (Title.length < 2) {
      setAccept(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", Title);
      formData.append("description", Description); // تم تصحيح الإملاء هنا
      formData.append("image", img);
      await axios.post(`http://127.0.0.1:8000/api/product/create`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      nav("/dashboard/products");
    } catch (err) {
      console.error(err);
      setAccept(false);
    }
  };

  return (
    <div className="parent" style={{ width: "100%" }}>
      <div>
        <form onSubmit={submit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Enter Your Title..."
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {Title.length < 2 && accept && (
            <p className="error">Title must be more than 2 characters</p>
          )}

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            placeholder="Enter Your Description..."
            value={Description} // تم تصحيح الإملاء هنا
            onChange={(e) => setDescription(e.target.value)} // تم تصحيح الإملاء هنا
          />

          <label htmlFor="image">Image:</label>
          <input
            type="file"
            placeholder="Enter Your Image..."
            onChange={(e) => setimg(e.target.files.item(0))}
          />
          <button type="submit" className="register-nav">
            Create product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProducts;
