import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authorization/Login';
import Header from './components/Common/Header';
import Register from './authorization/Register';
import ForgetPassword from './authorization/ForgetPassword';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  )
}

export default App