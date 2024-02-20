import * as yup from 'yup';

export const personalDataInitialValues = {
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
}

export const personalDataSchema = yup.object({
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
})

export const licenseInitialValues = {
  front: "",
  back: "",
}

export const licenseSchema = yup.object({
  front: yup.mixed("Enter License Image Front").required("License Image Front is Required"),
  back: yup.mixed("Enter License Image Back")
    .required("License Image Back is Required")
})


export const carInfoInitialValues = {
  carType: "",
  carModel: "",
  plateNum: "",
  color: "",
  registration: "",
  insurance: "",
}

export const carInfoSchema = yup.object({
  carType: yup.string("Enter car type").required("Car Type is Required"),
  carModel: yup.string("Enter car model")
    .required("Car Model is Required"),
  plateNum: yup.string("Enter plate number")
  .required("Plate Number is Required"),
  color: yup.string("Enter car color")
  .required("Car Color is Required"),
})



export const carAlbumInitialValues={
  front:"",
  back:"",
  right:"",
  left:"",
}

export const carAlbumSchema = yup.object({
  front: yup.mixed("Enter Car Image Front"),
  back: yup.mixed("Enter Car Image Back"),
  right: yup.mixed("Enter Car Image Right"),
  left: yup.mixed("Enter Car Image Left")
})