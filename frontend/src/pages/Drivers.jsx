import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import DriversSection from '../sections/DriversSection/DriversSection'
import { getDrivers } from '../store/driversSlice'

const Drivers = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <DriversSection />
  )
}

export default Drivers