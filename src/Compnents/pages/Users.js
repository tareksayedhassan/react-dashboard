import { useContext, useEffect, useState } from "react";
import trash from "../img/trash-2.svg";
import edite from "../img/edit.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../Context";

const Users = () => {
  const [Users, setUsers] = useState([]);
  const [runEffect, setRun] = useState(0);
  const [error, setError] = useState(null); // حالة التعامل مع الأخطاء
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/show`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setUsers(data.data);
        setError(null); // مسح الخطأ لو البيانات اتجابت بنجاح
      })
      .catch((err) => {
        console.log(err);
      });
  }, [runEffect, token]);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showUser = Users.map((user, index) => (
    <tr key={user.id}>
      <th>{index + 1}</th>
      <th>{user.name}</th>
      <th>{user.email}</th>
      <th>
        <img
          src={trash}
          alt="Delete icon"
          style={{ cursor: "pointer" }}
          onClick={() => deleteUser(user.id)}
        />
        <Link to={`/${user.id}`}>
          <img src={edite} alt="Edit icon" style={{ cursor: "pointer" }} />
        </Link>
      </th>
    </tr>
  ));

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUser}</tbody>
      </table>
    </div>
  );
};

export default Users;
