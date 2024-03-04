import React, { useMemo } from 'react';
import useSubmitForm from "../hooks/useSubmitForm";
import CarAlbumForm from "./AddDriverForm/CarAlbumForm";
import CarInfoForm from "./AddDriverForm/CarInfoForm";
import PersonalDataForm from "./AddDriverForm/PersonalDataForm";
import LicenseForm from "./AddDriverForm/licenseForm";
import AssignDriverForm from "./AddTripForm/AssignDriverForm";
import TripDetailsForm from "./AddTripForm/TripDetailsForm";
import CreateMultipleTripsForm from './CreateMultipleTripsForm/CreateMultipleTripsForm';
import EditDriverForm from "./EditDriverForm/EditDriverForm";
import FilterTripsByDateForm from "./FilterTripsByDateForm/FilterTripsByDateForm";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import LoginForm from './LoginForm/LoginForm';
import SearchForDriverForm from "./SearchForDriverForm/SearchForDriverForm";
import SearchForTripForm from "./SearchForTripForm/SearchForTripForm";
import VerifyDriverForm from "./VerifyDriverForm/VerifyDriverForm";

const Forms = ({ type }) => {
  const { formik, loading } = useSubmitForm(type)

  return (
    <form
      className={`${(type === "personal_data" || type ===
        "search_for_driver") && "w-full"}`}
      onSubmit={formik.handleSubmit}
      id="form"
    >
      {useMemo(() => {
        return (type === "login" ? <LoginForm loading={loading} formik={formik} /> : type === "forgot_password" ? <ForgotPasswordForm formik={formik} loading={loading} /> : type === "personal_data" ? <PersonalDataForm formik={formik} loading={loading} /> : type === "driver_license" ? <LicenseForm formik={formik} loading={loading} /> : type === "trip_details" ? <TripDetailsForm formik={formik} loading={loading} /> : type === "assign_driver" ? <AssignDriverForm formik={formik} loading={loading} /> : type === "car_info" ? <CarInfoForm formik={formik} loading={loading} /> : type === "car_album" ? <CarAlbumForm formik={formik} loading={loading} /> : type === "edit_driver" ? <EditDriverForm formik={formik} loading={loading} /> : type === "search_for_trip" ? <SearchForTripForm formik={formik} /> : type === "filter_trips_by_date" ? <FilterTripsByDateForm formik={formik} /> : type === "search_for_driver" ? <SearchForDriverForm formik={formik} /> : type === "verify_driver" ? <VerifyDriverForm loading={loading} /> : type === "create_multiple_trips" && <CreateMultipleTripsForm loading={loading} />)
      }, [formik, loading, type])}
    </form>
  )
}

export default Forms