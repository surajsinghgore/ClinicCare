import { BsCalendarDateFill } from "react-icons/bs";

const AllAppointments = () => {
  // Inline data
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. John Doe",
      doctorImage: "https://via.placeholder.com/40",
      date: "2024-11-15",
      time: "10:30 AM",
      clinicName: "Medicare Center",
      transactionId: "TX123456789",
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      doctorImage: "https://via.placeholder.com/40",
      date: "2024-11-15",
      time: "2:00 PM",
      clinicName: "Medicare Center",
      transactionId: "TX987654321",
    },
  ];

  return (
    <>

    {/* search input */}
      <div className="mt-16 mb-7 flex space-x-4">
        <input
          type="number"
          placeholder="Search Appointment Id ..."
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="searchAppointmentNumber"
        />
        <input
          type="text"
          placeholder="Search Appointment Date..."
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="searchAppointmentDate"
        />
        <input
          type="text"
          placeholder="Search Appointment Time..."
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="searchAppointmentTime"
        />
        <input
          type="text"
          placeholder="Search Disease..."
          className="border border-black-300 rounded-md px-3 py-2 w-full"
          name="searchDisease"
        />
        <button className="bg-blue-600 px-4 py-2 text-white rounded-md">
          Search
        </button>
      </div>
      <div className="pt-7">
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
      {/* Heading */}
      <h1 className="text-2xl font-semibold mt-7 mb-6 flex items-center gap-3 text-black-800">
        Past Appointments <BsCalendarDateFill />
      </h1>
      <div className="overflow-x-auto border border-black-300">
        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700 border-b font-bold uppercase">
              <th className="p-4 text-sm tracking-wide">#ID</th>
              <th className="p-4 text-sm tracking-wide">Doctor Name</th>
              <th className="p-4 text-sm tracking-wide">Date</th>
              <th className="p-4 text-sm tracking-wide">Time</th>
              <th className="p-4 text-sm tracking-wide">Transaction ID</th>
              <th className="p-4 pr-16 text-sm text-center tracking-wide">
                Actions
              </th>
              <th className="p-4 text-sm tracking-wide">Clinic</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className={`border-b border-black-300`}>
                <td className="p-4 text-black-800 text-[0.95rem]">
                  {appointment.id}
                </td>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={appointment.doctorImage}
                    alt={appointment.doctorName}
                    className="w-12 h-12 rounded-xl"
                  />
                  <span className="font-medium text-black-700 text-[0.95rem]">
                    {appointment.doctorName}
                  </span>
                </td>
                <td className="p-4 text-black-600 text-[0.95rem]">
                  {appointment.date}
                </td>
                <td className="p-4 text-black-600 text-[0.95rem]">
                  {appointment.time}
                </td>
                <td className="p-4 text-black-600 text-[0.95rem]">
                  {appointment.transactionId}
                </td>
                <td className="p-4">
                  <button className="bg-blue-600 text-white font-medium px-2 py-2 text-sm rounded-md hover:bg-blue-700">
                    Download Appointment
                  </button>
                </td>
                <td className="p-4">
                  <button className="bg-blue-600 text-white font-medium px-2 py-2 text-sm rounded-md hover:bg-blue-700">
                    View Clinic
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="last mt-6 flex items-center justify-between">
        <p className="text-sm pl-2">
          Showing Page 1 of 1{/* Showing Page {currentPage} of {totalPage} */}
        </p>
        <div className="flex items-center bg-black-100 border border-black-300 rounded-md">
          <button
            className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
            // disabled={!prev}
            // onClick={handlePrevPage}
          >
            Previous
          </button>
          <div className="px-4 py-2 bg-[#004AAD] text-white">
            {/* {currentPage} */} 1
          </div>
          <button
            className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
            // disabled={!next}
            // onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllAppointments;
