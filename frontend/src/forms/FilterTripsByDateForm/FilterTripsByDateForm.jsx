import { Box, Typography } from '@mui/material'
import React from 'react'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'

const FilterTripsByDateForm = ({ formik }) => {
  return (
    <Box className={`grid justify-stretch items-center gap-2`}>
      <Typography variant='h6'>Filter By Date</Typography>
      <PrimaryInput type={"date"} name={"date"} formik={formik} onChange={true} />
    </Box>
  )
}

export default FilterTripsByDateForm