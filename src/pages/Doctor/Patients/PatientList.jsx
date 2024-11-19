import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";

const PatientList = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      profileUrl: "https://via.placeholder.com/150",
      email: "john.doe@example.com",
      mobile: "123-456-7890",
      age: 35,
      lastAppointmentDate: "2024-11-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      profileUrl: "https://via.placeholder.com/150",
      email: "jane.smith@example.com",
      mobile: "987-654-3210",
      age: 28,
      lastAppointmentDate: "2024-11-12",
    },
    {
      id: 3,
      name: "Alice Johnson",
      profileUrl: "https://via.placeholder.com/150",
      email: "alice.johnson@example.com",
      mobile: "456-789-1234",
      age: 42,
      lastAppointmentDate: "2024-11-10",
    },
  ]);

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
            //   value={searchParams.appointmentNumber}
            //   onChange={handleSearchChange}
          />

          <input
            type="email"
            placeholder="Email..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="email"
            autoComplete="off"
            //   value={searchParams.txnId}
            //   onChange={handleSearchChange}
          />

          <input
            type="number"
            placeholder="Patient Phone No..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="tel"
            autoComplete="off"
            //   value={searchParams.appointmentDate}
            //   onChange={handleSearchChange}
          />

          <input
            type="date"
            placeholder="Appointment Date..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="appointmentDate"
            autoComplete="off"
            //   value={searchParams.appointmentDate}
            //   onChange={handleSearchChange}
          />

          <div className="btn">
            <button
              className="rounded bg-[#116AEF] px-7 py-2 text-white"
              // onClick={handleSearch}
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
                // value={limit}
                // onChange={handleLimitChange}
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
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-black-300">
                    <td className="p-4 text-black-800 text-[0.95rem]">
                      {patient.id}
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={patient.profileUrl}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <span className="font-medium text-black-700 text-[0.95rem]">
                        {patient.name}
                      </span>
                    </td>
                    <td className="p-4 text-black-600 text-[0.95rem]">
                      {patient.email}
                    </td>
                    <td className="p-4 text-black-600 text-[0.95rem]">
                      {patient.mobile}
                    </td>
                    <td className="p-4 text-black-600 text-[0.95rem]">
                      {patient.age}
                    </td>
                    <td className="p-4 text-black-600 text-center text-[0.95rem]">
                      {patient.lastAppointmentDate}
                    </td>
                    <td className="p-4 text-center">
                      <Link to={`/patient-details/${patient.id}`}>
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
              //   disabled={!prev}
              //   onClick={handlePrevPage}
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-blue-500 text-white">
              {/* {currentPage} */} 1
            </div>
            <button
              className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
              //   disabled={!next}
              //   onClick={handleNextPage}
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
