import axiosInstance from "../../../../AxiosInstance";

export const createDoctorApi = async (payload) => {
  const res = await axiosInstance.post("/v1/admin/create-doctor", payload);
  return res.data;
};

export const fetchAllDoctorSubmittedListApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/v1/admin/doctors/submitted?page=${page}&limit=${limit}`);
  return res.data;
};

// /v1/admin/doctors/search

// export const searchDoctorsApi = asyncHandler(async (req, res) => {
//   try {
//     const { email, mobile, name, gender, specialization, licenseNumber } = req.query;

//     // Build the search criteria dynamically
//     let searchCriteria = {};

//     if (email) {
//       searchCriteria.email = { $regex: email, $options: "i" }; // case-insensitive search
//     }
//     if (mobile) {
//       searchCriteria.mobile = { $regex: mobile, $options: "i" };
//     }
//     if (name) {
//       searchCriteria.name = { $regex: name, $options: "i" };
//     }
//     if (gender) {
//       searchCriteria.gender = gender; // exact match for gender
//     }
//     if (specialization) {
//       searchCriteria.specialization = { $regex: specialization, $options: "i" };
//     }
//     if (licenseNumber) {
//       searchCriteria.licenseNumber = { $regex: licenseNumber, $options: "i" }; // case-insensitive search
//     }

//     // Find doctors that match the search criteria
//     const doctors = await Doctor.find(searchCriteria)
//       .select("-password -lastActiveAt -newAccountState -otp -tokenVersion") // Exclude sensitive fields
//       .exec();

//     if (doctors.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No doctors found matching the search criteria.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Doctors retrieved successfully.",
//       data: doctors,
//     });
//   } catch (error) {
//     console.error("Error searching for doctors: ", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error searching for doctors.",
//       error: error.message,
//     });
//   }
// });
