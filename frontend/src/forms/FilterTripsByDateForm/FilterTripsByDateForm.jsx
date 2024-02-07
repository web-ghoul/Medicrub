import { Box, Typography } from '@mui/material'
import React from 'react'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const FilterTripsByDateForm = ({ tripsDate, setTripsDate }) => {
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
        onChange={(e) => setTripsDate(e.target.value)}
      />
    </Box>
  )
}

export default FilterTripsByDateForm