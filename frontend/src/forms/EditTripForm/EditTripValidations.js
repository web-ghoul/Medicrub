import * as yup from 'yup';

export const editTripInitialValues = {
  firstName: "",
  lastName: "",
  phone:"",
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

export const editTripSchema = yup.object({
  firstName: yup.string("Enter your first name").required("First Name is Required"),
  lastName:  yup.string("Enter your last name").required("Last Name is Required"),
  phone: yup.string("Enter your phone number").required("Phone Number is Required"),
  date: yup.date("Enter the date").required("The Date is Required"),
  time: yup.string("Enter the time").required("The Time is Required"),
  cost: yup.number("Enter trip cost").required("Trip Cost is Required"),
})