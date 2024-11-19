import { Link, useNavigate } from "react-router-dom";
import book from "../../assets/bookappointment2.png";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  getSpecialtiesByTreatmentApi,
  getTreatmentNamesByCityApi,
  getUniqueCitiesApi,
  getDoctorsByCityTreatmentAndSpecialtyApi,
} from "../../Utils/services/apis/CommonApi";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";

const BookAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  useEffect(() => {
    const fetchCitiesData = async () => {
      dispatch(showLoader());
      try {
        const res = await getUniqueCitiesApi();
        if (res?.success) {
          setCity(res.data.cities);
          setData(res.data.doctors);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoader());
      }
    };
    fetchCitiesData();
  }, []);

  const handleCityChange = async (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setSelectedTreatment("");
    setSelectedSpecialty("");
    setSpecialties([]);

    if (city) {
      dispatch(showLoader());
      try {
        const res = await getTreatmentNamesByCityApi(city);
        if (res?.success) {
          setTreatments(res.data.treatments);
          setData(res.data.doctors);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoader());
      }
    } else {
      const fetchCitiesData = async () => {
        dispatch(showLoader());
        try {
          const res = await getUniqueCitiesApi();
          if (res?.success) {
            setCity(res.data.cities);
            setData(res.data.doctors);
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(hideLoader());
        }
      };
      fetchCitiesData();
    }
  };

  const handleTreatmentChange = async (event) => {
    const treatment = event.target.value;
    setSelectedTreatment(treatment);
    setSelectedSpecialty("");

    if (treatment) {
      dispatch(showLoader());
      try {
        const res = await getSpecialtiesByTreatmentApi(selectedCity, treatment);
        if (res?.success) {
          setSpecialties(res.data.specialties);
          setData(res.data.doctors);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  const handleSpecialtyChange = async (event) => {
    const specialty = event.target.value;
    setSelectedSpecialty(specialty);

    if (specialty) {
      dispatch(showLoader());
      try {
        const res = await getDoctorsByCityTreatmentAndSpecialtyApi(
          selectedCity,
          selectedTreatment,
          specialty
        );
        if (res?.success) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  return (
    <>
      <div className="img w-75%">
        <img src={book} alt="Book Appointment" />
      </div>

      <div className="search w-full py-6">
        <h2 className="text-center text-3xl font-semibold text-black-700 mb-7 mt-14">
          Search for Doctor or Clinic
        </h2>

        <div className="flex justify-center items-center space-x-4 mb-14 mt-10">
          <select
            className="bg-white w-1/5 rounded shadow-md px-4 py-3 outline outline-2 outline-[#0148B1]"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="">Select City</option>
            {city.length !== 0 &&
              city.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
          </select>

          <select
            className="bg-white w-1/5 rounded shadow-md px-4 py-3 outline outline-2 outline-[#0148B1]"
            value={selectedTreatment}
            onChange={handleTreatmentChange}
            disabled={!selectedCity}
          >
            <option value="">Select Treatment</option>

            {treatments.length !== 0 &&
              treatments.map((treatment, index) => (
                <option key={index} value={treatment}>
                  {treatment}
                </option>
              ))}
          </select>

          <select
            className="bg-white w-1/5 rounded shadow-md px-4 py-3 outline outline-2 outline-[#0148B1]"
            value={selectedSpecialty}
            onChange={handleSpecialtyChange}
            disabled={!selectedTreatment}
          >
            <option value="">Select Specialty</option>
            {specialties.length !== 0 &&
              specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
          </select>
        </div>

        <div className="w-4/5 mx-auto mt-8 space-y-10">
          {data.length === 0 ? (
            <p className="text-center text-xl text-red-500">No Data Found</p>
          ) : (
            data.map((doctor, index) => (
              <div
                key={index}
                className="doctor-card flex items-start py-8 bg-white p-4 shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <Link
                  to={`/doctor-details/${doctor.doctorId}`}
                  className="mt-5"
                >
                  <img
                    src={
                      doctor.profileUrl ||
                      "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt={doctor.doctorName || "Doctor Image"}
                    className="w-44 h-44 rounded-full object-cover cursor-pointer"
                    onClick={() => navigate("/doctor-details")}
                  />
                </Link>
                <div className="ml-4 flex-grow">
                  <Link to={`/doctor-details/${doctor.doctorId}`}>
                    <h3 className="text-xl font-semibold text-[#0148B1]">
                      {doctor.doctorName || "Dr. Unknown"}
                    </h3>
                  </Link>


                  <Link to={`/show-ratings/${doctor.doctorId}?limit=10&sortBy=latest`} className="cursor-pointer">
                  <div className="text-black-600 flex items-center mb-3">
                    <ReactStars
                      count={1}
                      value={5}
                      size={25}
                      color1={"#d1d1d1"}
                      color2={"rgb(247 133 35)"}
                      className="sizesofStar"
                      isHalf={true}
                      edit={false}
                    />
                    <span className="pl-1">{doctor?.avgRating}</span>
                  </div>
                  </Link>

                  <p className="text-black-600 flex items-center mb-3">
                    <FaLocationDot className="mr-1" />
                    {doctor.clinic?.address || "Unknown Address"},{" "}
                    {doctor.clinic?.city || "Unknown City"},{" "}
                    {doctor.clinic?.state || "Unknown State"}
                  </p>
                  <p className="text-black-600">
                    <span className="text-[#0148B1] font-semibold">
                      Treatment name:
                    </span>{" "}
                    {doctor.treatmentName || "Not Specified"}
                  </p>
                  <p className="text-black-600 mb-5">
                    <span className="text-[#0148B1] font-semibold">
                      Specialization:
                    </span>{" "}
                    {doctor.specialty || "Not Specified"}
                  </p>
                  <Link
                    to={`/user/book-appointment-form/${doctor.serviceId}`}
                    className="mt-4 px-4 py-2 text-white bg-[#0148B1] rounded-md shadow"
                  >
                    Book Appointment
                  </Link>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-black-600">
                    <span className="text-[#0148B1] font-semibold">
                      Experience:
                    </span>{" "}
                    {doctor.experience || "Not Available"} years
                  </p>
                  <p className="text-black-600">
                    <span className="text-[#0148B1] font-semibold">
                      Expertise:
                    </span>{" "}
                    {doctor.specialization || "Not Specified"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
