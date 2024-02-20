import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import UploadImage from '../../components/UploadImage/UploadImage'
import { PrimaryButton } from '../../mui/PrimaryButton'

const CarAlbumForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"} className='font-[600] text-primary'>Car Album</Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-6 grid-cols-[1fr,1fr] md:!grid-cols-[1fr]`} >
        <UploadImage formik={formik} title={"Car (Front)"} name={"front"} />
        <UploadImage formik={formik} title={"Car (Back)"} name={"back"} />
        <UploadImage formik={formik} title={"Car (Right)"} name={"right"} />
        <UploadImage formik={formik} title={"Car (Left)"} name={"left"} />
      </Box>
      <PrimaryButton loadingPosition={"center"}
        loading={loading} loadingIndicator={
          <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
        } fullWidth type={"submit"}>Add</PrimaryButton>
    </Box>
  )
}

export default CarAlbumForm