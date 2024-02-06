import { CarCrashRounded, CarRentalRounded, ColorLensRounded, SdRounded } from '@mui/icons-material'
import { Box, CircularProgress, InputAdornment, Typography } from '@mui/material'
import React from 'react'
import UploadImage from '../../components/UploadImage/UploadImage'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const CarInfoForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"}>Car Information</Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-10`}>
        <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
          <PrimaryTextField
            fullWidth
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CarCrashRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="carType"
            name="carType"
            placeholder={"Car Type"}
            value={formik.values.carType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.carType && Boolean(formik.errors.carType)}
            helperText={formik.touched.carType && formik.errors.carType}
          />

          <PrimaryTextField
            fullWidth
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CarRentalRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="carModel"
            name="carModel"
            placeholder={"Car Model"}
            value={formik.values.carModel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.carModel && Boolean(formik.errors.carModel)}
            helperText={formik.touched.carModel && formik.errors.carModel}
          />
        </Box>

        <Box className={`flex justify-between items-end gap-6 md:grid md:justify-stretch`} >
          <Box className={`grid justify-stretch items-center gap-1 w-full`}>
            <Typography variant='h6'>Car Color</Typography>
            <PrimaryTextField
              fullWidth
              type={"color"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ColorLensRounded sx={{ color: formik.values.color }} />
                  </InputAdornment>
                ),
              }}
              variant={"outlined"}
              id="color"
              name="color"
              placeholder={"Car Color"}
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
            />
          </Box>
          <PrimaryTextField
            fullWidth
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SdRounded />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            id="plateNum"
            name="plateNum"
            placeholder={"Plate Number"}
            value={formik.values.plateNum}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.plateNum && Boolean(formik.errors.plateNum)}
            helperText={formik.touched.plateNum && formik.errors.plateNum}
          />
        </Box>

        <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
          <UploadImage formik={formik} title={"Car License (Front)"} img={"/images/nationa_id_front.png"} name={"registration"} />
          <UploadImage formik={formik} title={"Car License (Back)"} img={"/images/nationa_id_back.png"} name={"insurance"} />
        </Box>
      </Box>
      <PrimaryButton loadingPosition={"center"}
        loading={loading} loadingIndicator={
          <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
        } fullWidth type={"submit"}>Add</PrimaryButton>
    </Box>
  )
}

export default CarInfoForm