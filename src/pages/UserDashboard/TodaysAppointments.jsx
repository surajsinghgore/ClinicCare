import React from "react";

const TodaysAppointments = () => {
  // Inline data
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. John Doe",
      doctorImage: "https://via.placeholder.com/40",
      date: "2024-11-15",
      time: "10:30 AM",
      transactionId: "TX123456789",
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      doctorImage: "https://via.placeholder.com/40",
      date: "2024-11-15",
      time: "2:00 PM",
      transactionId: "TX987654321",
    },
  ];

  return (
    <>
      {/* Heading */}
      <h1 className="text-2xl font-bold mt-16 mb-6 text-black-800">
      Your Appointments Today
      </h1>
      <div className="overflow-x-auto border border-black-300">
        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-black-900 bg-black-300 border-b">
              <th className="p-4 text-sm font-medium uppercase tracking-wide">
                Appointment ID
              </th>
              <th className="p-4 text-sm font-medium uppercase tracking-wide">
                Doctor Name
              </th>
              <th className="p-4 text-sm font-medium uppercase tracking-wide">
                Date
              </th>
              <th className="p-4 text-sm font-medium uppercase tracking-wide">
                Time
              </th>
              <th className="p-4 text-sm font-medium uppercase tracking-wide">
                Transaction ID
              </th>
              <th className="p-4 text-sm font-medium uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className={`border-b border-black-300`}
              >
                <td className="p-4 text-black-800 text-[0.95rem]">{appointment.id}</td>
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
                <td className="p-4 text-black-600 text-[0.95rem]">{appointment.date}</td>
                <td className="p-4 text-black-600 text-[0.95rem]">{appointment.time}</td>
                <td className="p-4 text-black-600 text-[0.95rem]">{appointment.transactionId}</td>
                <td className="p-4">
                  <button className="bg-blue-600 text-white px-2 py-2 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
