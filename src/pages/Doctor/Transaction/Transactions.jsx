import BreadCrumbs from "../../../components/Common/BreadCrumbs";

const Transactions = () => {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      img: "https://via.placeholder.com/50",
      date: "2024-11-15",
      time: "10:00 AM",
      txnId: "TXN12345",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      img: "https://via.placeholder.com/50",
      date: "2024-11-16",
      time: "11:00 AM",
      txnId: "TXN12346",
    },
  ];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div>
      <BreadCrumbs currentPath="Transaction Records" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-red-600 font-semibold">
            All Transaction Records
          </h2>
        </div>
        <div className="mt-4 mb-10 flex space-x-4">
          <input
            type="number"
            placeholder="Search Appointment Id ..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchAppointmentNumber"
          />
          <input
            type="text"
            placeholder="Search Patient Name..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchPatientName"
          />
          <input
            type="text"
            placeholder="Search TXN ID..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchTreatmentName"
          />
          <input
            type="text"
            placeholder="Search Merchant ID..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="searchTreatmentName"
          />
          <button className="bg-blue-600 px-4 py-2 text-white rounded-md">
            Search
          </button>
        </div>

        <div className="mt-4 pt-7">
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

        <div className="p-4">
          <div className="w-full bg-white overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-black-800">
              Appointment Records
            </h2>
            <table className="w-full text-left border border-black-300">
              <thead>
                <tr className="bg-[#D3D3D3] text-black-900 font-semibold">
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    #ID
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Date
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Time
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    TXN ID
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr
                    key={appointment.id}
                    className={index % 2 === 0 ? "bg-black-100" : "bg-white"}
                  >
                    <td className="px-6 py-4  text-black-900">
                      {appointment.id}
                    </td>
                    <td className="px-6 py-4 flex items-center">
                      <img
                        src={appointment.img}
                        alt={appointment.patientName}
                        className="w-12 h-12 rounded-full mr-4 border border-black-300 shadow-sm"
                      />
                      <span className="text-black-900 font-base">
                        {truncateText(appointment.patientName, 20)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black-900 font-base">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 text-black-900 font-base">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 text-black-900 font-base">
                      {truncateText(appointment.txnId, 12)}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`/appointments/${appointment.id}`}
                        className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
