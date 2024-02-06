import { Box } from '@mui/material'
import React from 'react'

const Outlay = ({ clicked, toggle }) => {
  return (
    <Box className={`absolute w-full h-full bg-outlay ${toggle ? "z-[1299]" : "z-[-1] hidden"}`} onClick={clicked} />
  )
}

export default Outlay