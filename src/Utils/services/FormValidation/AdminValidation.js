import * as yup from "yup";

export const registerAdminValidation = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters long.").required("Name is required."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .matches(/@gmail\.com$/, "Only Gmail accounts are allowed.")
    .required("Email is required."),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits.")
    .required("Mobile number is required."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[\W_]/, "Password must contain at least one special character.")
    .required("Password is required"),
// permission: yup.array()
//     .of(yup.string().oneOf(["all", "read", "write", "update", "create"], "Permission must be one of the following: all, read, write, update, create."))
//     .min(1, "At least one permission must be selected.") // Ensure at least one permission is selected
//     .required("Permission is required."),
});

export const loginValidation = yup.object({
  usernameOrEmail: yup
    .string()
    .trim() // Trim whitespace
    .required("Username or Email is required"), // Required field
  password: yup
    .string()
    .trim() // Trim whitespace
    .required("Password is required"), // Required field
});
