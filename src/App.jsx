import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authorization/Login';
// import Header from './components/Common/Header';
// import Register from './authorization/Register';
// import ForgetPassword from './authorization/ForgetPassword';
// import OtpVerify from './authorization/OtpVerify';
// import Footer from './components/Common/Footer';
import AdminPanel from './components/Admin/AdminPanel';


const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="otpverify" element={<OtpVerify />} /> */}
        <Route path="adminpanel" element={<AdminPanel />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App