import { createBrowserRouter } from "react-router-dom";
import AuthProtected from "../PageProtected/AuthProtected";

// pages imported
import Login from "../pages/Authorization/Login";
import AuthLayout from "../Layout/AuthLayout";
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
import DoctorServicePlans from "../pages/Client/DoctorServicePlans";
import TodayAppointment from "../pages/Doctor/Appointment/TodayAppointment";
import AppointmentList from "../pages/Doctor/Appointment/AppointmentList";
import AboutClinic from "../pages/AboutClinic/AboutClinic";
import DashboardLayout from "../Layout/DashboardLayout";
import UserGeneralDetails from "../pages/UserDashboard/UserGeneralDetails";
import UserChangePassword from "../pages/UserDashboard/UserChangePassword";
import UserAppointments from "../pages/UserDashboard/UserAppointments";
import UserProfileChange from "../pages/UserDashboard/UserProfileChange";
import EditAppointment from "../pages/Doctor/Appointment/EditAppointment";
import EditAppointment2 from "../pages/Doctor/Appointment/EditAppointment2";
import PatientsDetails from "../pages/Doctor/Patients/PatientsDetails";
import PatientMedicalHistory from "../pages/Doctor/Patients/PatientMedicalHistory";
import ViewAppointment from "../pages/Doctor/Appointment/ViewAppointment";
import Transactions from "../pages/Doctor/Transaction/Transactions";
import TransactionDetails from "../pages/Doctor/Transaction/TransactionDetails";
import RejectedPatient from "../pages/Doctor/Appointment/RejectedPatient";

import UserRejectDetails from "../pages/UserDashboard/UserRejectDetails";
import UserAppointmentDetails from "../pages/UserDashboard/UserAppointmentDetails";
import DoctorRating from "../pages/Rating/DoctorRating";
import ShowRatings from "../pages/Rating/ShowRatings";
import CreatePatient from "../pages/Doctor/Patients/CreatePatient";
import CreatePatient2 from "../pages/Doctor/Patients/CreatePatient2";
import CreatePatient3 from "../pages/Doctor/Patients/CreatePatient3";
import UserQuickNavigate from "../components/UserQuickNavigate";
import PatientList from "../pages/Doctor/Patients/PatientList";
import ViewPatientsDetails from "../pages/Doctor/Patients/ViewPatientDetails";
import PaymentVerificationPage from "../pages/Doctor/Patients/PaymentVerificationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ClientDashboard />
        <UserQuickNavigate />
      </>
    ),
  },

  {
    path: "/show-ratings/:doctorId",
    element: (
      <><UserLayout>
        <ShowRatings />
      </UserLayout>
      </>
    ),
  },
  {
    path: "/book-appointment",
    element: (
      <>
        <UserLayout>
          <BookAppointment />
          <UserQuickNavigate />
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
          <UserQuickNavigate />
        </UserLayout>
      </>
    ),
  },
  {
    path: "/our-doctors",
    element: (
      <>
        <UserLayout>
          <OurDoctors />
          <UserQuickNavigate />
        </UserLayout>
      </>
    ),
  },
  {
    path: "/service-plans/:id",
    element: (
      <>
        <UserLayout>
          <DoctorServicePlans />
          <UserQuickNavigate />
        </UserLayout>
      </>
    ),
  },
  {
    path: "/about-clinic/:id",
    element: (
      <>
        <UserLayout>
          <AboutClinic />
          <UserQuickNavigate />
        </UserLayout>
      </>
    ),
  },

  // user dashboard

  {
    path: "/user",
    element: <UserProtected />,
    children: [
      {
        path: "doctor-rating/:doctorId",
        element: (
          <>
            <UserLayout>

              <DoctorRating />
            </UserLayout>
          </>
        ),
      },
      {
        path: "book-appointment-form/:id",
        element: (
          <UserLayout>
            <BookAppointmentForm />
          </UserLayout>
        ),
      },

      {
        path: "user-general-details",
        element: (
          <>
            <DashboardLayout>
              <UserGeneralDetails />
            </DashboardLayout>
          </>
        ),
      },
      {
        path: "user-password-change",
        element: (
          <>
            <DashboardLayout>
              <UserChangePassword />
            </DashboardLayout>
          </>
        ),
      },
      {
        path: "user-profile-change",
        element: (
          <>
            <DashboardLayout>
              <UserProfileChange />
            </DashboardLayout>
          </>
        ),
      },

      {
        path: "user-appointment",
        element: (
          <>
            <DashboardLayout>
              <UserAppointments />
            </DashboardLayout>
          </>
        ),
      },

      {
        path: "payment-status-success/:id",
        element: (
          // <UserLayout>
          <PaymentStatusSuccess />
          // </UserLayout>
        ),
      },
      {
        path: "payment-status-failed/:id",
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
      {
        path: "user-appointment-details/:id",
        element: (
          <UserLayout>
            <UserAppointmentDetails />
          </UserLayout>
        ),
      },
      {
        path: "user-reject-details/:id",
        element: (
          <UserLayout>
            <UserRejectDetails />
          </UserLayout>
        ),
      },
    ],
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
      {
        path: "todays-appointment",
        element: (
          <DoctorLayout>
            <TodayAppointment />
          </DoctorLayout>
        ),
      },
      {
        path: "appointment-list",
        element: (
          <DoctorLayout>
            <AppointmentList />
          </DoctorLayout>
        ),
      },
      {
        path: "view-appointment/:id",
        element: (
          <DoctorLayout>
            <ViewAppointment />
          </DoctorLayout>
        ),
      },
      {
        path: "edit-appointment-form1/:id",
        element: (
          <DoctorLayout>
            <EditAppointment />
          </DoctorLayout>
        ),
      },
      {
        path: "edit-appointment-form2/:id",
        element: (
          <DoctorLayout>
            <EditAppointment2 />
          </DoctorLayout>
        ),
      },
      {
        path: "patient-details/:id",
        element: (
          <DoctorLayout>
            <PatientsDetails />
          </DoctorLayout>
        ),
      },
      {
        path: "patient-medical-history/:id",
        element: (
          <DoctorLayout>
            <PatientMedicalHistory />
          </DoctorLayout>
        ),
      },
      {
        path: "transaction-records",
        element: (
          <DoctorLayout>
            <Transactions />
          </DoctorLayout>
        ),
      },
      {
        path: "transaction-details/:id",
        element: (
          <DoctorLayout>
            <TransactionDetails />
          </DoctorLayout>
        ),
      },
      {
        path: "rejected-patient/:id",
        element: (
          <DoctorLayout>
            <RejectedPatient />
          </DoctorLayout>
        ),
      },
      {
        path: "create-patient",
        element: (
          <DoctorLayout>
            <CreatePatient />
          </DoctorLayout>
        ),
      },
      {
        path: "create-patient-form2/:userId",
        element: (
          <DoctorLayout>
            <CreatePatient2 />
          </DoctorLayout>
        ),
      },
      {
        path: "create-patient-form3",
        element: (
          <DoctorLayout>
            <CreatePatient3 />
          </DoctorLayout>
        ),
      },
      {
        path: "payment-verification-page/:transactionId",
        element: (
          <DoctorLayout>
            <PaymentVerificationPage />
          </DoctorLayout>
        ),
      },
      {
        path: "patient-list",
        element: (
          <DoctorLayout>
            <PatientList />
          </DoctorLayout>
        ),
      },
      {
        path: "view-my-patient-details/:id",
        element: (
          <DoctorLayout>
            <ViewPatientsDetails />
          </DoctorLayout>
        ),
      },
    ],
  },
]);

export default router;
