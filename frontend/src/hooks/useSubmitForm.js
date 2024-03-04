import axios from "axios";
import { useFormik } from "formik";
import { useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { DrawersContext } from "../context/DrawersContext";
import { ModalsContext } from "../context/ModalsContext";
import { TabsContext } from "../context/TabsContext";
import { UploadImagesContext } from "../context/UploadImagesContext";
import { carAlbumInitialValues, carAlbumSchema, carInfoInitialValues, carInfoSchema, licenseInitialValues, licenseSchema, personalDataInitialValues, personalDataSchema } from "../forms/AddDriverForm/AddDriverValidations";
import { tripDetailsInitialValues, tripDetailsSchema } from "../forms/AddTripForm/AddTripValidations";
import { editDriverInitialValues, editDriverSchema } from "../forms/EditDriverForm/EditDriverValidations";
import { filterTripsByDateInitialValues } from "../forms/FilterTripsByDateForm/FilterTripsByDateValidations";
import { forgotPasswordInitialValues, forgotPasswordSchema } from "../forms/ForgotPasswordForm/ForgotPasswordFormValidations";
import { loginInitialValues, loginSchema } from "../forms/LoginForm/LoginValidations";
import { handleAlert } from "../functions/handleAlert";
import { handleCatchError } from "../functions/handleCatchError";
import { login } from "../store/authSlice";
import { getDrivers } from "../store/driversSlice";
import { getNearestDrivers } from "../store/nearestDriversSlice";
import { getPendingDrivers } from "../store/pendingDriversSlice";
import { getTrips } from "../store/tripsSlice";

const server_url = process.env.REACT_APP_SERVER_URL

const useSubmitForm = (type) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { driver } = useSelector((state) => state.driver)
  const { handleCloseEditDriverDrawer } = useContext(DrawersContext)
  const {profile,nationalFront,nationalBack,registration,insurance,left,front,back,right} = useContext(UploadImagesContext)
  const { driverId ,setTripId,setSheetTrip , tripId,todayDate,trips,setChosenDate,chosenDate} = useContext(AppContext)
  const { setAddDriverTab, setAddTripTab } = useContext(TabsContext)
  const {handleCloseAssignDriverModal,handleCloseNearestDriversModal,handleCloseCreateMultipleTripsModal} = useContext(ModalsContext)
  const { pathname } = useLocation()

  const formikObj =
    useMemo(()=>{
      switch(type){
        case "login":
          return {
            initialValues: loginInitialValues,
            validationSchema: loginSchema,
            onSubmit: async (values, { resetForm }) => {
              setLoading(true);
              try {
                const res = await axios.post(`${server_url}/Login`, values);
                navigate(`${process.env.REACT_APP_DASHBOARD_ROUTE}`);
                dispatch(login({ token: res.data.token }));
                resetForm();
                handleAlert({ msg: "Login Successfully", status: "success" });
              } catch (err) {
                handleCatchError(err);
              }
              setLoading(false);
            }
          }
        case "forgot_password":
          return {
            initialValues: forgotPasswordInitialValues,
            validationSchema: forgotPasswordSchema,
            onSubmit: async () => {
              handleAlert({ msg: "Under Development...", status: "error" })
            }
          }
        case "personal_data":
          return {
            initialValues: personalDataInitialValues,
            validationSchema: personalDataSchema,
            onSubmit: async (values, { resetForm }) => {
              if (!profile) {
                handleAlert({ msg: "Enter Your Profile Photo", status: "error" })
                return
              }
              if (!nationalFront) {
                handleAlert({ msg: "Enter Your National Id (Front)", status: "error" })
                return
              }
              if (!nationalBack) {
                handleAlert({ msg: "Enter Your National Id (Back)", status: "error" })
                return
              }
              if (!values.address) {
                handleAlert({ msg: "Choose Your Address", status: "error" })
                return
              }
              values.profile = profile
              values.nationalFront = nationalFront
              values.nationalBack = nationalBack
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
          }
        case "driver_license":
          return {
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
          }
        case "car_info":
          return {
            initialValues: carInfoInitialValues,
            validationSchema: carInfoSchema,
            onSubmit: async (values, { resetForm }) => {
              if (!registration) {
                handleAlert({ msg: "Enter Car License (Front)", status: "error" })
                return
              }
              if (!insurance) {
                handleAlert({ msg: "Enter Car License (Back)", status: "error" })
                return
              }
              values.registration= registration
              values.insurance= insurance
              if (!localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)) {
                handleAlert({ msg: "Choose Driver First", status: "error" })
                navigate(`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`)
                return
              }
              values.color = values.color.slice(1)
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
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          }
        case "car_album":
          return {
            initialValues: carAlbumInitialValues,
            validationSchema: carAlbumSchema,
            onSubmit: async (values, { resetForm }) => {
              if (!front) {
                handleAlert({ msg: "Enter Car (Front)", status: "error" })
                return
              }
              if (!back) {
                handleAlert({ msg: "Enter Car (Back)", status: "error" })
                return
              }
              if (!right) {
                handleAlert({ msg: "Enter Car (Right)", status: "error" })
                return
              }
              if (!left) {
                handleAlert({ msg: "Enter Car (Left)", status: "error" })
                return
              }
              values.front =front
              values.back = back
              values.right = right
              values.left = left
              if (!localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)) {
                handleAlert({ msg: "Choose Driver First", status: "error" })
                navigate(`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`)
                return
              }
              setLoading(true)
              const formData = new FormData()
              formData.append("front", values.front)
              formData.append("back", values.back)
              formData.append("right", values.right)
              formData.append("left", values.left)
              await axios.post(`${server_url}/CreateCarAlbum?id=${localStorage.getItem(`${process.env.REACT_APP_CURRENT_DRIVER_ID}`)}`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(() => {
                resetForm()
                values.front = null
                values.back = null
                values.right = null
                values.left = null
                handleAlert({ msg: "Car Album is Created Successfully", status: "success" })
                navigate(`${process.env.REACT_APP_DRIVERS_ROUTE}`)
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          }
        case "trip_details":
          return {
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
              values.driver=null
              await axios.post(`${server_url}/CreateTrip`, values, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then((res) => {
                resetForm()
                setAddTripTab(1)
                handleAlert({ msg: "Trip is Created Successfully", status: "success" })
                dispatch(getNearestDrivers({ lat: res.data.data.pickup.latitude, lng: res.data.data.pickup.longitude }))
                setTripId(res.data.data._id)
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          }
        case "assign_driver":
          return {
            initialValues: {driver:""},
            onSubmit: async (values, { resetForm }) => {
              setLoading(true)
              values.driver = driverId
              await axios.put(`${server_url}/UpdateTrip?id=${tripId}`, values, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(() => {
                resetForm()
                handleAlert({ msg: "Driver is Assigned Successfully", status: "success" })
                dispatch(getTrips({page:0,date:chosenDate}))
                navigate(`${process.env.REACT_APP_TRIPS_ROUTE}`)
                handleCloseAssignDriverModal()
                handleCloseNearestDriversModal()
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          }
        case "edit_driver":
          return {
            initialValues: editDriverInitialValues,
            validationSchema: editDriverSchema,
            onSubmit: async (values) => {
              if (!profile) {
                handleAlert({ msg: "Enter Your Profile Photo", status: "error" })
                return
              }
              if (!nationalFront) {
                handleAlert({ msg: "Enter Your National Id (Front)", status: "error" })
                return
              }
              if (!nationalBack) {
                handleAlert({ msg: "Enter Your National Id (Back)", status: "error" })
                return
              }
              setLoading(true)
              const formDate = new FormData()
              formDate.append("firstName", values.firstName)
              formDate.append("lastName", values.lastName)
              formDate.append("email", values.email)
              formDate.append("phone", values.phone)
              formDate.append("birthDate", values.birthDate)
              formDate.append("ssn", values.ssn)
              formDate.append("medicalInsurance", values.medicalInsurance)
              formDate.append("password", values.password)
              formDate.append("latitude", values.latitude)
              formDate.append("longitude", values.longitude)
              formDate.append("address", values.address)
              formDate.append("profile", profile)
              formDate.append("nationalFront", nationalFront)
              formDate.append("nationalBack", nationalBack)
              // formDate.append("licenseFront", values.licenseFront)
              // formDate.append("licenseBack", values.licenseBack)
              await axios.put(`${server_url}/UpdateDriver?id=${driver._id}`, formDate, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(() => {
                handleAlert({ msg: "Driver is Updated Successfully", status: "success" })
                if (pathname === `${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`) {
                  dispatch(getPendingDrivers({ page: 0 }))
                }else{
                  dispatch(getDrivers({ page: 0 }))
                }
                handleCloseEditDriverDrawer()
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          } 
        case "verify_driver":
          return {
            initialValues: {anything:""},
            onSubmit: async () => {
              setLoading(true)
              await axios.put(`${server_url}/VerifyDriver?id=${driverId}`,{}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(() => {
                handleAlert({ msg: "Driver is Verified Successfully", status: "success" })
                dispatch(getPendingDrivers({ page: 0 }))
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          }
        case "create_multiple_trips":
          return {
            initialValues: {trips:[]},
            onSubmit: async (values) => {
              setLoading(true)
              const allTrips = trips.trips
              for(let i=0;i<allTrips.length;i++){
                const t = {
                  driver:allTrips[i]?.driver?._id,
                  firstName:allTrips[i].patient.firstName,
                  lastName:allTrips[i].patient.lastName,
                  birthDate:allTrips[i].birthDate,
                  phone:allTrips[i].patient.phone,
                  type:allTrips[i].type,
                  date:allTrips[i].date,
                  time:allTrips[i].time,
                  cost:+allTrips[i].cost,
                  number:allTrips[i].number,
                  specialNeeds:allTrips[i].specialNeeds,
                  pickup:{
                    latitude:allTrips[i].pickup.lat,
                    longitude:allTrips[i].pickup.lng,
                    address:allTrips[i].pickup.address
                  },
                  destination:{
                    latitude:allTrips[i].destination.lat,
                    longitude:allTrips[i].destination.lng,
                    address:allTrips[i].destination.address
                  },
                }
                values.trips.push(t)
              }
              await axios.post(`${server_url}/CreateMultiTrip`,values.trips, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(() => {
                handleAlert({ msg: "Trips is Created Successfully", status: "success" })
                dispatch(getTrips({ page: 0 ,date:todayDate}))
                navigate(`${process.env.REACT_APP_TRIPS_ROUTE}`)
                setSheetTrip(false)
                handleCloseCreateMultipleTripsModal()
              }).catch((err) => {
                handleCatchError(err)
              })
              setLoading(false)
            }
          }
        case "filter_trips_by_date":
          return {
            initialValues: filterTripsByDateInitialValues,
            onSubmit: async (values) => {
              dispatch(getTrips({ page: 0, date: values.date }))
              setChosenDate(values.date)
            }
          } 
        case "search_for_driver":
          return {
            initialValues: forgotPasswordInitialValues,
            onSubmit: async () => {
              handleAlert({ msg: "Under Development...", status: "error" })
            }
          } 
        case "search_for_trip":
          return {
            initialValues: forgotPasswordInitialValues,
            onSubmit: async () => {
              handleAlert({ msg: "Under Development...", status: "error" })
            }
          } 
        default:
          return ""
      }
    },[type, navigate, dispatch, token, setAddDriverTab, setAddTripTab, driver, pathname, handleCloseEditDriverDrawer, driverId,profile,nationalFront,nationalBack,registration,insurance,left,front,back,right,tripId,setTripId,handleCloseAssignDriverModal,todayDate,handleCloseNearestDriversModal,trips,setSheetTrip,setChosenDate,chosenDate,handleCloseCreateMultipleTripsModal])
  
  const formik = useFormik(formikObj)

  return {formik,loading}
}

export default useSubmitForm