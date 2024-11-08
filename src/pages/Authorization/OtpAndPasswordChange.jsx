import { useEffect, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import otpverify from "../../assets/otpverify.png";
import { getSessionStorage } from "../../Utils/SessionStorage";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordUsingEmailApi, resetPasswordUsingEmailApi } from "../../Utils/services/apis/CommonApi";
import { passwordMatcherValidation } from "../../Utils/services/FormValidation/CommonValidation";

const OtpAndPasswordChange = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cooldown, setCooldown] = useState(0); 
  const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = getSessionStorage("email");
  const inputRefs = useRef([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordMatcherValidation) });

  // Auto-focus on the first OTP box
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const isOtpValid = otp.every((digit) => digit !== "") && otp.length === 6;
    if (!isOtpValid) {
      dispatch(showAlert({ message: "Please enter a 6-digit OTP", type: "warning" }));
      return;
    } else {
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0].message;
        dispatch(showAlert({ message: firstError, type: "warning" }));
        return;
      }
    }
  }, [errors]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [cooldown]);

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleReEnterPasswordVisibility = () => {
    setReEnterPasswordVisible(!reEnterPasswordVisible);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const onSubmit = async (formData) => {
    const isOtpValid = otp.every((digit) => digit !== "") && otp.length === 6;

    if (!isOtpValid) {
      dispatch(showAlert({ message: "Please enter a 6-digit OTP", type: "warning" }));
      return;
    }
  
    if (!email) {
      dispatch(showAlert({ message: "Please retry login api", type: "warning" }));
      return;
    }
    dispatch(showLoader());
    try {
      const otpValue = otp.join("");

      let body = { email, otp: otpValue, password: formData.password };
      let res = await resetPasswordUsingEmailApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  // Resend OTP
  const resendOtp = async () => {
    if (!email) {
      dispatch(showAlert({ message: "Please retry registration again", type: "warning" }));
      return;
    }
    if (cooldown > 0) return; 
    dispatch(showLoader());
    try {
      let body = { email };
      let res = await forgetPasswordUsingEmailApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setCooldown(15 * 60);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="flex justify-center items-center mt-7 gap-32">
      <div className="w-[37%] flex justify-center items-center">
        <img src={otpverify} alt="OTP Verification" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: "#d3d3d3" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-6 text-black-700 border-b-2 border-black-200 pb-4">OTP Verification</h2>
            <p className="mb-4">Please enter the 6-digit OTP sent to your registered email.</p>
            <div className="mb-4 flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                />
              ))}
            </div>
            <div>
              {cooldown === 0 ? (
                <p onClick={resendOtp} className="text-sm cursor-pointer text-[#004AAD] hover:underline font-medium text-right">
                  Resend OTP?
                </p>
              ) : (
                <p className="text-sm font-medium text-right text-gray-500">Resend OTP in {formatTime(cooldown)}</p>
              )}
            </div>
            <div className="mb-4 relative">
              <label htmlFor="new-password" className="block text-sm text-gray-700 font-medium">
                Enter New Password:
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="new-password"
                name="password"
                {...register("password")}
                autoComplete="off"
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
            <div className="mb-4 relative">
              <label htmlFor="re-enter-password" className="block text-sm text-gray-700 font-medium">
                Re-enter Password:
              </label>
              <input
                type={reEnterPasswordVisible ? "text" : "password"}
                id="re-enter-password"
                name="confirmPassword"
                autoComplete="off"
                {...register("confirmPassword")}
                className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              />
              <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
                {reEnterPasswordVisible ? (
                  <FaRegEyeSlash onClick={toggleReEnterPasswordVisibility} className="cursor-pointer text-lg" />
                ) : (
                  <FaRegEye onClick={toggleReEnterPasswordVisibility} className="cursor-pointer text-lg" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-[#004AAD] hover:bg-[#003080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004AAD]"
            >
              Verify and Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpAndPasswordChange;
