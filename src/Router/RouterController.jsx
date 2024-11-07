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
import DoctorVerification2 from "../pages/Doctor/DoctorVerification2";
import DoctorVerification3 from "../pages/Doctor/DoctorVerification3";
import DoctorVerify from "../pages/Admin/DoctorVerify";
import DoctorList from "../pages/Admin/DoctorList";
import AddClinic from "../pages/Doctor/Clinic/AddClinic";
import AddClinic2 from "../pages/Doctor/Clinic/AddClinic2";
import AddClinic3 from "../pages/Doctor/Clinic/AddClinic3";
import Demo from "../pages/Demo";
import CreateAdmins from "../pages/Admin/CreateAdmins";
import AdminLists from "../pages/Admin/AdminLists";

import ClinicsList from "../pages/Doctor/Clinic/ClinicsList";
import AddServices from "../pages/Doctor/Service/AddServices";
import ServicesList from "../pages/Doctor/Service/ServicesList";
import ClientDashboard from "../pages/Client/ClientDashboard";
import ClientRegister from "../pages/Client/ClientRegister";
import AdminUpdate from "../pages/Admin/AdminUpdate";
import UpdateDoctor from "../pages/Doctor/UpdateDoctor";
import UpdateServices from "../pages/Doctor/Service/UpdateService";
import UpdateClinic from "../pages/Doctor/Clinic/UpdateClinic";
import UpdateClinic2 from "../pages/Doctor/Clinic/UpdateClinic2";
import UpdateClinic3 from "../pages/Doctor/Clinic/UpdateClinic3";
import BookAppointment from "../pages/Client/BookAppointment";
import DoctorDetails from "../pages/Client/DoctorDetails";
import OurDoctors from "../pages/Client/OurDoctors";
import BookAppointmentForm from "../pages/Client/BookAppointmentForm";
import PaymentStatusSuccess from "../pages/Client/PaymentStatusSuccess";
import PaymentStatusFailed from "../pages/Client/PaymentStatusFailed";
import PaymentSection from "../pages/Client/PaymentSection";
import ViewAllDoctor from "../pages/Admin/ViewAllDoctor";
import ViewSingleDoctor from "../pages/Admin/ViewSingleDoctor";
import PlatformFeePage from "../pages/Admin/PlatformFees/PlatformFeePage";
import UserLayout from "../Layout/UserLayout";
import UserProtected from "../PageProtected/UserProtected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ClientDashboard />
      </>
    ),
  },
  {
    path: "/book-appointment",
    element: (
      <>
        <UserLayout>

          <BookAppointment />
        </UserLayout>
      </>
    ),
  },

  {
    path: "/doctor-details/:id",
    element: (
      <>
        <UserLayout>

          <DoctorDetails />
        </UserLayout>
      </>
    ),
  },
  {
    path: "/our-doctors",
    element: (
      <><UserLayout>

        <OurDoctors />
      </UserLayout>
      </>
    ),
  },





  {
    path: "/user",
    element: <UserProtected />,
    children: [
      {
        path: "book-appointment-form/:id",
        element: (
          <UserLayout>
            <BookAppointmentForm />
          </UserLayout>
        ),
      },


      {
        path: "payment-status-success",
        element: (
          // <UserLayout>
          <PaymentStatusSuccess />
          // </UserLayout>
        ),
      },
      {
        path: "payment-status-failed",
        element: (
          // <UserLayout>
          <PaymentStatusFailed />
          // </UserLayout>
        ),
      },
      {
        path: "payment-section/:id",
        element: (
          <UserLayout>
            <PaymentSection />
          </UserLayout>
        ),
      },


    ]
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
            <ClientRegister />
          </AuthLayout>
        ),
      },
      {
        path: "create-admin",
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
        path: "create-admins",
        element: (
          <AdminLayout>
            <CreateAdmins />
          </AdminLayout>
        ),
      },
      {
        path: "update-admin/:id",
        element: (
          <AdminLayout>
            <AdminUpdate />
          </AdminLayout>
        ),
      },
      {
        path: "admins-list",
        element: (
          <AdminLayout>
            <AdminLists />
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
      {
        path: "verify-doctor",
        element: (
          <AdminLayout>
            <DoctorList />
          </AdminLayout>
        ),
      },
      {
        path: "view-all-doctor",
        element: (
          <AdminLayout>
            <ViewAllDoctor />
          </AdminLayout>
        ),
      },
      {
        path: "verify-doctor/:id",
        element: (
          <AdminLayout>
            <DoctorVerify />
          </AdminLayout>
        ),
      },
      {
        path: "view-doctor/:id",
        element: (
          <AdminLayout>
            <ViewSingleDoctor />
          </AdminLayout>
        ),
      },
      {
        path: "update-doctor/:id",
        element: (
          <AdminLayout>
            <UpdateDoctor />
          </AdminLayout>
        ),
      },
      {
        path: "platform-fee",
        element: (
          <AdminLayout>
            <PlatformFeePage />
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
        path: "add-clinic-page1",
        element: (
          <DoctorLayout>
            <AddClinic />
          </DoctorLayout>
        ),
      },
      {
        path: "clinics-list",
        element: (
          <DoctorLayout>
            <ClinicsList />
          </DoctorLayout>
        ),
      },
      {
        path: "add-clinic-page2/:id",
        element: (
          <DoctorLayout>
            <AddClinic2 />
          </DoctorLayout>
        ),
      },
      {
        path: "add-clinic-page3/:id",
        element: (
          <DoctorLayout>
            <AddClinic3 />
          </DoctorLayout>
        ),
      },
      {
        path: "update-clinic/:id",
        element: (
          <DoctorLayout>
            <UpdateClinic />
          </DoctorLayout>
        ),
      },
      {
        path: "update-clinic2/:id",
        element: (
          <DoctorLayout>
            <UpdateClinic2 />
          </DoctorLayout>
        ),
      },
      {
        path: "update-clinic3/:id",
        element: (
          <DoctorLayout>
            <UpdateClinic3 />
          </DoctorLayout>
        ),
      },
      {
        path: "add-services",
        element: (
          <DoctorLayout>
            <AddServices />
          </DoctorLayout>
        ),
      },
      {
        path: "services-list",
        element: (
          <DoctorLayout>
            <ServicesList />
          </DoctorLayout>
        ),
      },
      {
        path: "update-service/:id",
        element: (
          <DoctorLayout>
            <UpdateServices />
          </DoctorLayout>
        ),
      },
      {
        path: "verification-page1",
        element: (
          <DoctorLayout>
            <DoctorVerification />
          </DoctorLayout>
        ),
      },
      {
        path: "verification-page2",
        element: (
          <DoctorLayout>
            <DoctorVerification2 />
          </DoctorLayout>
        ),
      },
      {
        path: "verification-page3",
        element: (
          <DoctorLayout>
            <DoctorVerification3 />
          </DoctorLayout>
        ),
      },
    ],
  },
]);

export default router;
