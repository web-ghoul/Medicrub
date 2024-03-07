import { Skeleton } from "@mui/material"
import React from 'react'

const LoadingMap = () => {
  return (
    <Skeleton className={"w-full !h-[400px] md:!h-[350px] sm:!h-[300px]"} variant={"rounded"} />
  )
}

export default LoadingMap