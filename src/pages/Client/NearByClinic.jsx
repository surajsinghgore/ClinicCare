import { useEffect, useState } from "react";
import { FaDirections } from "react-icons/fa";
import ClinicMapComponent from "../../components/ClinicMapComponent";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import findclinic from "../../../src/assets/findclinic.png";
import {
  findAllClinicInMapApi,
  findNearbyClinicsApi,
} from "../../Utils/services/apis/CommonApi";
import NearByClinicImagesCard from "../../components/Swiper/NearByClinicImagesCard";
import { Link } from "react-router-dom";
import { FaLocationPin, FaUserDoctor } from "react-icons/fa6";

const NearByClinic = () => {
  const dispatch = useDispatch();
  const [mapData, setMapData] = useState([]);
  const [status, setStatus] = useState(false);
  const [cardData, setCardData] = useState([]);
  const fetchAllClinics = async () => {
    try {
      dispatch(showLoader());
      const res = await findAllClinicInMapApi();
      if (res?.status) {
        setMapData(res.data);
      } else {
        setMapData([]);
      }
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({ message: "Error fetching clinics.", type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  // Fetch clinics near the user's location
  const fetchNearbyClinics = async (latitude, longitude) => {
    try {
      dispatch(showLoader());
      const res = await findNearbyClinicsApi(latitude, longitude);
      if (res?.status) {
        if (res.data.length !== 0) {
          setCardData(res.data);
          setMapData(res.data);
          setStatus(true);
          dispatch(
            showAlert({
              message: "Nearby clinics fetched successfully.",
              type: "success",
            })
          );
        } else {
          setStatus(false);

          dispatch(
            showAlert({
              message: "No Nearby clinics Found In 5 Km Radius .",
              type: "warning",
            })
          );
        }
      } else {
        setCardData([]);
        dispatch(
          showAlert({ message: "No nearby clinics found.", type: "failed" })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({ message: "Error fetching nearby clinics.", type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      dispatch(
        showAlert({
          message: "Geolocation is not supported by your browser.",
          type: "failed",
        })
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyClinics(latitude, longitude); // Fetch nearby clinics
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          dispatch(
            showAlert({
              message: "Please allow location permissions in your browser.",
              type: "failed",
            })
          );
        } else {
          dispatch(
            showAlert({
              message: "Error fetching location. Please try again.",
              type: "failed",
            })
          );
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Fetch all clinics on component mount
  useEffect(() => {
    fetchAllClinics();
  }, []);
  const openGoogleMaps = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <div className="banner mb-10">
        <img
          src={findclinic}
          alt="Clinic Banner"
          className="w-full object-cover shadow-lg"
        />
      </div>
      <div className="my-10">
        <div className="relative w-[90%] m-auto z-0">
          {/* Pass clinic data to the map component */}
          <ClinicMapComponent clinicData={mapData} status={status} />
        </div>

        <div className="my-4">
          <div className="w-[90%] m-auto">
            <div className="flex justify-center">
              {/* Button to fetch user's location and nearby clinics */}
              <button
                className="bg-info px-4 cursor-pointer rounded mt-5 text-white py-2"
                onClick={() => getCurrentLocation()}
              >
                Allow Location To Fetch Near By Clinics
              </button>
            </div>

            {/* Display the list of clinics */}
            {status ? (
              <>
                <div className="clinics">
                  <h3 className="text-lg mt-4 text-info font-medium">
                    Near By Clinics In 10 Km Range
                  </h3>
                  <div className="mt-3 flex flex-wrap justify-between gap-10">
                    {cardData.length ? (
                      cardData.map((clinic) => (
                        <div
                          key={clinic._id}
                          className="w-[48%] border border-black-200 p-2 mb-2"
                        >
                          <div className="images shadow-md w-[97%] m-auto mt-3">
                            <NearByClinicImagesCard
                              Images={clinic.clinicPhotos}
                            />
                          </div>
                          <div className="my-4 w-[97%] m-auto">
                            <h4 className="text-md font-bold text-md flex items-center gap-1"><FaLocationPin className="text-2xl text-blue-700" />{clinic.name}</h4>
                            <p className="mt-3">{clinic.address}</p>
                            <p className="my-1">
                                <Link className="flex item-center gap-2 capitalize"
                                  to={`/doctor-details/${clinic.doctorId._id}`}
                                >
                                  <FaUserDoctor className="text-xl" />{clinic.doctorId.name}
                                </Link>
                            </p>
                            <p className="my-2 mb-4">
                              <strong>{clinic.todayStatus}</strong>
                            </p>

                            <div className="flex gap-4">
                              <button
                                className="flex items-center gap-1 py-2"
                                onClick={() =>
                                  openGoogleMaps(clinic?.lat, clinic?.long)
                                }
                              >
                                <FaDirections className="text-3xl text-blue-700" />{" "}
                                Get Direction
                              </button>
                              <Link
                                to={`/about-clinic/${clinic?._id}`}
                                className="px-10 font-medium border-2 flex items-center justify-center border-black-400 rounded-md text-blue-700 hover:bg-blue-700 hover:border-blue-700 hover:text-white duration-200"
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No clinics found In 10 Km Range.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-info font-medium">Allow Location to Fetch Clinic in 10 km range</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NearByClinic;
