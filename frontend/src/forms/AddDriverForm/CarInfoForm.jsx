import { CarCrashRounded, CarRentalRounded, ColorLensRounded, SdRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import UploadImage from '../../components/UploadImage/UploadImage'

const CarInfoForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"} className='font-[600] text-primary'>Car Information</Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-10`}>
        <Box className={`flex justify-between items-center gap-6 md:grid md:justify-stretch`} >
          <PrimaryInput
            formik={formik}
            icon={<CarCrashRounded />}
            name="carType"
            ph={"Car Type"}
          />

          <PrimaryInput
            formik={formik}
            Icon={<CarRentalRounded />}
            name="carModel"
            ph={"Car Model"}
          />
        </Box>

        <Box className={`flex justify-between items-end gap-6 md:grid md:justify-stretch`} >
          <Box className={`grid justify-stretch items-center gap-1 w-full`}>
            <Typography variant='h6'>Car Color</Typography>
            <PrimaryInput
              formik={formik}
              type={"color"}
              icon={<ColorLensRounded sx={{ color: formik.values.color }} />}
              name="color"
              ph={"Car Color"}
            />
          </Box>
          <PrimaryInput
            formik={formik}
            icon={<SdRounded />}
            name="plateNum"
            ph={"Plate Number"}
          />
        </Box>

        {useMemo(() =>
          <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
            <UploadImage title={"Car License (Front)"} name={"registration"} />
            <UploadImage title={"Car License (Back)"} name={"insurance"} />
          </Box>, []
        )}
      </Box>
      <SubmitButton variant={"primary"} loading={loading}>
        Next
      </SubmitButton>
    </Box>
  )
}

export default CarInfoForm