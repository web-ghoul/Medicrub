import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { DarkButton } from '../../mui/DarkButton'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

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
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="email"
          id="email"
          name="email"
          label={"Email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <DarkButton loadingPosition={"center"}
          loading={loading} loadingIndicator={
            <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
          } fullWidth type={"submit"}>Reset Password
        </DarkButton>
      </Box>
    </Box>
  )
}

export default ForgotPasswordForm