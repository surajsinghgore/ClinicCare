
// import Login from './authorization/Login';
// import Header from './components/Common/Header';
// import Register from './authorization/Register';
// import ForgetPassword from './authorization/ForgetPassword';
// import OtpVerify from './authorization/OtpVerify';
// import Footer from './components/Common/Footer';
// import AdminPanel from './components/Admin/AdminPanel';
import { RouterProvider } from "react-router-dom";
import router from "./Router/RouterController";

const App = () => {
  return (
    <>
            <RouterProvider router={router} />
    </>
    // <Router>
    //   {/* <Header /> */}
    //   <Routes>
    //     {/* <Route path="login" element={<Login />} />
    //     <Route path="adminregister" element={<Register />} />
    //     <Route path="forgetpassword" element={<ForgetPassword />} />
    //     <Route path="otpverify" element={<OtpVerify />} /> */}
    //     {/* <Route path="adminpanel" element={<AdminPanel />} /> */}
    //     <Route path="loader" element={<BlackAlert />} />

    //   </Routes>
    //   {/* <Footer /> */}
    // </Router>
  )
}

export default App