import { AssignmentIndRounded, DateRangeRounded, MedicalServicesRounded, MoneyRounded, NumbersRounded, PhoneAndroidRounded, TimerRounded, VaccinesRounded } from '@mui/icons-material'
import { Box, CircularProgress, InputAdornment, Typography } from '@mui/material'
import React from 'react'
import SelectLocation from '../../components/SelectLocation/SelectLocation'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const TripDetailsForm = ({ formik, loading }) => {
  return (
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
          <Box className={`grid justify-stretch items-center gap-1 w-full`}>
            <Typography variant='h6'>Patient Brith Date</Typography>
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
              id="birthDate"
              name="birthDate"
              placeholder={"Birth Date"}
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
              helperText={formik.touched.birthDate && formik.errors.birthDate}
            />
          </Box>

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

        <PrimaryTextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MedicalServicesRounded />
              </InputAdornment>
            ),
          }}
          select
          SelectProps={{
            native: true,
          }}
          variant={"outlined"}
          id="type"
          name="type"
          placeholder={"Trip Type"}
          value={formik.values.medicalInsurance}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        >
          <option value={""}>Trip Type</option>
          <option value={"Medical"}>Medical</option>
        </PrimaryTextField>

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
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VaccinesRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="specialNeeds"
            name="specialNeeds"
            placeholder={"Special Needs"}
            value={formik.values.specialNeeds}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.specialNeeds && Boolean(formik.errors.specialNeeds)}
            helperText={formik.touched.specialNeeds && formik.errors.specialNeeds}
          />
        </Box>

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

        <SelectLocation formik={formik.values.pickup} label={"Pick Up Location"} />

        <SelectLocation formik={formik.values.destination} label={"Destination Location"} />
      </Box>

      <PrimaryButton loadingPosition={"center"}
        loading={loading} loadingIndicator={
          <CircularProgress sx={{ color: "#fff" }} />
        } fullWidth type={"submit"}>Next</PrimaryButton>
    </Box >
  )
}

export default TripDetailsForm