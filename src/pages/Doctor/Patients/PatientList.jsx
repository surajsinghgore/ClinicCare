import { useCallback, useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { activeDoctorPatientListApi, searchPatientListsApi } from "../../../Utils/services/apis/Doctor/PatientApi";
import { calculateAge, extractFullDate } from "../../../Utils/DateFormatFunction";

const PatientList = () => {
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(location.search);
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);
  const [currentPage, setCurrentPage] = useState(
    Number(queryParams.get("page") || 1)
  );
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    patientEmail: "",
    patientName: "",
    patientMobile: "",
    AppointmentDate: "",
  });

  const [totalPage, setTotalPage] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [patients, setPatients] = useState([

  ]);




  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await activeDoctorPatientListApi(currentPage, limit);
      if (res?.status) {
        setPatients(res.data)
        setTotalPage(res.pagination.totalPages);
        setNext(res.pagination.hasNextPage);
        setPrev(res.pagination.hasPrevPage);
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, [limit, currentPage]);


  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
    setCurrentPage(1);
    navigate(`/doctor/patient-list?limit=${newLimit}&page=${currentPage}`);
  };

  const handlePrevPage = () => {
    if (prev && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`/doctor/patient-list?limit=${limit}&page=${newPage}`);
    }
  };

  const handleNextPage = () => {
    if (next && currentPage < totalPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`/doctor/patient-list?limit=${limit}&page=${newPage}`);
    }
  };




  const searchFetch = useCallback(async () => {
    try {
      dispatch(showLoader());

      // Destructure searchParams correctly
      const { patientEmail,
        patientName,
        patientMobile,
        AppointmentDate } =
        searchParams;

      // Call the API function with the current search parameters
      const res = await searchPatientListsApi(
        patientEmail,
        patientName,
        patientMobile,
        AppointmentDate
      );

      // Check the response and update the state accordingly
      if (res?.status) {
        setPatients(res.data);
        setTotalPage(res.pagination.totalPages);
        setNext(res.pagination.hasNextPage);
        setPrev(res.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error("Error searching appointments:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, currentPage, limit, searchParams]);

  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on search
    searchFetch(); // Trigger the search
  };
  return (
    <>
      <BreadCrumbs currentPath={"Patient List"} />

      <div className="p-10">
        {/* Heading */}
        <h1 className="text-2xl font-semibold mt-7 mb-6 flex items-center gap-3 text-black-800">
          All Patients List <FaClipboardList />
        </h1>
        {/* Search Input */}
        <div className="mt-16 mb-7 flex space-x-4">
          <input
            type="text"
            placeholder="Patient Name ..."
            className="border border-black-300 rounded-md px-3 py-1 w-full"
            name="patientName"
            autoComplete="off"
            value={searchParams.patientName}
            onChange={handleSearchChange}
          />

          <input
            type="email"
            placeholder="Email..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="patientEmail"
            autoComplete="off"
            value={searchParams.patientEmail}
            onChange={handleSearchChange}
          />

          <input
            type="number"
            placeholder="Patient Phone No..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="patientMobile"
            autoComplete="off"
            value={searchParams.patientMobile}
            onChange={handleSearchChange}
          />

          <input
            type="date"
            placeholder="Appointment Date..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="AppointmentDate"
            autoComplete="off"
            value={searchParams.AppointmentDate}
            onChange={handleSearchChange}
          />

          <div className="btn">
            <button
              className="rounded bg-[#116AEF] px-7 py-2 text-white"
              onClick={handleSearch}
            >
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

        {patients.length === 0 ? (
          // No patients scenario
          <div className="text-center mt-10">
            <p className="text-lg text-black-600">No patients found.</p>
          </div>
        ) : (
          // Show patients in a table
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-black-300">
              <thead>
                <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700 border-b font-bold uppercase">
                  <th className="p-4 text-sm tracking-wide">#ID</th>
                  <th className="p-4 text-sm tracking-wide">Patient Name</th>
                  <th className="p-4 text-sm tracking-wide">Email</th>
                  <th className="p-4 text-sm tracking-wide">Mobile</th>
                  <th className="p-4 text-sm tracking-wide">Age</th>
                  <th className="p-4 text-sm tracking-wide">
                    Last Appointment Date
                  </th>
                  <th className="p-4 text-sm text-center tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient.userId} className="border-b border-black-300">
                    <td className="p-4 text-black-800 text-[0.95rem]">
                      {++index}
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <Link to={`/doctor/patient-details/${patient.userId}?limit=5`}>

                        <img
                          src={patient.userProfileUrl}
                          alt={patient.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </Link>
                      <Link to={`/doctor/patient-details/${patient.userId}?limit=5`}> <span className="font-medium text-black-700 text-[0.95rem]">
                        {patient.userName}
                      </span></Link>
                    </td>
                    <td className="p-4 text-black-600 text-[0.95rem]">
                      {patient.email}
                    </td>
                    <td className="p-4 text-black-600 text-[0.95rem]">
                      {patient.mobile}
                    </td>
                    <td className="p-4 text-black-600 text-[0.95rem]">
                      {calculateAge(patient.dob)}
                    </td>
                    <td className="p-4 text-black-600 text-center text-[0.95rem]">
                      {extractFullDate(patient.lastAppointmentDate)}
                    </td>
                    <td className="p-4 text-center">
                      <Link to={`/doctor/view-my-patient-details/${patient.userId}?limit=5`}>
                        <button className="bg-blue-600 text-white font-medium px-3 py-2 text-sm rounded-md hover:bg-blue-700">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* pagination */}
        <div className="last mt-6 flex items-center justify-between">
          <p className="text-sm pl-2">Showing Page 1 of 1</p>
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

export default PatientList;
