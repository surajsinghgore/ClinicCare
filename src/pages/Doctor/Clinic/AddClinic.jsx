import { FaHospitalUser, FaImages, FaAddressBook, FaPhoneSquare } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { BiSolidClinic } from "react-icons/bi";
import { IoMdLocate } from "react-icons/io";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { addClinicPhase1Api } from "../../../Utils/services/apis/Doctor/ClinicDoctorApi";
import { clinicDataValidatorPhase1 } from "../../../Utils/services/FormValidation/DoctorValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchMyClinicById } from "../../../redux/Slices/GetMyClinicByIdSlice";
import { getLocalStorage, setLocalStorage } from "../../../Utils/LocalStorage";
import MapComponent from "../../../components/MapComponent";

const AddClinic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cord, setCord] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(clinicDataValidatorPhase1) });

  const [coords, setCoords] = useState(null);
  const [locationData, setLocationData] = useState({});
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const clinicDetails = useSelector((state) => state.getMyClinicById?.clinicDetails);

  useEffect(() => {
    const clinicId = getLocalStorage("clinicId");
    if (clinicId) {
      dispatch(fetchMyClinicById(clinicId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (clinicDetails) {
      setValue("name", clinicDetails.data.name);
      setValue("address", clinicDetails.data.address);
      setValue("contactNumber", clinicDetails.data.contactNumber);
      setLocationData(clinicDetails.data.fullAddress);
      setCoords({ lat: clinicDetails.data.lat, long: clinicDetails.data.long });
      setValue("city", clinicDetails.data.city || ""); // Populate city
      setValue("state", clinicDetails.data.state || ""); // Populate state
      setValue("pincode", clinicDetails.data.fullAddress.postcode || ""); // Populate state
      setValue("country", clinicDetails.data.country || ""); // Populate country
      setValue("lat", clinicDetails.data.lat || ""); // Populate country
      setValue("long", clinicDetails.data.long || ""); // Populate country
      setIsLocationFetched(true); // Enable location fetched state
    }
  }, [clinicDetails, dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
    }
  }, [errors]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      dispatch(showAlert({ message: "Geolocation is not supported by your browser.", type: "failed" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCoords({ latitude, longitude });
        getLocationFromLatLong(latitude, longitude);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          dispatch(showAlert({ message: "Please allow location permissions in your browser.", type: "failed" }));
        } else {
          dispatch(showAlert({ message: "Error fetching location. Please try again.", type: "failed" }));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const getLocationFromLatLong = async (latitude, longitude) => {
    // Use the passed latitude and longitude values instead of hardcoded values
    const lat = latitude;
    const lng = longitude;

    dispatch(showLoader());

    // Construct the API URL
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

    try {
      const response = await fetch(apiUrl);

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Check if the data contains address details
      if (data && data.address) {
        dispatch(showAlert({ message: "Location fetched successfully.", type: "success" }));

        // Populate form fields with fetched data
        setLocationData(data.address);
        setIsLocationFetched(true);
        setValue("city", data.address.city || data.address.town || data.address.village || ""); // Handle city/town/village
        setValue("state", data.address.state || data.address.city_district || data.address.state_district || ""); // Populate state field
        setValue("country", data.address.country || ""); // Populate country field
        setValue("pincode", data.address.postcode || ""); // Populate postcode field
        setValue("lat", lat || ""); // Populate latitude field
        setValue("long", lng || ""); // Populate longitude field
      } else {
        dispatch(showAlert({ message: "Unable to fetch location details.", type: "failed" }));
      }
    } catch (error) {
      console.error("Geocoding error: ", error);
      dispatch(showAlert({ message: "Error fetching location details.", type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  const onSubmit = async (formData) => {
    if (!coords) {
      dispatch(showAlert({ message: "Please allow location to fetch your clinic location data.", type: "warning" }));
      return;
    }

    if (!locationData || Object.keys(locationData).length === 0) {
      dispatch(showAlert({ message: "Something went wrong while fetching clinic data. Please try again.", type: "warning" }));
      return;
    }

    let payload;

    if (getLocalStorage("clinicId")) {
      payload = {
        clinicId: getLocalStorage("clinicId"),
        ...formData,
        fullAddress: locationData,
      };
    } else {
      payload = {
        ...formData,
        fullAddress: locationData,
      };
    }
    dispatch(showLoader());

    try {
      let res = await addClinicPhase1Api(payload);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        setTimeout(() => {
          setLocalStorage("clinicId", res.clinicId);
          navigate(`/doctor/add-clinic-page2/${res.clinicId}`);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to add clinic. Please try again.";
      dispatch(showAlert({ message: errorMessage, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    if (cord) {
      getLocationFromLatLong(cord?.latitude, cord?.longitude);
    }
  }, [cord]);
  return (
    <div>
      <BreadCrumbs currentPath="Add Clinic" />
      <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
        <div className="flex p-3 border-b border-black-400 bg-white">
          <div className="flex gap-10 p-4 select-none">
            <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
              <FaHospitalUser className="text-blue-500 text-2xl" />
              <span className="text-blue-500 font-medium">Clinic Details</span>
            </div>
            <div className="flex items-center gap-2">
              <CiCalendarDate className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <FaImages className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Upload File</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap p-8 gap-8">
            <div className="flex flex-col gap-2 mr-8">
              <label className="text-black-500 font-medium" htmlFor="clinicName">
                Clinic Name <span className="text-danger text-lg">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="clinicName"
                  {...register("name")}
                  required
                  autoComplete="off"
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter clinic name"
                />
                <BiSolidClinic className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mr-8">
              <label className="text-black-500 font-medium" htmlFor="address">
                Full Clinic Address <span className="text-danger text-lg">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  autoComplete="off"
                  {...register("address")}
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter clinic address"
                />
                <FaAddressBook className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black-500 font-medium" htmlFor="contactNumber">
                Contact Number <span className="text-danger text-lg">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  required
                  autoComplete="off"
                  {...register("contactNumber")}
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter contact number"
                />
                <FaPhoneSquare className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="mt-5 w-full ">
              <h3 className=" text-black-500 font-medium mb-2 ">
                {!isLocationFetched ? (
                  <>
                    {" "}
                    Location <span className="text-danger text-lg">*</span>
                  </>
                ) : (
                  <>
                    Re Fetch Location <span className="text-danger text-lg">*</span>
                  </>
                )}
              </h3>
              <div className="location w-full p-3 rounded-lg border border-black-300 cursor-pointer" onClick={() => getCurrentLocation()}>
                <div className="icon&text flex items-center gap-3 ">
                  <IoMdLocate className="text-[#EF4F5F] text-md" />
                  <h3 className="text-lg text-[#EF4F5F]">Detect current location</h3>
                </div>
                <div className="text-left pl-7">
                  <p className="text-sm text-black-300">Using GPS</p>
                </div>
              </div>
            </div>

            {isLocationFetched && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-black-500 font-medium" htmlFor="city">
                    City <span className="text-danger text-lg">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      {...register("city")}
                      required
                      autoComplete="off"
                      className="border border-black-300 p-2 rounded-md w-80 pl-10"
                      placeholder="Enter city"
                      // value={locationData.city || ''} // Populate with location data
                    />
                    <IoMdLocate className="absolute left-3 top-3 text-black-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black-500 font-medium" htmlFor="state">
                    State <span className="text-danger text-lg">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      {...register("state")}
                      required
                      autoComplete="off"
                      className="border border-black-300 p-2 rounded-md w-80 pl-10"
                      placeholder="Enter state"
                      // value={locationData.city_district || ''} // Populate with location data
                    />

                    <IoMdLocate className="absolute left-3 top-3 text-black-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black-500 font-medium" htmlFor="country">
                    Country <span className="text-danger text-lg">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      {...register("country")}
                      required
                      autoComplete="off"
                      className="border border-black-300 p-2 rounded-md w-80 pl-10"
                      placeholder="Enter country"
                      // value={locationData.country || ''} // Populate with location data
                    />
                    <IoMdLocate className="absolute left-3 top-3 text-black-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black-500 font-medium" htmlFor="Pincode">
                    Pincode <span className="text-danger text-lg">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lat"
                      id="Pincode"
                      // value={coords?.latitude || ''}
                      readOnly={!isLocationFetched}
                      {...register("pincode")}
                      className="border border-black-300 p-2 rounded-md w-80 pl-10"
                      placeholder="Enter Pincode"
                    />
                    <IoMdLocate className="absolute left-3 top-3 text-black-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black-500 font-medium" htmlFor="latitude">
                    Latitude <span className="text-danger text-lg">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lat"
                      id="latitude"
                      // value={coords?.latitude || ''}
                      readOnly={true}
                      {...register("lat")}
                      className="border border-black-300 p-2 rounded-md w-80 pl-10"
                      placeholder="Enter latitude"
                    />
                    <IoMdLocate className="absolute left-3 top-3 text-black-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black-500 font-medium" htmlFor="longitude">
                    Longitude <span className="text-danger text-lg">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="long"
                      id="longitude"
                      // value={coords?.longitude || ''}
                      readOnly={true}
                      {...register("long")}
                      className="border border-black-300 p-2 rounded-md w-80 pl-10"
                      placeholder="Enter longitude"
                    />
                    <IoMdLocate className="absolute left-3 top-3 text-black-400" />
                  </div>
                </div>

                <MapComponent cord={cord} setCord={setCord} selectedCord={coords} />
              </>
            )}
          </div>

          <div className="flex  justify-end mt-4  ">
            <button type="submit" className="px-4 py-2 bg-green-500 bg-primary text-white rounded-md">
              {clinicDetails ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClinic;
