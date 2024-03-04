import { Box, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

const ForgotPasswordForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-full`}>
      <Box className={`flex justify-center items-center w-auto h-[100%]`}>
        <LazyLoadImage src={"/images/reset_password.svg"} alt={"forgot Password"} width={"100%"} height={"100%"} />
      </Box>
      <Box className={`grid justify-stretch items-center gap-6`}>
        <Box className={`flex justify-center items-start`}>
          <Typography variant={"h3"} className='font-[700]'>Forgot Password ?</Typography>
        </Box>
        <PrimaryInput formik={formik} label={"Email"} name={"email"} ac={"email"} />
        <SubmitButton loading={loading} dt={"login-button"}>
          Reset Password
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default ForgotPasswordForm