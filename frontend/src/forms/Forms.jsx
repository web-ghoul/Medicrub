import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { handleAlert } from "../functions/handleAlert";
import { login } from "../store/authSlice";
import { carInfoInitialValues, carInfoSchema, licenseInitialValues, licenseSchema, personalDataInitialValues, personalDataSchema } from "./AddDriverForm/AddDriverValidations";
import CarInfoForm from "./AddDriverForm/CarInfoForm";
import PersonalDataForm from "./AddDriverForm/PersonalDataForm";
import LicenseForm from "./AddDriverForm/licenseForm";
import { tripDetailsInitialValues, tripDetailsSchema } from "./AddTripForm/AddTripValidations";
import AssignDriverForm from "./AddTripForm/AssignDriverForm";
import TripDetailsForm from "./AddTripForm/TripDetailsForm";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import { forgotPasswordInitialValues, forgotPasswordSchema } from "./ForgotPasswordForm/ForgotPasswordFormValidations";
import LoginForm from './LoginForm/LoginForm';
import { loginInitialValues, loginSchema } from "./LoginForm/LoginValidations";
import SearchForDriverForm from "./SearchForDriverForm/SearchForDriverForm";
import SearchForTripForm from "./SearchForTripForm/SearchForTripForm";

const server_url = process.env.REACT_APP_SERVER_URL

