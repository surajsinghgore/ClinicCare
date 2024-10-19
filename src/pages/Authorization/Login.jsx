import register from "../../assets/register.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-16">
        <div className="w-1/2 flex justify-center items-center">
          <img src={register} alt="Login" className="w-full object-cover ml-56" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="border rounded-lg p-8 mr-56" style={{ borderColor: "#d3d3d3" }}>
            <form className="w-[300px]" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700 font-medium" required>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm text-gray-700 font-medium" required>
                  Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
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
