import * as yup from 'yup';

export const forgotPasswordInitialValues = {
  email: "",
}

export const forgotPasswordSchema = yup.object({
  email: yup.string("Enter your username").email("Email is InValid").required("Username is Required")
})

