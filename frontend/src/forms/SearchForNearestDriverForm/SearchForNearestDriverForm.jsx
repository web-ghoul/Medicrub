import React from 'react'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'

const SearchForNearestDriverForm = ({ formik }) => {
  return (
    <PrimaryInput
      formik={formik}
      type="search"
      name="search"
      label={"Search for a driver..."}
      onChange={true}
    />
  )
}

export default SearchForNearestDriverForm