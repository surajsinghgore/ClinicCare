import * as yup from "yup";

export const processAppointmentValidation = yup.object({
  appointmentId: yup
    .string()
    .required("Appointment ID is required.")
    .matches(/^[0-9a-fA-F]{24}$/, "Appointment ID must be a valid MongoDB ObjectId."), // MongoDB ObjectId format

  followUpDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Follow-up date must be in YYYY-MM-DD format (e.g. 2024-11-14)")
    .nullable()
    .optional(),

  notes: yup.string().max(500, "Notes must not exceed 500 characters.").optional(),

  diseaseName: yup.string().min(1, "Disease name is required.").max(100, "Disease name must be at most 100 characters long.").required("Disease name is required."),

  symptoms: yup.string().min(1, "Symptoms are required.").max(500, "Symptoms must be at most 500 characters long.").required("Symptoms are required."),

  treatmentOutcome: yup.string().max(500, "Treatment outcome must not exceed 500 characters.").optional(),
});
