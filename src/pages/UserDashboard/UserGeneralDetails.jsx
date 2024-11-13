
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GrUpdate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateValidationSchema } from "../../Utils/services/FormValidation/UserValidation";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { updateMeUserByIdApi } from "../../Utils/services/apis/User/UserPersonalApi";
import pincodeDirectory from "india-pincode-lookup";

const UserGeneralDetails = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(userUpdateValidationSchema) });


    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0].message;

            dispatch(showAlert({ message: firstError, type: "warning" }));

            return;
        }
    }, [errors]);
    const { getMyUserDetails } = useSelector((state) => state.getMyUserDetails);





    const onSubmit = async (formData) => {
        const dob = new Date(formData.dob);


        const formattedDob = dob.getFullYear() + "-" + String(dob.getMonth() + 1).padStart(2, "0") + "-" + String(dob.getDate()).padStart(2, "0");

        let body = { ...formData, dob: formattedDob };


        dispatch(showLoader());




        try {
            const res = await updateMeUserByIdApi(body);
            dispatch(showAlert({ message: res.message, type: "success" }));

        } catch (error) {
            dispatch(showAlert({ message: error?.response?.data?.message || "Failed to create account", type: "failed" }));
        } finally {
            dispatch(hideLoader());
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

        return `${year}-${month}-${day}`;
    }
    const handlePinCodeChange = (e) => {
        const pincode = e.target.value;
        if (pincode.length === 6) {
            const pincodeData = pincodeDirectory.lookup(pincode);

            if (pincodeData.length === 0) {
                dispatch(showAlert({ message: "Invalid Pincode", type: "warning" }));
            } else {
                // Set city, state, and country based on pincode data
                setValue("city", pincodeData[0].districtName);
                setValue("state", pincodeData[0].stateName);
                setValue("country", "India"); // Static country for this example
            }
        }
    };


    // set default value
    useEffect(() => {
        if (getMyUserDetails) {
            setValue('name', getMyUserDetails?.name)
            setValue('email', getMyUserDetails?.email)
            setValue('mobile', getMyUserDetails?.mobile)
            setValue('dob', formatDate(getMyUserDetails?.dob))
            setValue('gender', getMyUserDetails?.gender)
            setValue('pincode', getMyUserDetails?.pincode)
            setValue('city', getMyUserDetails?.city)
            setValue('state', getMyUserDetails?.state)
            setValue('country', getMyUserDetails?.country)
            setValue('bloodGroup', getMyUserDetails?.bloodGroup)
            setValue('address', getMyUserDetails?.address)
        }
    }, [getMyUserDetails])
    return (
        <div>
            <div className="flex justify-center items-center py-16">
                <div className=" overflow-hidden w-[95%] flex">
                    <div className="w-full p-10">
                        <h1 className="flex gap-5 text-3xl font-bold mb-2 text-[#004AAD] text-left">Update Your Details <GrUpdate /></h1>
                        <p className="text-black-600 mb-14 text-left">Make changes to your account information here.</p>
                        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block text-sm text-black-700 font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="email" className="block text-sm text-black-700 font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-black-700 mb-1">Gender</label>
                                <div className="mt-1 flex space-x-4">
                                    <label htmlFor="male" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            className="hidden peer"
                                            value="male"
                                            {...register("gender")}
                                        />
                                        <span className="px-6 py-2 border border-black-300 rounded-lg text-black-700 peer-checked:bg-[#004AAD] peer-checked:text-white peer-checked:border-transparent hover:bg-black-100 transition-colors duration-200">
                                            Male
                                        </span>
                                    </label>

                                    <label htmlFor="female" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            {...register("gender")}
                                            className="hidden peer"
                                        />
                                        <span className="px-6 py-2 border border-black-300 rounded-lg text-black-700 peer-checked:bg-[#004AAD] peer-checked:text-white peer-checked:border-transparent hover:bg-black-100 transition-colors duration-200">
                                            Female
                                        </span>
                                    </label>

                                    <label htmlFor="other" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            id="other"
                                            name="gender"
                                            value="other"
                                            {...register("gender")}
                                            className="hidden peer"
                                        />
                                        <span className="px-6 py-2 border border-black-300 rounded-lg text-black-700 peer-checked:bg-[#004AAD] peer-checked:text-white peer-checked:border-transparent hover:bg-black-100 transition-colors duration-200">
                                            Other
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm text-black-700 font-medium mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    {...register("mobile")}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm text-black-700 font-medium mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    {...register("dob")}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="pincode" className="block text-sm text-black-700 font-medium mb-1">
                                    Pincode
                                </label>
                                <input
                                    type="number"
                                    id="pincode"
                                    {...register("pincode")}
                                    onWheel={(e) => e.target.blur()}
                                    required
                                    onChange={handlePinCodeChange}
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="bloodGroup" className="block text-sm text-black-700 font-medium mb-1">
                                    Blood Group
                                </label>
                                <input
                                    type="text"
                                    id="bloodGroup"
                                    {...register("bloodGroup")}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm text-black-700 font-medium mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    {...register("city")}
                                    required
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm text-black-700 font-medium mb-1">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    {...register("state")}
                                    required
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm text-black-700 font-medium mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    {...register("country")}
                                    required
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address" className="block text-sm text-black-700 font-medium mb-1">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    {...register("address")}
                                    required
                                    className="mt-1 resize-none block w-full px-4 py-2 border border-black-300 rounded-md"
                                    rows="2"
                                />
                            </div>
                            <div className="col-span-2">
                                <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-[#004AAD] to-[#0fa3d1] text-white rounded-md font-medium transition duration-200 shadow-lg">
                                    Update Details
                                </button>
                            </div>
                            <div className="col-span-2 mt-6 text-center">
                                <span className="text-sm text-black-700 font-medium">Need more assistance? </span>
                                <a href="#" className="text-sm text-[#004AAD] hover:underline font-medium">
                                    Contact Support
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserGeneralDetails