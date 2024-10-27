import { useState, useRef, useEffect } from "react";
import otpverify from "../../assets/otpverify.png";
import { getSessionStorage, removeSessionStorage } from "../../Utils/SessionStorage";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { otpAdminAccountVerifyApi, resendOtpAdminAccountApi } from "../../Utils/services/apis/AuthApis";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [cooldown, setCooldown] = useState(0);
  const email = getSessionStorage("email");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

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

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
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
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      dispatch(showAlert({ message: "Please enter a 6-digit OTP", type: "warning" }));
      return;
    }
    if (!email) {
      dispatch(showAlert({ message: "Please retry registration again", type: "warning" }));
      return;
    }
    dispatch(showLoader());
    try {
      const body = { email, otp: otpValue };
      const res = await otpAdminAccountVerifyApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      removeSessionStorage("email");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  const resendOtp = async () => {
    if (cooldown > 0) return;
    if (!email) {
      dispatch(showAlert({ message: "Please retry registration again", type: "warning" }));
      return;
    }
    dispatch(showLoader());
    try {
      const res = await resendOtpAdminAccountApi({ email });
      dispatch(showAlert({ message: res.message, type: "success" }));
      setCooldown(15 * 60); // 15 minutes cooldown
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

  return (
    <div className="flex justify-center items-center mt-7 gap-32">
      <div className="w-[37%] flex justify-center items-center">
        <img src={otpverify} alt="OTP Verification" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: "#d3d3d3" }}>
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
          <div className="mb-10">
            {cooldown === 0 ? (
              <p onClick={resendOtp} className="text-sm cursor-pointer text-[#004AAD] hover:underline font-medium text-right">
                Resend OTP?
              </p>
            ) : (
              <p className="text-sm font-medium text-right text-gray-500">Resend OTP in {formatTime(cooldown)}</p>
            )}
          </div>
          <button type="button" onClick={submitOtp} className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
