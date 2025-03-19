import { useContext } from "react";
import { User } from "./Context"; // تأكد من أنك تستورد User بشكل صحيح
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { auth } = useContext(User); // تأكد من أنك تحصل على auth من Context بشكل صحيح
  const location = useLocation();

  return auth && auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
