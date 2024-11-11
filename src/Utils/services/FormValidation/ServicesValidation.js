import * as yup from "yup";
export const serviceDataValidator = yup.object({
  treatmentName: yup.string().required("Treatment name is required.").trim().min(1, "Treatment name must not be empty."),

  specialty: yup.string().required("Specialty is required.").trim().min(1, "Specialty must not be empty."),

  fees: yup.string().required("Fees  is required.").trim().min(1, "Fees must not be empty."),

  duration: yup.string().required("Duration is required.").trim().min(1, "Duration must not be empty."),
  limit: yup.string().required("Slot availability limit is required.").trim().min(1, "Slot availability limit must not be empty."),

  clinicId: yup.string().required("Clinic ID is required.").trim(),

  description: yup.string().required("Description is required.").trim().min(1, "Description must not be empty."),
});
