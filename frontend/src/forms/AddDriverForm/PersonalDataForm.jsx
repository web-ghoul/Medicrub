import { AssignmentIndRounded, ContactsRounded, DateRangeRounded, EmailRounded, MedicalServicesRounded, PasswordRounded, PhoneAndroidRounded } from '@mui/icons-material'
import { Box, CircularProgress, InputAdornment, Typography } from '@mui/material'
import React from 'react'
import SelectLocation from '../../components/SelectLocation/SelectLocation'
import UploadImage from '../../components/UploadImage/UploadImage'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const PersonalDataForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"}>Personal Data</Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-10`}>
        <UploadImage formik={formik} title={"The Profile photo will make you more reliable to other users of the application"} img={"/images/upload_profile.svg"} name={"profile"} />

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
            placeholder={"First Legal Name"}
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
            placeholder={"Last Legal Name"}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>

        <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
          <PrimaryTextField
            fullWidth
            type={"email"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="email"
            name="email"
            placeholder={"Email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

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
          <PrimaryTextField
            fullWidth
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MedicalServicesRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="medicalInsurance"
            name="medicalInsurance"
            placeholder={"Enter Your Medicial Insurance"}
            value={formik.values.medicalInsurance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.medicalInsurance && Boolean(formik.errors.medicalInsurance)}
            helperText={formik.touched.medicalInsurance && formik.errors.medicalInsurance}
          />


          <PrimaryTextField
            fullWidth
            type={"number"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactsRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="ssn"
            name="ssn"
            placeholder={"SSN"}
            value={formik.values.ssn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ssn && Boolean(formik.errors.ssn)}
            helperText={formik.touched.ssn && formik.errors.ssn}
          />
        </Box>

        <Box className={`grid justify-stretch items-center gap-1`}>
          <Typography variant='h6'>Your Brith Date</Typography>
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

        <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
          <UploadImage formik={formik} title={"National Id (Front)"} img={"/images/nationa_id_front.png"} name={"nationalFront"} />
          <UploadImage formik={formik} title={"National Id (Back)"} img={"/images/nationa_id_back.png"} name={"nationalBack"} />
        </Box>

        <SelectLocation formik={formik.values} label={"Enter Driver Location"} />

        <PrimaryTextField
          fullWidth
          type={"password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordRounded />
              </InputAdornment>
            ),
          }}
          variant={"outlined"}
          id="password"
          name="password"
          placeholder={"Enter Password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Box>
      <PrimaryButton loadingPosition={"center"}
        loading={loading} loadingIndicator={
          <CircularProgress sx={{ color: "#fff" }} />
        } fullWidth type={"submit"}>Next</PrimaryButton>
    </Box >
  )
}

export default PersonalDataForm