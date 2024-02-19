import * as yup from 'yup';

export const editDriverInitialValues = {
  firstName: "",
  lastName: "",
  email:"",
  phone:"",
  medicalInsurance:"",
  birthDate: "",
  ssn: "",
  address: "",
  password:"",
  profile:"",
  nationalFront:"",
  nationalBack:"",
  latitude: 0,
  longitude: 0,
  licenseFront: "",
  licenseBack: ""
}

export const editDriverSchema = yup.object({
  firstName: yup.string("Enter your first name").required("First Name is Required"),
  lastName:  yup.string("Enter your last name").required("Last Name is Required"),
  email: yup.string("Enter your last name").email("Email is Invalid").required("Email is Required"),
  phone: yup.string("Enter your phone number").required("Phone Number is Required"),
  medicalInsurance: yup.string("Enter your medical insurance").required("Medical Insurance is Required"),
  birthDate: yup.string("Enter your birth date").required("Birth Date is Required"),
  profile: yup.mixed("Enter your Profile Photo"),
  nationalFront: yup.mixed("Enter your National Id Front"),
  nationalBack: yup.mixed("Enter your National Id Back"),
  ssn: yup.string("Enter your SSN").required("SSN is Required"),
  address: yup.string("Enter your address"),
  password: yup.string("Enter your password")
    .required("Password is Required").min(8,"Password must be at least 8 characters"),
  licenseFront: yup.mixed("Enter License Image Front").required("License Image Front is Required"),
  licenseBack: yup.mixed("Enter License Image Back")
    .required("License Image Back is Required")
})