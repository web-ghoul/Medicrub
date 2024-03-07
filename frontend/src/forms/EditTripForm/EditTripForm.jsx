import { AssignmentIndRounded, DateRangeRounded, MoneyRounded, NumbersRounded, PhoneAndroidRounded, TimerRounded } from '@mui/icons-material';
import { Box, CircularProgress, InputAdornment, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import SelectLocation from '../../components/SelectLocation/SelectLocation';
import { AppContext } from '../../context/AppContext';
import { handleDateForInput } from '../../functions/handleDateForInput';
import { PrimaryBox } from '../../mui/PrimaryBox';
import { PrimaryButton } from '../../mui/PrimaryButton';
import { PrimaryTextField } from '../../mui/PrimaryTextField';

const EditTripForm = ({ formik, loading }) => {
  const { currentTrip, sheetTrip } = useContext(AppContext)

  const updatedFormValuesRef = useRef()

  updatedFormValuesRef.current = () => {
    const newValues = {
      driver: sheetTrip ? currentTrip?.driver : currentTrip?.driver?._id,
      firstName: currentTrip.patient.firstName,
      lastName: currentTrip.patient.lastName,
      phone: currentTrip.patient.phone,
      date: handleDateForInput(currentTrip.date),
      time: currentTrip.time,
      cost: currentTrip.cost,
      number: currentTrip.number,
      pickup: {
        latitude: +currentTrip.pickup.latitude,
        longitude: +currentTrip.pickup.longitude,
        address: currentTrip.pickup.address
      },
      destination: {
        latitude: +currentTrip.destination.latitude,
        longitude: +currentTrip.destination.longitude,
        address: currentTrip.destination.address
      },
    }
    formik.setValues(newValues);
  }

  useEffect(() => {
    if (currentTrip) {
      updatedFormValuesRef.current()
    }
  }, [currentTrip])

  return (
    <PrimaryBox className={`w-[600px] grid justify-stretch items-center gap-6 px-8 overflow-auto md:!px-6  md:w-[450px] sm:!w-[100vw] relative bg-gray`}>
      <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>

        <Box className={`flex justify-start items-start`}>
          <Typography variant={"h3"}>Trip Details</Typography>
        </Box>

        <Box className={`grid justify-stretch items-center gap-10`}>
          <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
            <PrimaryTextField
              fullWidth
              type={"text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndRounded />
                  </InputAdornment>
                ),
              }}
              variant={"outlined"}
              id="firstName"
              name="firstName"
              placeholder={"Patient First Name"}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <PrimaryTextField
              fullWidth
              type={"text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndRounded />
                  </InputAdornment>
                ),
              }}
              variant={"outlined"}
              id="lastName"
              name="lastName"
              placeholder={"Patient Last Name"}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Box>

          <Box className={`flex justify-between items-end gap-6 md:grid md:justify-stretch`} >
            <PrimaryTextField
              fullWidth
              type={"tel"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidRounded />
                  </InputAdornment>
                ),
              }}
              variant={"outlined"}
              id="phone"
              name="phone"
              placeholder={"Phone Number"}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Box>

          <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
            <Box className={`grid justify-stretch items-center gap-1 w-full`}>
              <Typography variant='h6'>Trip Date</Typography>
              <PrimaryTextField
                fullWidth
                type={"date"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeRounded />
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
                id="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Box>
            <Box className={`grid justify-stretch items-center gap-1 w-full`}>
              <Typography variant='h6'>Trip Time</Typography>
              <PrimaryTextField
                fullWidth
                type={"time"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimerRounded />
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
                id="time"
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.time && Boolean(formik.errors.time)}
                helperText={formik.touched.time && formik.errors.time}
              />
            </Box>
          </Box>

          <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
            <PrimaryTextField
              fullWidth
              type={"text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersRounded />
                  </InputAdornment>
                ),
              }}
              variant={"outlined"}
              id="number"
              name="number"
              placeholder={"Trip Number"}
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />

            <PrimaryTextField
              fullWidth
              type={"number"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyRounded />
                  </InputAdornment>
                ),
              }}
              variant={"outlined"}
              id="cost"
              name="cost"
              placeholder={"Trip Cost"}
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cost && Boolean(formik.errors.cost)}
              helperText={formik.touched.cost && formik.errors.cost}
            />
          </Box>

          <SelectLocation formik={formik.values.pickup} label={"Pick Up Location"} />

          <SelectLocation formik={formik.values.destination} label={"Destination Location"} />
        </Box>

        <PrimaryButton loadingPosition={"center"}
          loading={loading} loadingIndicator={
            <CircularProgress sx={{ color: "#fff" }} />
          } fullWidth type={"submit"}>Edit</PrimaryButton>
      </Box >
    </PrimaryBox>
  )
}

export default EditTripForm