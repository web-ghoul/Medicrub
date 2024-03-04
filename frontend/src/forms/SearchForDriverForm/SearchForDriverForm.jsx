import React from 'react'
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput'

const SearchForDriverForm = ({ formik }) => {
  return (
    <PrimaryInput
      formik={formik}
      type="search"
      name="search_for_driver"
      label={"Search for a driver..."}
      onChange={true}
    />
  )
}

export default SearchForDriverForm