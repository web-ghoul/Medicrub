import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const PrimaryLoadingTable = () => {
  return (
    <Box component={"tbody"} className={`p-4 md!p-2 grid justify-stretch items-center`}>
      {Array(Math.floor(Math.random() * 10)).fill(0).map((_, i) => (
        <Skeleton component={"tr"} key={i} className={`!h-[100px] md:!h-[80px]`} />
      ))}
    </Box>
  )
}

export default PrimaryLoadingTable