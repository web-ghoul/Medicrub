import { AddRounded } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Forms from '../../forms/Forms'
import { PrimaryBox } from '../../mui/PrimaryBox'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryContainer } from '../../mui/PrimaryContainer'
import DriversTable from '../../tables/DriversTable/DriversTable'

const DriversSection = () => {
  const { drivers } = useSelector((state) => state.drivers)
  return (
    <PrimaryBox>
      <PrimaryContainer className='!flex flex-col justify-stretch items-stretch gap-6'>
        <Box className={`grid grid-cols-2 justify-stretch items-center gap-2`}>
          <Forms type={"search_for_driver"} />
          <Box className={`flex justify-end items-center`}>
            <Link href={`${process.env.REACT_APP_ADD_DRIVER_ROUTE}`} className='flex justify-stretch items-center w-fit'>
              <PrimaryButton>
                <AddRounded />
                <Typography variant='button'>Add Driver</Typography>
              </PrimaryButton>
            </Link>
          </Box>
        </Box>
        {drivers && <DriversTable data={drivers} />}
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default DriversSection