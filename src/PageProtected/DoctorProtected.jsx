import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../Utils/LocalStorage";

const DoctorProtected = () => {
  
  const token = getLocalStorage("token");
  const role = getLocalStorage("role");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  

  if (role !== "doctor") {
    return <Navigate to="/auth/login" replace />;
  }



  
  return <Outlet />;
};

export default DoctorProtected;
