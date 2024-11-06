import * as yup from "yup";

export const platformFeeValidation = yup.object().shape({
  fees: yup.number().required("Fees are required.").min(0, "Fees must be a positive number.").max(1000000, "Fees cannot exceed 1,000,000.").typeError("Fees must be a number."),
});
