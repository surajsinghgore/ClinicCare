import { useCallback, useEffect, useState } from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import {
  downloadAppointmentPdfDataApi,
  downloadReportPdfDataApi,
  getAllAppointmentsActiveUserApi,
  searchUserAllAppointmentsApi,
} from "../../Utils/services/apis/User/AppointmentApi";
import { useDispatch } from "react-redux";
import { GenerateAppointmentPdf, GenerateTreatmentReportUserPdf } from "../../components/PDF/GenerateTreatmentPdf";

const AllAppointments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({
    appointmentNumber: "",
    txnId: "",
    appointmentDate: "",
    status: "",
  });
  const queryParams = new URLSearchParams(location.search);
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit"), 10) || 10);
  const [appointments, setAppointments] = useState([]);
  const [hashMore, setHashMore] = useState(false);

  const dataFetch = async (limitParam) => {
    try {
      dispatch(showLoader());
      const currentLimit = limitParam || limit;


      const res = await getAllAppointmentsActiveUserApi(currentLimit);
      if (res.status) {
        setHashMore(res.hasMore);
        setAppointments(res.appointments);
      } else {
        setAppointments([]);
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
  }, [limit]);

  const updateLimitInUrl = (newLimit) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("limit", newLimit);
    navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
  };

  const loadMoreData = () => {
    const newLimit = limit + 5;
    setLimit(newLimit);
    updateLimitInUrl(newLimit);
  };

  const downloadAppointmentDocPdf = async (appointmentId) => {
    try {
      dispatch(showLoader());
      const res = await downloadAppointmentPdfDataApi(appointmentId);
      GenerateAppointmentPdf(res.data);
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
  };

  const downloadReportDocPdf = async (appointmentId) => {
    try {
      dispatch(showLoader());
      const res = await downloadReportPdfDataApi(appointmentId);
      GenerateTreatmentReportUserPdf(res.data);
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
  };


  const searchFetch = useCallback(async () => {
    try {
      dispatch(showLoader());
      // Destructure searchParams correctly
      const { appointmentNumber, txnId, appointmentDate, status } =
        searchParams;

      // Call the API function with the current search parameters
      const res = await searchUserAllAppointmentsApi(
        appointmentNumber,
        txnId,
        appointmentDate,
        status
      );
      console.log(res)
      if (res?.status) {
        setAppointments(res.data);
      }
    } catch (error) {
      console.error("Error searching appointments:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, limit, searchParams]);
  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    searchFetch();
  };
  return (
    <>
      {/* Search Input */}
      <div className="mt-16 mb-7 flex space-x-4">
        <input
          type="text"
          placeholder="Appointment Number ..."
          className="border border-black-300 rounded-md px-3 py-1 w-full"
          name="appointmentNumber"
          value={searchParams.appointmentNumber}
          onChange={handleSearchChange}
        />

        <input
          type="text"
          placeholder="Transaction Id..."
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="txnId"
          value={searchParams.txnId}
          onChange={handleSearchChange}
        />

        <input
          type="date"
          placeholder="Appointment Date..."
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="appointmentDate"
          value={searchParams.appointmentDate}
          onChange={handleSearchChange}
        />
        <select
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="status"
          value={searchParams.status}
          onChange={handleSearchChange}>
          <option value="">select status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="btn">
          <button
            className="rounded bg-[#116AEF] px-7 py-2 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mt-7 mb-6 flex items-center gap-3 text-black-800">
        All Appointments <BsCalendarDateFill />
      </h1>
      {console.log(appointments)}
      {appointments.length === 0 ? (
        // No appointments scenario
        <div className="text-center mt-10">
          <p className="text-lg text-black-600">No appointments found.</p>

        </div>
      ) : (
        // Show appointments in a table
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-black-300">
            <thead>
              <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700 border-b font-bold uppercase">
                <th className="p-4 text-sm tracking-wide">#ID</th>
                <th className="p-4 text-sm tracking-wide">Doctor Name</th>
                <th className="p-4 text-sm tracking-wide">Date</th>
                <th className="p-4 text-sm tracking-wide">Time</th>
                <th className="p-4 text-sm tracking-wide">Transaction ID</th>
                <th className="p-4 pr-16 text-sm text-center tracking-wide">Status</th>
                <th className="p-4 pr-16 text-sm text-center tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId} className="border-b border-black-300">
                  <td className="p-4 text-black-800 text-[0.95rem]">{appointment?.appointmentNumber}</td>
                  <td className="p-4 flex items-center gap-3">
                    <Link to={`/doctor-details/${appointment?.doctor?.doctorId}`}>
                      <img
                        src={appointment?.doctor?.profileUrl}
                        alt={appointment?.doctorName}
                        className="w-12 h-12 rounded-md"
                      />
                    </Link>
                    <Link to={`/doctor-details/${appointment?.doctor?.doctorId}`}>
                      <span className="font-medium text-black-700 text-[0.95rem]">
                        {appointment?.doctor?.name}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 text-black-600 text-[0.95rem]">{appointment?.appointmentDate}</td>
                  <td className="p-4 text-black-600 text-[0.95rem]">{appointment?.appointmentTime}</td>
                  <td className="p-4 text-black-600 text-[0.95rem]">{appointment?.txnId}</td>
                  <td className="p-4 text-black-600 text-[0.95rem]">
                    <div
                      className={`px-3 py-1 rounded-md text-center text-white ${appointment?.appointmentStatus === "completed"
                        ? "bg-success"
                        : appointment?.appointmentStatus === "rejected"
                          ? "bg-danger"
                          : appointment?.appointmentStatus === "pending"
                            ? "bg-warning"
                            : ""
                        }`}
                    >
                      {appointment?.appointmentStatus}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {appointment?.appointmentStatus === "pending" ? (
                        <button
                          className="bg-blue-600 text-white font-medium px-3 py-2 text-sm rounded-md hover:bg-blue-700"
                          onClick={() => downloadAppointmentDocPdf(appointment?.appointmentId)}
                        >
                          Download Appointment
                        </button>
                      ) : (
                        <>
                          {(appointment?.appointmentStatus !== "rejected") ? <Link to={`/user/user-appointment-details/${appointment?.patientTreatmentId}`}>

                            <button
                              className="bg-blue-600 text-white font-medium px-3 py-2 text-sm rounded-md hover:bg-blue-700"

                            >
                              View
                            </button>
                          </Link>
                            : <Link to={`/user/user-reject-details/${appointment?.appointmentId}`}><button
                              className="bg-blue-600 text-white font-medium px-3 py-2 text-sm rounded-md hover:bg-blue-700"

                            >
                              View
                            </button></Link>}

                          {(appointment?.appointmentStatus !== "rejected") && <button
                            className="bg-blue-600 text-white font-medium px-3 py-2 text-sm rounded-md hover:bg-blue-700"
                            onClick={() => downloadReportDocPdf(appointment?.appointmentId)}
                          >
                            View Report
                          </button>}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(hashMore) && <>
            <div className="flex items-center justify-center mt-4">
              <button className="text-white px-5 py-1 bg-[#034EB0] rounded-lg" onClick={() => loadMoreData()}>Load More</button>
            </div>
          </>}
        </div>

      )}


    </>
  );
};

export default AllAppointments;
