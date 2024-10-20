import registerImage from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { loginValidation } from "../../Utils/services/FormValidation/CommonValidation";

import { showAlert } from "../../redux/Slices/AlertToggleState";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setLocalStorage } from "../../Utils/LocalStorage";
import { loginApi } from "../../Utils/services/apis/CommonApi";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidation) });
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;

      dispatch(showAlert({ message: firstError, type: "warning" }));

      return;
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    let body = { ...formData };

    dispatch(showLoader());

    try {
      let res = await loginApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setLocalStorage("_id", res.id);
      setLocalStorage("email", res.email);
      setLocalStorage("role", res.role);

      setTimeout(() => {
        if (res.role == "admin") {
          navigate("/auth/login-otp-verify");
        }
        if (res.role == "doctor") {
          navigate("/doctor/dashboard");
          setLocalStorage("token", res.token);
          setLocalStorage("isVerified", res.isVerified);
        }
        if (res.role == "user") {
          navigate("/user/dashboard");
          setLocalStorage("token", res.token);
        }
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-16">
        <div className="w-1/2 flex justify-center items-center">
          <img src={registerImage} alt="Login" className="w-full object-cover ml-56" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="border rounded-lg p-8 mr-56" style={{ borderColor: "#d3d3d3" }}>
            <form className="w-[300px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700 font-medium" required>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                  autoComplete="off"
                  {...register("email")}
                  autoFocus
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm text-gray-700 font-medium" required>
                  Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                />
                <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
                  {passwordVisible ? (
                    <FaRegEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-lg" />
                  ) : (
                    <FaRegEye onClick={togglePasswordVisibility} className="cursor-pointer text-lg" />
                  )}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 font-medium">
                  Remember Password
                </label>
              </div>
              <div className="mb-4">
                <Link to="/auth/forgetpassword" className="text-sm text-[#004AAD] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div>
                <button type="submit" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-700 font-medium">Don&lsquo;t have an account? </span>
                <Link to="/auth/register" className="text-sm text-[#004AAD] hover:underline font-medium">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
