import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../Utils/LocalStorage";

const AdminProtected = () => {
  const token = getLocalStorage("token");
  const role = getLocalStorage("role");

  if (!token || role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
