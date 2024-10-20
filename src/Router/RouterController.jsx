import { createBrowserRouter } from "react-router-dom";
import AuthProtected from "../PageProtected/AuthProtected";

// pages imported
import Login from "../pages/Authorization/Login";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../pages/Authorization/Register";
import ForgetPassword from "../pages/Authorization/ForgetPassword";
import OtpVerify from "../pages/Authorization/OtpVerify";
import AdminProtected from "../PageProtected/AdminProtected";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLayout from "../Layout/AdminLayout";
import CreateDoctor from "../pages/Admin/CreateDoctor";
import AdminCreate from "../pages/Authorization/AdminCreate";
import OtpAndPasswordChange from "../pages/Authorization/OtpAndPasswordChange";
import LoginOtpVerify from "../pages/Authorization/LoginOtpVerify";
import DoctorLayout from "../Layout/DoctorLayout";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import DoctorVerification from "../pages/Doctor/DoctorVerification";
import DoctorProtected from "../PageProtected/DoctorProtected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>d</>,
  },

  {
    path: "/auth",
    element: <AuthProtected />,
    children: [
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "register",
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "admin-create",
        element: (
          <AuthLayout>
            <AdminCreate />
          </AuthLayout>
        ),
      },
      {
        path: "forgetpassword",
        element: (
          <AuthLayout>
            <ForgetPassword />
          </AuthLayout>
        ),
      },
      {
        path: "otpverify",
        element: (
          <AuthLayout>
            <OtpVerify />
          </AuthLayout>
        ),
      },
      {
        path: "login-otp-verify",
        element: (
          <AuthLayout>
            <LoginOtpVerify />
          </AuthLayout>
        ),
      },
      {
        path: "otp-change-password",
        element: (
          <AuthLayout>
            <OtpAndPasswordChange />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        path: "dashboard",
        element: (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        ),
      },
      {
        path: "add-doctor",
        element: (
          <AdminLayout>
            <CreateDoctor />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: "/doctor",
    element: <DoctorProtected />,
    children: [
      {
        path: "dashboard",
        element: (
          <DoctorLayout>
            <DoctorDashboard />
          </DoctorLayout>
        ),
      },
      {
        path: "verification",
        element: (
          <DoctorLayout>
            <DoctorVerification />
          </DoctorLayout>
        ),
      },
    ],
  },
]);

export default router;
