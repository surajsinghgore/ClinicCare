import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../Utils/LocalStorage";

const UserProtected = () => {
    const token = getLocalStorage("token");
    const role = getLocalStorage("role");

    if (!token || role !== "user") {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default UserProtected;
