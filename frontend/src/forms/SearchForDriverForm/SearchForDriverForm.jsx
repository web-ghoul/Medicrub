import React from 'react'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const SearchForDriverForm = ({ searchForDriver, setSearchForDriver }) => {
  return (
    <PrimaryTextField
      fullWidth
      variant="outlined"
      type="search"
      id="search_for_driver"
      name="search_for_driver"
      label={"Search for a driver..."}
      value={searchForDriver}
      onChange={(e) => setSearchForDriver(e.target.value)}
    />
  )
}

export default SearchForDriverForm