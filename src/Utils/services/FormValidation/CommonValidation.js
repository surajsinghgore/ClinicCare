import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email("Must be a valid email address.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const forgetPasswordUsingEmailValidation = yup.object({
  email: yup.string().email("Must be a valid email address.").required("Email is required."),
});

export const passwordMatcherValidation = yup.object({
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[\W_]/, "Password must contain at least one special character.")
    .required("Password is required."),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm Passwords must match.")
    .required("Confirm Password is required."),
});
