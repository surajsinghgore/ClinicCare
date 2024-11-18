import { BsCalendarDateFill } from "react-icons/bs";
import { downloadAppointmentPdfDataApi, downloadReportPdfDataApi, getTodayAppointmentsActiveUserApi } from "../../Utils/services/apis/User/AppointmentApi";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GenerateAppointmentPdf, GenerateTreatmentReportUserPdf } from "../../components/PDF/GenerateTreatmentPdf";

const TodaysAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Used for navigation
  const [appointments, setAppointments] = useState([]);

  // Fetch today's appointments
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getTodayAppointmentsActiveUserApi();
      if (res?.status) {
        setAppointments(res.appointments);
      } else {
        setAppointments([]); // Ensure appointments is empty on failure
      }
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          message: error?.response?.data?.message || "Failed to fetch appointments",
          type: "failed",
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);




  const downloadAppointmentDocPdf = async (appointmentId) => {
    try {
      dispatch(showLoader());
      let res = await downloadAppointmentPdfDataApi(appointmentId);
      GenerateAppointmentPdf(res.data)
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          message: error?.response?.data?.message,
          type: "failed",
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  }





  const downloadReportDocPdf = async (appointmentId) => {
    try {
      dispatch(showLoader());
      let res = await downloadReportPdfDataApi(appointmentId);
      GenerateTreatmentReportUserPdf(res.data)
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          message: error?.response?.data?.message,
          type: "failed",
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  }
  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-semibold mt-20 mb-6 flex items-center gap-3 text-black-800">
        Your Appointments Today <BsCalendarDateFill />
      </h1>

      {appointments.length === 0 ? (
        // No appointments scenario
        <div className="text-center mt-10">
          <p className="text-lg text-black-600">No appointments booked for today.</p>
          <button
            onClick={() => navigate("/our-doctors")}
            className="mt-6 bg-blue-600 text-white font-medium px-6 py-2 text-sm rounded-md hover:bg-blue-700"
          >
            Book Appointment Today
          </button>
        </div>
      ) : (
        // Show appointments in a table
        <div className="overflow-x-auto border border-black-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700 border-b font-bold uppercase">
                <th className="p-4 text-sm tracking-wide">#ID</th>
                <th className="p-4 text-sm tracking-wide">Doctor Name</th>
                <th className="p-4 text-sm tracking-wide">Date</th>
                <th className="p-4 text-sm tracking-wide">Time</th>
                <th className="p-4 text-sm tracking-wide">Transaction ID</th>
                <th className="p-4 pr-16 text-sm text-center tracking-wide">Clinic</th>
                <th className="p-4 pr-16 text-sm text-center tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId} className="border-b border-black-300">
                  <td className="p-4 text-black-800 text-[0.95rem]">{appointment.appointmentNumber}</td>
                  <td className="p-4 flex items-center gap-3">
                    <Link to={`/doctor-details/${appointment?.doctor?.doctorId}`} >

                      <img
                        src={appointment?.doctor?.profileUrl}
                        alt={appointment.doctorName}
                        className="w-12 h-12 rounded-xl"
                      />
                    </Link>
                    <Link to={`/doctor-details/${appointment?.doctor?.doctorId}`} >
                      <span className="font-medium text-black-700 text-[0.95rem]">
                        {appointment?.doctor?.name}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 text-black-600 text-[0.95rem]">{appointment.appointmentDate}</td>
                  <td className="p-4 text-black-600 text-[0.95rem]">{appointment.appointmentTime}</td>
                  <td className="p-4 text-black-600 text-[0.95rem]">{appointment.txnId}</td>
                  <td className="p-4">
                    <Link to={`/about-clinic/${appointment.clinicId}`}>

                      <button className="bg-blue-600 text-white font-medium px-2 py-2 text-sm rounded-md hover:bg-blue-700">
                        View Clinic
                      </button>
                    </Link>
                  </td>
                  <td className="p-4">
                    {(appointment?.appointmentStatus === "pending") ? <button className="bg-blue-600 text-white font-medium px-2 py-2 text-sm rounded-md hover:bg-blue-700" onClick={() => downloadAppointmentDocPdf(appointment.appointmentId)}>
                      Download Appointment
                    </button> : <button className="bg-blue-600 text-white font-medium px-2 py-2 text-sm rounded-md hover:bg-blue-700" onClick={() => downloadReportDocPdf(appointment.appointmentId)} >
                      Download Report
                    </button>}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodaysAppointments;
