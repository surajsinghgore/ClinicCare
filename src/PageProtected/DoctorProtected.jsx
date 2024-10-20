import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../Utils/LocalStorage";

const DoctorProtected = () => {
  const token = getLocalStorage("token");
  const role = getLocalStorage("role");
  const isVerified = getLocalStorage("isVerified"); 

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role !== "doctor") {
    return <Navigate to="/auth/login" replace />;
  }

  if (isVerified=="true") {
    return <Navigate to="/doctor/dashboard" replace />;
  }
  if (isVerified=="false") {
    return <Navigate to="/doctor/verification" replace />;
  }

  return <Outlet />;
};

export default DoctorProtected;
