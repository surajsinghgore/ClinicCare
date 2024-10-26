import * as yup from "yup";

export const doctorPersonalUpdateValidator = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters long.").required("Name is required."),

  gender: yup.string().oneOf(["male", "female", "other"], "Gender must be either male, female, or other.").required("Gender is required."),

  mobile: yup
    .string()
    .length(10, "Mobile number must be exactly 10 digits long.")
    .matches(/^[0-9]+$/, "Mobile number must contain only digits.")
    .required("Mobile number is required."),

  dob: yup.date().required("Date of birth is required.").typeError("Date of birth must be a valid date."),
});

export const doctorQualificationUpdateValidator = yup.object({
  degree: yup.string().required("Degree is required and must not be empty.").trim().min(1, "Degree must not be empty."),
  licenseNumber: yup.string().required("License number is required and must not be empty.").trim().min(1, "License number must not be empty."),
  experience: yup.number().typeError("Experience must be a number.").min(0, "Experience must be a non-negative number.").required("Experience is required."),
  specialization: yup.string().required("Specialization is required and must not be empty.").trim().min(1, "Specialization must not be empty."),
});


export const clinicDataValidatorPhase1 = yup.object({
  name: yup.string()
    .required("Clinic name is required.")
    .trim()
    .min(1, "Clinic name must not be empty."),
  address: yup.string()
    .required("Address is required.")
    .trim()
    .min(1, "Address must not be empty."),
  contactNumber: yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be a valid 10-digit number.")
    .required("Contact number is required."),
  
});