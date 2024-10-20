import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../Utils/LocalStorage";

const AuthProtected = () => {
  const token = getLocalStorage("token");
  const role = getLocalStorage("role");
  const isVerified = getLocalStorage("isVerified"); 

  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    if (role === "doctor") {
      if (isVerified) {
        return <Navigate to="/doctor/dashboard" replace />;
      } else {
        return <Navigate to="/doctor/verification" replace />;
      }
    }

    if (role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default AuthProtected;
