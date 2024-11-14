import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { MdEditSquare, MdPreview } from "react-icons/md";
import { getAllDetailedAppointmentsApi, processRejectAppointmentByAppointmentId } from "../../../Utils/services/apis/Doctor/AppointmentApi";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { confirmAlert } from "react-confirm-alert";

const AppointmentList = () => {
  const [data, setData] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);
  const [currentPage, setCurrentPage] = useState(
    Number(queryParams.get("page") || 1)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPage, setTotalPage] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const dataFetch = useCallback(async () => {
    try {
      dispatch(showLoader());
      const res = await getAllDetailedAppointmentsApi(currentPage,
        limit);

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
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    dataFetch();
  }, [limit, currentPage]);


  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
    setCurrentPage(1); // Reset to page 1
    navigate(
      `/doctor/appointment-list?limit=${newLimit}&page=${currentPage}`
    );
  };

  const handlePrevPage = () => {
    if (prev && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(
        `/doctor/appointment-list?limit=${limit}&page=${newPage}`
      );
    }
  };

  const handleNextPage = () => {
    if (next && currentPage < totalPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(
        `/doctor/appointment-list?limit=${limit}&page=${newPage}`
      );
    }
  };


  const cancelledAppointment = async (id) => {
    try {
      dispatch(showLoader());
      let res = await processRejectAppointmentByAppointmentId(id);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        dataFetch()
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({ message: error?.response?.data?.message, type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  }

  const confirmDelete = (appointmentId) => {

confirmAlert({
  title: "Confirm to delete",
  message: "Are you sure you want to rejected this appointment?",
  buttons: [
    {
      label: "Yes",
      onClick: () => cancelledAppointment(appointmentId),
    },
    {
      label: "No",

    },
  ],
});
};
  return (
    <>
      <BreadCrumbs currentPath="Today's Appointment" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <h1 className="text-2xl font-semibold">Appointment List</h1>
        <div className="flex justify-between items-center mb-8 mt-7">
          <h2>All Appointment Records</h2>
        </div>
        <div className="mt-4 mb-10 flex space-x-3">
          <input
            type="text"
            placeholder="Search Appointment Id ..."
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="searchAppointmentNumber"
          />
          <input
            type="text"
            placeholder="Search Patient Name..."
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="searchPatientName"
          />
          <input
            type="date"
            placeholder="Select Date of Birth"
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="dob"
            max={new Date().toISOString().split("T")[0]} // Sets max date to today
          />

          <div className="status-picker">
            <select
              id="status"
              name="status"
              className="border border-black-300 rounded-md px-10 py-2 w-full"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="btn">
            <button className="rounded bg-[#116AEF] px-7 py-2 text-white">
              Search
            </button>
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
          <h1 className="text-lg font-semibold">Recent Appointments</h1>
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
                  Disease
                </th>

                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Time
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  Date
                </th>
                <th className="text-left text-black-800 px-4 py-2 border-b">
                  status
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
                        {record.diseaseName.length > 15
                          ? record.diseaseName.slice(0, 15) + "..."
                          : record.diseaseName}
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
                      <td className="px-2 text-center text-sm">

                        {record.status === "pending" ? (
                          <div
                            className={`px-2 py-1 rounded-md text-white bg-warning`}
                          >
                            {record.status}
                          </div>
                        ) : (
                          <div
                            className={`px-2 py-1 rounded-md text-white ${record.status === "completed"
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
                      {/* Action Field with Conditional Buttons */}
                      <td className="px-4 text-center text-sm">

                        {record.status === "pending" ? (
                          <div className="flex gap-2">
                            <Link to={`/doctor/edit-appointment-form1/${record.appointmentId
                              }`}>
                              <button className="rounded p-1 text-xl text-success hover:text-[#2f8a38]"  >
                                <FaCircleCheck title="Accept" />
                              </button>
                            </Link>
                            <button className="rounded p-1 text-xl text-danger hover:text-[#8B0000]" onClick={() => confirmDelete(record.appointmentId)}>
                              <RxCrossCircled title="Delete" />
                            </button>

                          </div>
                        ) : (
                          <div
                            className={`px-3 py-1 rounded-md text-xl flex justify-center items-center cursor-pointer text-primary`}
                          >
                            <Link to={"/doctor/viewRecord/" + record?.patientTreatmentId}>
                              <MdPreview title="View " />

                            </Link>
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

export default AppointmentList;
