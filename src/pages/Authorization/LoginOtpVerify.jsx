import { useState, useRef, useEffect } from "react";
import otpverify from "../../assets/otpverify.png";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../../Utils/LocalStorage";
import { loginAdminOtpVerifyApi } from "../../Utils/services/apis/CommonApi";

const LoginOtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const email = getLocalStorage("email");
  const inputRefs = useRef([]);

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

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      submitOtp();
    }
  }, [otp]);

  const submitOtp = async () => {
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

      let body = { email, otp: otpValue };
      let res = await loginAdminOtpVerifyApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setLocalStorage("token", res.token);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
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
          <h2 className="text-2xl font-bold mb-6 text-black-700 border-b-2 border-black-200 pb-4">Login OTP Verification</h2>
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

          <button type="button" onClick={submitOtp} className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOtpVerify;
