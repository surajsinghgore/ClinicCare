import * as yup from "yup";


export const loginValidation = yup.object({
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required."),
});