import * as yup from 'yup';

export const loginInitialValues = {
  username: "",
  password: "",
}

export const loginSchema = yup.object({
  username: yup.string("Enter your username").required("Username is Required"),
  password: yup.string("Enter your password")
    .required("Password is Required").min(8,"Password must be at least 8 characters"),
})

