import * as yup from "yup";

export const userRegisterValidationSchema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters long.").trim().required("Name is required."),

  dob: yup.date().required("Date of birth is required.").typeError("Date of birth must be a valid date in YYYY-MM-DD format."),

  email: yup
    .string()
    .email("Must be a valid email address.")
    .matches(/^([a-zA-Z0-9._-]+)@gmail\.com$/, "Only Gmail addresses are allowed.")
    .required("Email is required.")
    .trim(),

  mobile: yup
    .string()
    .length(10, "Mobile number must be exactly 10 digits long.")
    .matches(/^[0-9]{10}$/, "Mobile number must contain only digits.")
    .required("Mobile number is required."),

  bloodGroup: yup.string().oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Invalid blood group.").optional(),

  address: yup.string().min(5, "Address must be at least 5 characters long.").required("Address is required.").trim(),

  state: yup.string().required("State is required.").trim(),

  city: yup.string().required("City is required.").trim(),

  country: yup.string().required("Country is required.").trim(),

  pincode: yup
    .string()
    .length(6, "Pincode must be exactly 6 digits long.")
    .matches(/^[0-9]{6}$/, "Pincode must contain only digits.")
    .required("Pincode is required."),

  gender: yup.string().oneOf(["male", "female", "other"], "Gender must be either male, female, or other.").required("Gender is required."),

  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[\W_]/, "Password must contain at least one special character.")
    .required("Password is required.")
    .trim(),
});

export const userUpdateValidationSchema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters long.").trim().optional(),

  dob: yup.date().typeError("Date of birth must be a valid date in YYYY-MM-DD format.").optional(),

  email: yup
    .string()
    .email("Must be a valid email address.")
    .matches(/^([a-zA-Z0-9._-]+)@gmail\.com$/, "Only Gmail addresses are allowed.")
    .trim()
    .optional(),

  mobile: yup
    .string()
    .length(10, "Mobile number must be exactly 10 digits long.")
    .matches(/^[0-9]{10}$/, "Mobile number must contain only digits.")
    .optional(),

  bloodGroup: yup.string().oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Invalid blood group.").optional(),

  address: yup.string().min(5, "Address must be at least 5 characters long.").trim().optional(),

  state: yup.string().trim().optional(),

  city: yup.string().trim().optional(),

  country: yup.string().trim().optional(),

  pincode: yup
    .string()
    .length(6, "Pincode must be exactly 6 digits long.")
    .matches(/^[0-9]{6}$/, "Pincode must contain only digits.")
    .optional(),

  gender: yup.string().oneOf(["male", "female", "other"], "Gender must be either male, female, or other.").optional(),
});

export const passwordChangeValidationSchema = yup.object().shape({
  oldPassword: yup.string().min(5, "Old password must be at least 5 characters long.").required("Old password is required.").trim(),

  newPassword: yup
    .string()
    .min(5, "New Password must be at least 5 characters long.")
    .matches(/[A-Z]/, "New Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "New Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "New Password must contain at least one number.")
    .matches(/[\W_]/, "New Password must contain at least one special character.")
    .required("New Password is required.")
    .trim(),

  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("newPassword"), null], "Both New Password and Confirm Password must match."), // Ensures confirmPassword matches password
});