const Forms = ({ type }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [searchForDriver, setSearchForDriver] = useState("")
  const [searchForTrip, setSearchForTrip] = useState("")
  const { setAddDriverTab, setAddTripTab } = useContext(AppContext)

  const handleCatchError = (err) => {
    try {
      handleAlert({ msg: err.response.data.message, status: "error" })
    } catch (err) {
      handleAlert({
        msg: err.message, status: "error"
      })
    }
  }

  //Login
  const loginFormik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      await axios.post(`${server_url}/Login`, values).then((res) => {
        navigate(`${process.env.REACT_APP_DASHBOARD_ROUTE}`)
        dispatch(login({ token: res.data.token }))
        resetForm()
        handleAlert({ msg: "Login Successfully", status: "success" })
      }).catch((err) => {
        handleCatchError(err)
      })
      setLoading(false)
    }
  })

  //Forgot Password
  const forgotPasswordFormik = useFormik({
    initialValues: forgotPasswordInitialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      handleAlert({ msg: "Still Working on it", status: "error" })
    }
  })

  //Add Driver's Persion Data
  const personalDataFormik = useFormik({
    initialValues: personalDataInitialValues,
    validationSchema: personalDataSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.profile) {
        handleAlert({ msg: "Enter Your Profile Photo", status: "error" })
        return
      }
      if (!values.nationalFront) {
        handleAlert({ msg: "Enter Your National Id (Front)", status: "error" })
        return
      }
      if (!values.nationalBack) {
        handleAlert({ msg: "Enter Your National Id (Back)", status: "error" })
        return
      }
      if (!values.address) {
        handleAlert({ msg: "Choose Your Address", status: "error" })
        return
      }
      setLoading(true)
      const formData = new FormData()
      formData.append("firstName", values.firstName)
      formData.append("lastName", values.lastName)
      formData.append("ssn", values.ssn)
      formData.append("medicalInsurance", values.medicalInsurance)
      formData.append("phone", values.phone)
      formData.append("email", values.email)
      formData.append("address", values.address)
      formData.append("profile", values.profile)
      formData.append("birthDate", values.birthDate)
      formData.append("latitude", values.latitude)
      formData.append("longitude", values.longitude)
      formData.append("nationalFront", values.nationalFront)
      formData.append("nationalBack", values.nationalBack)
      formData.append("password", values.password)
      await axios.post(`${server_url}/CreateDriver`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        resetForm()
        values.nationalFront = null
        values.nationalBack = null
        values.profile = null
        setAddDriverTab(1)
        localStorage.setItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`, res.data.data._id)
        handleAlert({ msg: "Driver is Created Successfully", status: "success" })
      }).catch((err) => {
        handleCatchError(err)
      })
      setLoading(false)
    }
  })

  //Add Driver's Licnence
  const licenseFormik = useFormik({
    initialValues: licenseInitialValues,
    validationSchema: licenseSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)) {
        handleAlert({ msg: "Choose Driver First", status: "error" })
        navigate(`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`)
        return
      }
      setLoading(true)
      const formData = new FormData()
      formData.append("front", values.front)
      formData.append("back", values.back)
      await axios.post(`${server_url}/AddDriverLicense?id=${localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        resetForm()
        values.front = null
        values.back = null
        setAddDriverTab(2)
        handleAlert({ msg: "Driver's License is Added Successfully", status: "success" })
      }).catch((err) => {
        handleCatchError(err)
      })
      setLoading(false)
    }
  })

  //Add Car's Information
  const carInfoFormik = useFormik({
    initialValues: carInfoInitialValues,
    validationSchema: carInfoSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.registration) {
        handleAlert({ msg: "Enter Car License (Front)", status: "error" })
        return
      }
      if (!values.insurance) {
        handleAlert({ msg: "Enter Car License (Back)", status: "error" })
        return
      }
      if (!localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)) {
        handleAlert({ msg: "Choose Driver First", status: "error" })
        navigate(`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`)
        return
      }
      setLoading(true)
      const formData = new FormData()
      formData.append("carType", values.carType)
      formData.append("carModel", values.carModel)
      formData.append("plateNum", values.plateNum)
      formData.append("color", values.color)
      formData.append("registration", values.registration)
      formData.append("insurance", values.insurance)
      await axios.post(`${server_url}/CreateCar?id=${localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        resetForm()
        values.front = null
        values.back = null
        setAddDriverTab(2)
        handleAlert({ msg: "Car is Created Successfully", status: "success" })
        navigate(`${process.env.REACT_APP_DRIVERS_ROUTE}`)
      }).catch((err) => {
        handleCatchError(err)
      })
      setLoading(false)
    }
  })

  //Add Trip's Details
  const tripDetailsFormik = useFormik({
    initialValues: tripDetailsInitialValues,
    validationSchema: tripDetailsSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.pickup) {
        if (!values.pickup.address) {
          handleAlert({ msg: "Choose Pick up Address", status: "error" })
          return
        }
      } else {
        handleAlert({ msg: "Enter Pickup Location", status: "error" })
        return
      }

      if (values.destination) {
        if (!values.destination.address) {
          handleAlert({ msg: "Choose Destination Address", status: "error" })
          return
        }
      } else {
        handleAlert({ msg: "Enter Destination Location", status: "error" })
        return
      }

      setLoading(true)
      await axios.post(`${server_url}/CreateTrip`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        resetForm()
        setAddTripTab(1)
        localStorage.setItem(`${process.env.REACT_APP_CURRENT_TRIP_ID}`, res.data.data._id)
        handleAlert({ msg: "Trip is Created Successfully", status: "success" })
      }).catch((err) => {
        handleCatchError(err)
      })
      setLoading(false)
    }
  })

  //Add Trip's Assign Driver
  const assignDriverFormik = useFormik({
    initialValues: licenseInitialValues,
    validationSchema: licenseSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)) {
        handleAlert({ msg: "Choose Driver First", status: "error" })
        navigate(`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`)
        return
      }
      setLoading(true)
      const formData = new FormData()
      formData.append("front", values.front)
      formData.append("back", values.back)
      await axios.post(`${server_url}/AddDriverLicense?id=${localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        resetForm()
        values.front = null
        values.back = null
        setAddDriverTab(2)
        handleAlert({ msg: "Driver's License is Added Successfully", status: "success" })
      }).catch((err) => {
        handleCatchError(err)
      })
      setLoading(false)
    }
  })

  //Search For Driver
  const handleSearchForDriver = (e) => {
    e.preventDefault()
  }

  //Search For Trip
  const handleSearchForTrip = (e) => {
    e.preventDefault()
  }


  return (
    <form className={`${(type === "personal_data" || type ===
      "search_for_driver") && "w-full"}`} onSubmit={type === "login" ? loginFormik.handleSubmit : type === "forgot_password" ? forgotPasswordFormik.handleSubmit : type === "personal_data" ? personalDataFormik.handleSubmit : type === "license" ? licenseFormik.handleSubmit : type === "trip_details" ? tripDetailsFormik.handleSubmit : type === "assign_driver" ? assignDriverFormik.handleSubmit : type === "car_info" ? carInfoFormik.handleSubmit : type === "search_for_trip" ? handleSearchForTrip : type === "search_for_driver" && handleSearchForDriver}>
      {type === "login" ? <LoginForm loading={loading} formik={loginFormik} /> : type === "forgot_password" ? <ForgotPasswordForm formik={forgotPasswordFormik} loading={loading} /> : type === "personal_data" ? <PersonalDataForm formik={personalDataFormik} loading={loading} /> : type === "license" ? <LicenseForm formik={licenseFormik} loading={loading} /> : type === "trip_details" ? <TripDetailsForm formik={tripDetailsFormik} loading={loading} /> : type === "assign_driver" ? <AssignDriverForm formik={tripDetailsFormik} loading={loading} /> : type === "car_info" ? <CarInfoForm formik={carInfoFormik} loading={loading} /> : type === "search_for_trip" ? <SearchForTripForm searchForTrip={searchForTrip} setSearchForTrip={setSearchForTrip} /> : type === "search_for_driver" && <SearchForDriverForm searchForDriver={searchForDriver} setSearchForDriver={setSearchForDriver} />}
    </form>
  )
}

export default Forms