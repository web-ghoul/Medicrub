import { Box, Typography } from '@mui/material'
import React from 'react'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const FilterTripsByDateForm = ({ tripsDate, handlFilterTripsByDate }) => {
  return (
    <Box className={`grid justify-stretch items-center gap-2`}>
      <Typography variant='h6'>Filter By Date</Typography>
      <PrimaryTextField
        fullWidth
        variant="outlined"
        type="date"
        id="filter_trips_by_date"
        name="filter_trips_by_date"
        value={tripsDate}
        onChange={handlFilterTripsByDate}
      />
    </Box>
  )
}

export default FilterTripsByDateForm