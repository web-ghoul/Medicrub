import * as yup from 'yup';

export const tripDetailsInitialValues = {
  firstName: "",
  lastName: "",
  type:"",
  phone:"",
  birthDate: "",
  date:"",
  time:"",
  pickup:{
    latitude:"",
    longitude:"",
    address:""
  },
  destination:{
    latitude:"",
    longitude:"",
    address:""
  },
  cost:"",
  number:"",
  specialNeeds:""
}

export const tripDetailsSchema = yup.object({
  firstName: yup.string("Enter your first name").required("First Name is Required"),
  lastName:  yup.string("Enter your last name").required("Last Name is Required"),
  phone: yup.string("Enter your phone number").required("Phone Number is Required"),
  type: yup.string("Enter the type").required("The Type is Required"),
  birthDate: yup.string("Enter your birth date").required("Birth Date is Required"),
  date: yup.date("Enter the date").required("The Date is Required"),
  time: yup.string("Enter the time").required("The Time is Required"),
  cost: yup.number("Enter trip cost").required("Trip Cost is Required"),
})

export const assignDriverInitialValues = {
  front: "",
  back: "",
}

export const assignDriverSchema = yup.object({
  front: yup.mixed("Enter License Image Front").required("License Image Front is Required"),
  back: yup.mixed("Enter License Image Back")
    .required("License Image Back is Required")
})
