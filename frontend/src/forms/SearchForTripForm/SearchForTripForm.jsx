import React from 'react'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const SearchForTripForm = ({ searchForTrip, setSearchForTrip }) => {
  return (
    <PrimaryTextField
      fullWidth
      variant="outlined"
      type="search"
      id="search_for_trip"
      name="search_for_trip"
      label={"Search for a trip..."}
      value={searchForTrip}
      onChange={(e) => setSearchForTrip(e.target.value)}
    />
  )
}

export default SearchForTripForm