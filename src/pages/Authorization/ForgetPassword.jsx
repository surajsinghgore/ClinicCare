import { useEffect } from "react";
import forgetPassword from "../../assets/forgetpass.png";
import { useNavigate } from "react-router-dom";
import { forgetPasswordUsingEmailApi } from "../../Utils/services/apis/CommonApi";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordUsingEmailValidation } from "../../Utils/services/FormValidation/CommonValidation";
import { setSessionStorage } from "../../Utils/SessionStorage";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgetPasswordUsingEmailValidation) });
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
      let res = await forgetPasswordUsingEmailApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      if (res.success) {
        setSessionStorage("email", res.email);
        setTimeout(() => {
          navigate("/auth/otp-change-password");
        }, 2000);
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="flex justify-center items-center mt-14 ml-14 gap-32">
      <div className="w-[35%] flex justify-center items-center">
        <img src={forgetPassword} alt="Forget Password" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: "#d3d3d3" }}>
          <h2 className="text-2xl font-bold mb-6 text-black-700 border-b-2 border-black-200 pb-4">Forget Password</h2>
          <p className="mb-4 text-black-400">Provide us the email id of your cliniccare account and we will send you an otp to reset your password.</p>
          <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-base text-black-700 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoFocus
                id="email"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
              />
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
