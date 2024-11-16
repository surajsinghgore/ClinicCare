import { BsCalendarDateFill } from "react-icons/bs";

const TodaysAppointments = () => {
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
      {/* Heading */}
      <h1 className="text-2xl font-semibold mt-20 mb-6 flex items-center gap-3 text-black-800">
        Your Appointments Today <BsCalendarDateFill />
      </h1>
      <div className="overflow-x-auto border border-black-300">
        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700 border-b font-bold uppercase">
              <th className="p-4 text-sm tracking-wide">
                #ID
              </th>
              <th className="p-4 text-sm tracking-wide">
                Doctor Name
              </th>
              <th className="p-4 text-sm tracking-wide">
                Date
              </th>
              <th className="p-4 text-sm tracking-wide">
                Time
              </th>
              <th className="p-4 text-sm tracking-wide">
                Transaction ID
              </th>
              <th className="p-4 pr-16 text-sm text-center tracking-wide">
                Actions
              </th>
              <th className="p-4 text-sm tracking-wide">
                Clinic
              </th>
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
    </>
  );
};

export default TodaysAppointments;
