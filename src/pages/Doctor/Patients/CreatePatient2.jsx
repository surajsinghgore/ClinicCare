import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaUser, FaEnvelope, FaPhone, FaTint } from "react-icons/fa";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { getPatientDetailsApi } from "../../../Utils/services/apis/Doctor/PatientApi";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLocalStorage, getLocalStorage } from "../../../Utils/LocalStorage";

const CreatePatient2 = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState(null);

  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [fees, setFees] = useState(0);

  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getPatientDetailsApi(userId);

      if (res?.status) {
        setPatientData(res?.data);  // Store the fetched data in state
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  // Effect to fetch patient data when the component mounts and check localStorage
  useEffect(() => {
    // Fetch patient data only if not already fetched
    if (!patientData) {
      dataFetch();
    }

    // Check if there is existing appointment data in local storage and load it
    const storedData = getLocalStorage("tempAppointmentData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setSelectedClinic(parsedData.clinicId || "");
      setSelectedService(parsedData.serviceId || "");
      setSelectedDate(parsedData.date || "");
      setSelectedTime(parsedData.time || "");

      // If patientData is loaded, set the selected service fees
      if (patientData) {
        const selected = patientData?.serviceData?.find(service => service._id === parsedData.serviceId);
        if (selected) {
          setFees(selected.fees);
        }
      }
    }
  }, [patientData]); // This effect runs only when `patientData` is updated

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);

    // Find the selected service from the available services and set the fee
    const selected = patientData?.serviceData?.find(service => service._id === serviceId);
    if (selected) {
      setFees(selected.fees); // Set the fees for the selected service
    } else {
      setFees(0); // Reset to 0 if no service is selected
    }
  };

  const handleNextButtonClick = () => {
    let errorMessage = '';

    if (!selectedClinic) {
      errorMessage = 'Please select a clinic.';
    } else if (!selectedService) {
      errorMessage = 'Please select a service.';
    } else if (!selectedDate) {
      errorMessage = 'Please select an appointment date.';
    } else if (!selectedTime) {
      errorMessage = 'Please select an appointment time.';
    }

    if (errorMessage) {
      dispatch(showAlert({ message: errorMessage, type: "failed" }));
      return;
    }

    const appointmentData = {
      userId,
      clinicId: selectedClinic,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      fees,
    };

    setLocalStorage("tempAppointmentData", JSON.stringify(appointmentData));
    navigate(`/doctor/create-patient-form3`);
  };

  return (
    <>
      <BreadCrumbs currentPath={"Create Patient"} />
      <div className="p-6">
        {/* Section 1: Patient General Details */}
        {patientData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Patient General Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <label className="text-sm font-medium text-black-600 mb-1 block">Patient Name</label>
                <input
                  type="text"
                  value={patientData.userData.name}
                  readOnly
                  className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
                />
                <FaUser className="absolute top-11 left-3 text-black-400" />
              </div>
              <div className="relative">
                <label className="text-sm font-medium text-black-600 mb-1 block">Email</label>
                <input
                  type="email"
                  value={patientData.userData.email}
                  readOnly
                  className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
                />
                <FaEnvelope className="absolute top-11 left-3 text-black-400" />
              </div>
              <div className="relative">
                <label className="text-sm font-medium text-black-600 mb-1 block">Phone</label>
                <input
                  type="text"
                  value={patientData.userData.mobile}
                  readOnly
                  className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
                />
                <FaPhone className="absolute top-11 left-3 text-black-400" />
              </div>
              <div className="relative">
                <label className="text-sm font-medium text-black-600 mb-1 block">Blood Group</label>
                <input
                  type="text"
                  value={patientData.userData.bloodGroup}
                  readOnly
                  className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
                />
                <FaTint className="absolute top-11 left-3 text-black-400" />
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Select Clinic Details */}
        {patientData && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Select Clinic Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-black-600 mb-1 block">Select Clinic</label>
                <select
                  className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none"
                  value={selectedClinic}
                  onChange={(e) => setSelectedClinic(e.target.value)}
                >
                  <option value="">Select a clinic</option> {/* Default select option */}
                  {patientData.clinicData.map((clinic) => (
                    <option key={clinic._id} value={clinic._id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-black-600 mb-1 block">Select Service</label>
                <select
                  className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none"
                  value={selectedService}
                  onChange={handleServiceChange} // Handle service selection
                >
                  <option value="">Select a service</option> {/* Default select option */}
                  {patientData.serviceData.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.treatmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-black-600 mb-1 block">Appointment Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Set min date to today
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black-600 mb-1 block">Appointment Time</label>
                <input
                  type="time"
                  className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  min={new Date().toTimeString().slice(0, 5)} // Set min time to current time
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Doctor / Platform Fees */}
        {patientData && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Doctor / Platform Fees</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-black-600 mb-1 block">Fees</label>
                <input
                  type="text"
                  value={fees}
                  readOnly
                  className="w-full p-3 border border-black-300 rounded-md bg-black-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black-600 mb-1 block">Platform Fees</label>
                <input
                  type="text"
                  value={patientData.platformFee[0]?.fees || "0"}
                  readOnly
                  className="w-full p-3 border border-black-300 rounded-md bg-black-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition"
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePatient2;
