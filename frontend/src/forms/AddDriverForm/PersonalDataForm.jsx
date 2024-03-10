import { AssignmentIndRounded, ContactsRounded, DateRangeRounded, EmailRounded, MedicalServicesRounded, PasswordRounded, PhoneAndroidRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'
import SelectLocation from '../../components/SelectLocation/SelectLocation'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import UploadImage from '../../components/UploadImage/UploadImage'

const PersonalDataForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"} className='font-[600] text-primary'>Personal Data</Typography>
      </Box>

      <Box className={`grid justify-stretch items-center gap-10`}>
        {useMemo(() =>
          <UploadImage title={"The Profile photo will make you more reliable to other users of the application"} name={"profile"} defaultImage={"/images/profile.png"} />
          , []
        )}

        <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
          <PrimaryInput icon={<AssignmentIndRounded />} formik={formik} name={"firstName"} ph={"First Legal Name"} />

          <PrimaryInput
            formik={formik}
            icon={<AssignmentIndRounded />}
            name="lastName"
            ph={"Last Legal Name"}
          />
        </Box>

        <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
          <PrimaryInput
            formik={formik}
            type={"email"}
            icon={<EmailRounded />}
            name="email"
            ph={"Email"}
          />

          <PrimaryInput
            formik={formik}
            type={"tel"}
            icon={<PhoneAndroidRounded />}
            name="phone"
            ph={"Phone Number"}
          />
        </Box>

        <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
          <PrimaryInput
            formik={formik}
            icon={<MedicalServicesRounded />}
            name="medicalInsurance"
            ph={"Enter Your Medicial Insurance"}
            ac=""
          />


          <PrimaryInput
            formik={formik}
            type={"number"}
            icon={<ContactsRounded />}
            id="ssn"
            name="ssn"
            ph={"SSN"}
          />
        </Box>

        <Box className={`grid justify-stretch items-center gap-1`}>
          <Typography variant='h6'>Your Brith Date</Typography>
          <PrimaryInput
            formik={formik}
            type={"date"}
            icon={<DateRangeRounded />}
            name="birthDate"
            ph={"Birth Date"}
          />
        </Box>

        {useMemo(() =>
          <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
            <UploadImage title={"National Id (Front)"} name={"nationalFront"} defaultImage={"/images/national_id_front.png"} />
            <UploadImage title={"National Id (Back)"} name={"nationalBack"} defaultImage={"/images/national_id_back.png"} />
          </Box>
          , []
        )}

        <PrimaryInput
          formik={formik}
          type={"password"}
          icon={<PasswordRounded />}
          name="password"
          ph={"Enter Password"}
          ac='current-password'
        />

        <SelectLocation formik={formik.values} label={"Enter Driver Location"} />
      </Box>

      <SubmitButton variant={"primary"} loading={loading}>
        Next
      </SubmitButton>
    </Box >
  )
}

export default PersonalDataForm