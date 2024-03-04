import React from 'react'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'

const SearchForTripForm = ({ formik }) => {
  return (
    <PrimaryInput
      formik={formik}
      type="search"
      name="search_for_trip"
      label={"Search for a trip..."}
      onChange={true}
    />
  )
}

export default SearchForTripForm