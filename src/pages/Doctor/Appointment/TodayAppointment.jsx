import { useCallback, useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { MdEditSquare } from "react-icons/md";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import {
  getDetailedTodayAppointmentsApi,
  getDetailedTodayAppointmentStatsApi,
  getTodayAppointmentByAppointmentNumber,
  getTodayAppointmentsBySearchApi,
  getTodayAppointmentsByTreatmentName,
  getTodayAppointmentsByUserName,
  searchTodayAppointmentsByTime,
} from "../../../Utils/services/apis/Doctor/AppointmentApi";

const TodayAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fact, setFact] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Search filters
  const [searchAppointmentNumber, setSearchAppointmentNumber] = useState("");
  const [searchPatientName, setSearchPatientName] = useState("");
  const [searchTreatmentName, setSearchTreatmentName] = useState("");
  const [searchTime, setSearchTime] = useState("");

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "searchAppointmentNumber") {
      setSearchAppointmentNumber(value);

      if (value == "") {
        dataFetch();
      } else {
        try {
          dispatch(showLoader());
          const res = await getTodayAppointmentByAppointmentNumber(value);
          if (res?.success) {
            setData(res.data);
          }
        } catch (error) {
          console.error("Error fetching clinics:", error);
        } finally {
          dispatch(hideLoader());
        }
      }
    } else if (name === "searchPatientName") {
      console.log("sasas");
      setSearchPatientName(value);

      if (value == "") {
        dataFetch();
      } else {
        try {
          dispatch(showLoader());
          const res = await getTodayAppointmentsByUserName(value);
          if (res?.success) {
            setData(res.data);
          }
        } catch (error) {
          console.error("Error fetching clinics:", error);
        } finally {
          dispatch(hideLoader());
        }
      }
    } else if (name === "searchTreatmentName") {
      setSearchTreatmentName(value);

      if (value == "") {
        dataFetch();
      } else {
        try {
          dispatch(showLoader());
          const res = await getTodayAppointmentsByTreatmentName(value);
          if (res?.success) {
            setData(res.data);
          }
        } catch (error) {
          console.error("Error fetching clinics:", error);
        } finally {
          dispatch(hideLoader());
        }
      }
    } else if (name === "searchTime") {
      setSearchTime(value);

      if (value == "") {
        dataFetch();
      } else {
        try {
          dispatch(showLoader());
          const res = await searchTodayAppointmentsByTime(value);
          if (res?.success) {
            setData(res.data);
          }
        } catch (error) {
          console.error("Error fetching clinics:", error);
        } finally {
          dispatch(hideLoader());
        }
      }
    }
    // handleSearch(value);
  };

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);
  const [type, setType] = useState(queryParams.get("type") || "total");
  const [currentPage, setCurrentPage] = useState(
    Number(queryParams.get("page") || 1)
  );
  const [totalPage, setTotalPage] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);

  // Fetch data function
  const dataFetch = useCallback(async () => {
    try {
      dispatch(showLoader());
      const res = await getDetailedTodayAppointmentsApi(
        currentPage,
        limit,
        type
      );
      const statsRes = await getDetailedTodayAppointmentStatsApi();
      setFact(statsRes.data);
      if (res?.success) {
        setData(res.data);

        setTotalPage(res.pagination.totalPages);
        setNext(res.pagination.hasNextPage);
        setPrev(res.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, currentPage, limit, type]);

  useEffect(() => {
    dataFetch();
  }, [limit, currentPage, type]);

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
    setCurrentPage(1); // Reset to page 1
    navigate(
      `/doctor/todays-appointment?limit=${newLimit}&page=${currentPage}&type=${type}`
    );
  };
  const handleTypeChange = (state) => {
    setType(state);
    setCurrentPage(1); // Reset to page 1
    navigate(
      `/doctor/todays-appointment?limit=${limit}&page=${currentPage}&type=${state}`
    );
  };

  const handlePrevPage = () => {
    if (prev && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(
        `/doctor/todays-appointment?limit=${limit}&type=${type}&page=${newPage}`
      );
    }
  };

  const handleNextPage = () => {
    if (next && currentPage < totalPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(
        `/doctor/todays-appointment?limit=${limit}&page=${newPage}&type=${type}`
      );
    }
  };

  return (
    <>
      <BreadCrumbs currentPath="Today's Appointment" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-red-600 font-semibold">
            Today&apos;s Appointment Records
          </h2>
          <div className="text-right">
            <span className="text-black-500">Today&apos;s Revenue : </span>
            <span className="text-red-600 font-semibold">
              ₹ {fact?.totalEarningsToday}
            </span>
          </div>
        </div>
        <div className="mt-4 mb-10 flex space-x-4">
          <input
            type="number"
            placeholder="Search Appointment Id ..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchAppointmentNumber"
            value={searchAppointmentNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Search Patient Name..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchPatientName"
            value={searchPatientName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Search Treatment Name..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchTreatmentName"
            value={searchTreatmentName}
            onChange={handleInputChange}
          />
          <div className="time-picker">
            <label
              htmlFor="timeSlot"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <input
              type="time"
              id="timeSlot"
              name="searchTime"
              value={searchTime}
              onChange={handleInputChange}
              className="border border-black-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="mt-4 mb-14 flex space-x-2">
          <div
            className={`${
              type === "all" ? "shadow-xl" : ""
            } text-white flex items-center justify-center font-medium cursor-pointer px-4 py-3 rounded-md text-center w-full bg-blue-400`}
            onClick={() => handleTypeChange("all")}
          >
            <p>Total: {fact?.totalOrders}</p>
          </div>

          <div
            className={`${
              type === "completed" ? "shadow-xl" : ""
            } text-white flex items-center justify-center font-medium cursor-pointer px-4 py-3 rounded-md text-center w-full bg-success`}
            onClick={() => handleTypeChange("completed")}
          >
            <p>Completed: {fact?.totalCompletedOrders}</p>
          </div>

          <div
            className={`${
              type === "pending" ? "shadow-xl" : ""
            } text-white flex items-center justify-center font-medium cursor-pointer px-4 py-3 rounded-md text-center w-full bg-warning`}
            onClick={() => handleTypeChange("pending")}
          >
            <p>Pending: {fact?.totalPendingOrdersNotDelayed}</p>
          </div>

          <div
            className={`${
              type === "rejected" ? "shadow-xl" : ""
            } text-white flex items-center justify-center font-medium cursor-pointer px-4 py-3 rounded-md text-center w-full bg-danger`}
            onClick={() => handleTypeChange("rejected")}
          >
            <p>Rejected: {fact?.totalRejectedOrders}</p>
          </div>

          <div
            className={`${
              type === "delayed" ? "shadow-xl" : ""
            } text-white flex items-center justify-center font-medium cursor-pointer px-4 py-3 rounded-md text-center w-full bg-cyan-400`}
            onClick={() => handleTypeChange("delayed")}
          >
            <p>Delayed: {fact?.totalDelayedOrders}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="topSelect flex items-center justify-between">
            <div className="flex gap-1">
              <p className="text-black-600 text-sm">Display</p>
              <select
                name="pages"
                id="pages"
                value={limit}
                onChange={handleLimitChange}
                className="bg-white border border-black-400 text-sm rounded-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <p className="text-black-600 text-sm">Records Per Page</p>
            </div>
          </div>
        </div>
        {/* Table for displaying appointment records */}
        <div className="overflow-x-auto">
          <h1 className="text-lg font-semibold">
            <span className="capitalize mr-1">{type}</span>
            Appointments
          </h1>
          <table className="min-w-full bg-white border border-black-300 rounded-md">
            <thead>
              <tr className="bg-black-200">
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  ID
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Patient Name
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Age
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Treatment
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Specialty
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Clinic Address
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Time
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Date
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                <>
                  {data.map((record) => (
                    <tr
                      key={record.appointmentId}
                      className="hover:bg-black-100"
                    >
                      {/* ID Field */}
                      <td className="px-4 text-sm py-2">
                        {record.appointmentNumber}
                      </td>

                      {/* Patient Name Field with Image */}
                      <td className="px-4 text-sm py-2 flex items-center">
                        <img
                          src={record.userProfileUrl}
                          alt="Patient"
                          className="w-16 h-16 rounded-full aspect-square object-cover mr-2"
                        />
                        {record.userName.length > 20
                          ? record.userName.slice(0, 20) + "..."
                          : record.userName}
                      </td>

                      {/* Age Field */}
                      <td className="px-4 text-center text-sm py-2">
                        {record.userDob
                          ? new Date().getFullYear() -
                            new Date(record.userDob).getFullYear()
                          : "N/A"}
                      </td>

                      {/* Treatment Name Field */}
                      <td className="px-4 text-center text-sm py-2">
                        {record.treatmentName.length > 15
                          ? record.treatmentName.slice(0, 15) + "..."
                          : record.treatmentName}
                      </td>

                      {/* Specialty Field */}
                      <td className="px-4 text-center text-sm py-2">
                        {record.specialty.length > 15
                          ? record.specialty.slice(0, 15) + "..."
                          : record.specialty}
                      </td>

                      {/* Clinic Address Field */}
                      <td className="px-4 text-center text-sm py-2">
                        {record.clinicAddress.length > 20
                          ? record.clinicAddress.slice(0, 20) + "..."
                          : record.clinicAddress}
                      </td>

                      {/* Time Field */}
                      <td className="px-4 text-center text-sm py-2">
                        {record.appointmentTime}
                      </td>

                      {/* Date Field */}
                      <td className="px-4 text-center text-sm py-2">
                        {new Date(record.appointmentDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* Action Field with Conditional Buttons */}
                      <td className="px-4 text-center text-sm">
                        {record.status === "pending" ? (
                          <div className="flex gap-2">
                            <button className="rounded p-1 text-xl text-success hover:text-[#2f8a38]">
                              <FaCircleCheck title="Accept" />
                            </button>
                            <button className="rounded p-1 text-xl text-danger hover:text-[#8B0000]">
                              <RxCrossCircled title="Delete" />
                            </button>
                            <button className="rounded p-1 text-xl text-blue-500 hover:text-blue-700">
                              <MdEditSquare title="Edit" />
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`px-3 py-1 rounded-md text-white ${
                              record.status === "completed"
                                ? "bg-success"
                                : record.status === "rejected"
                                ? "bg-danger"
                                : ""
                            }`}
                          >
                            {record.status}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <p className="min-w-full bg-white border border-black-300 p-4 w-full flex-1">
                  No Appointment Found.
                </p>
              )}
            </tbody>
          </table>
        </div>

        <div className="last mt-6 flex items-center justify-between">
          <p className="text-sm pl-2">
            Showing Page {currentPage} of {totalPage}
          </p>
          <div className="flex items-center bg-black-100 border border-black-300 rounded-md">
            <button
              className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
              disabled={!prev}
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-blue-500 text-white">
              {currentPage}
            </div>
            <button
              className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
              disabled={!next}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayAppointment;
