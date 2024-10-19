import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../Utils/Cookies";

const AdminProtected = () => {
  const loginState = getCookie("loginState");

//   if (!loginState) {
//     return <Navigate to="/auth/login" replace />;
//   }

  return <Outlet />;
};

export default AdminProtected;
