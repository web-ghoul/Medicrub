import { HomeRounded } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PrimaryBox } from '../mui/PrimaryBox'
import { PrimaryButton } from '../mui/PrimaryButton'
import { PrimaryContainer } from '../mui/PrimaryContainer'

const Error = () => {
  return (
    <PrimaryBox className='h-[100vh] overflow-hidden'>
      <PrimaryContainer className='!grid justify-stretch items-center gap-2' sx={{ gridTemplateRows: "1fr auto" }}>
        <Box className={`flex justify-center items-center h-full overflow-hidden`} sx={{
          "& img": {
            width: { "md": "auto", "sm": "100%" }, height: {
              "md": "100%", "sm": "auto"
            }
          }
        }}>
          <LazyLoadImage src={"/images/error.jpg"} alt={"error"} />
        </Box>

        <Box className={"flex justify-center items-center"}>
          <Link href={`${process.env.REACT_APP_DASHBOARD_ROUTE}`} className='w-fit'>
            <PrimaryButton>
              <HomeRounded />
              <Typography variant='button'>Go to Dashboard</Typography>
            </PrimaryButton>
          </Link>
        </Box>
      </PrimaryContainer>
    </PrimaryBox >
  )
}

export default Error