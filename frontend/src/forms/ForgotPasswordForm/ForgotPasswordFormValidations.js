import * as yup from 'yup';

export const forgotPasswordInitialValues = {
  email: "",
}

export const forgotPasswordSchema = yup.object({
  email: yup.string("Enter your email").email("Email is InValid").required("Email is Required")
})

