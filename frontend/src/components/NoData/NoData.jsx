import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const NoData = ({ title }) => {
  return (
    <Box className={`grid justify-center items-center gap-4 p-4 md:!p-2`}>
      <Box className={`flex justify-center items-center `}>
        <LazyLoadImage width={100} src={"/images/no_data.png"} alt={"No Data"} />
      </Box>
      <Typography variant="h6" sx={{ color: (theme) => theme.palette.common.gray }} className="text-center " >{title}</Typography>
    </Box>
  )
}

export default NoData