import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../Utils/Cookies";

const AuthProtected = () => {
  const loginState = getCookie("loginState");
  console.log(loginState);

  if (loginState) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthProtected;
