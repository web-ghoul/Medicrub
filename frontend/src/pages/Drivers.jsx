import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { getDrivers } from '../store/driversSlice'

const Drivers = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <div>Drivers</div>
  )
}

export default Drivers