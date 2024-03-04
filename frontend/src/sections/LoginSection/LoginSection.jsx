import { Box, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Forms from '../../forms/Forms'
import { PrimaryBox } from '../../mui/PrimaryBox'
import { PrimaryContainer } from '../../mui/PrimaryContainer'

const LoginSection = () => {
  return (
    <Box className={`grid justify-stretch items-center grid-cols-2 min-h-[100%] sm:grid-cols-1`}>
      <PrimaryContainer className={`sm:!hidden h-[100%] overflow-hidden bg-secondary relative `}>
        <PrimaryBox className='grid justify-center items-end md:items-center h-[100%]'>
          <Box className='absolute top-0 left-0'>
            <LazyLoadImage src={"./images/login_back1.svg"} alt={"login_back1"} />
          </Box>
          <Box className={`text-white grid justify-center items-center absolute top-[40px] left-[40px]`} data-test={"logo"}>
            <LazyLoadImage src={"./images/logo.png"} alt={"login"} className='z-10 w-[50px]' />
            <Typography variant='h6'>Medicrub</Typography>
          </Box>
          <LazyLoadImage src={"./images/login.svg"} alt={"login"} className='z-10' />
          <Box className={`absolute right-0 bottom-0`}>
            <LazyLoadImage src={"./images/login_back2.svg"} alt={"login_back2"} />
          </Box>
        </PrimaryBox>
      </PrimaryContainer>

      <PrimaryContainer className='flex justify-stretch items-stretch'>
        <PrimaryBox className='grid justify-stretch items-center gap-4 h-[100%]'>
          <Box className={`text-black hidden justify-center items-center top-[40px] left-[40px] sm:grid`} data-test={"logo"}>
            <LazyLoadImage src={"./images/logo.png"} alt={"login"} className='z-10 w-[50px]' />
            <Typography variant='h6'>Medicrub</Typography>
          </Box>
          <Forms type={"login"} />
        </PrimaryBox>
      </PrimaryContainer>
    </Box>
  )
}

export default LoginSection