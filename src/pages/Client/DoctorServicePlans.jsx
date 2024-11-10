import React, { useEffect, useState } from 'react';
import { getServicesByDoctorIdApi } from '../../Utils/services/apis/User/ServiceApi';
import { Link, useParams } from 'react-router-dom';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { useDispatch } from 'react-redux';

const DoctorServicePlans = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [service, setService] = useState([])
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getServicesByDoctorIdApi(id);
      if (res?.success) {

        setService(res.data)

      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch()
  }, [])


  const openGoogleMaps = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };
  return (
    <div className="w-[90%] mx-auto p-8 mt-14 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-4 text-black-800">Choose Your Service from <Link to={`/doctor-details/${service?.doctor?._id}`} className='hover:text-danger'>

        {service?.doctor?.name} </Link></h2>
      <p className="text-center text-black-500 mb-10 text-lg">
        Choose the service that suits your needs best.
      </p>

      <div className="flex items-start justify-start gap-8 flex-wrap">
        {/* Basic Plan */}
        {service?.services && (
          <>
            {service?.services.map((details) => (
              <div
                key={details._id} // Add a unique key for each mapped element
                className="w-[31.5%] p-6 bg-white border border-black-200 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300 ease-out"
              >
                <h3 className="text-2xl font-semibold mb-2 text-black-800">{details.treatmentName}</h3>
                <p className="text-black-500 mb-6">{details.description}</p>
                <p className="text-3xl font-bold mb-8 text-blue-600">
                  ${details.fees} <span className="text-lg font-medium text-black-500">/ {details.duration} min</span>
                </p>
                <ul className="mb-8 space-y-3 text-black-600">
                  <li>specialty: {details.specialty}</li>
                  <li>clinic name: {details.clinicId.name}</li>
                  <li onClick={() => openGoogleMaps(details.clinicId.lat, details.clinicId.long)} className='cursor-pointer'>location: {details.clinicId.city} {details.clinicId.state}, {details.clinicId.country}</li>
                </ul>
                <Link to={`/user/book-appointment-form/${details._id}`} className="px-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200">
                  Book Appointment
                </Link>
              </div>
            ))}
          </>
        )}


      </div>
    </div>
  );
};

export default DoctorServicePlans;
