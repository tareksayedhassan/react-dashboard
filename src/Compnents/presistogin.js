import axios from "axios";
import { Outlet } from "react-router-dom";
import { User } from "./Context";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import Cookies from "universal-cookie";

const PersistLogin = () => {
  const context = useContext(User);
  const token = context.auth.token;
  const [isLoading, setIsLoading] = useState(true);
  // cookie
  const cookie = new Cookies();
  const getcookies = cookie.get("Bearer");
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getcookies,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token);
            context.setAuth((prev) => {
              return {
                userDetails: data.data.user,
                token: data.data.token,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    !token ? refresh() : setIsLoading(false);
  }, []);

  return isLoading ? <Loading /> : <Outlet />;
};

export default PersistLogin;
