import { AddRounded } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Forms from '../../forms/Forms'
import { PrimaryBox } from '../../mui/PrimaryBox'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryContainer } from '../../mui/PrimaryContainer'
import { getDrivers } from '../../store/driversSlice'
import DriversTable from '../../tables/DriversTable/DriversTable'

const PendingDriversSection = () => {
  const { drivers } = useSelector((state) => state.drivers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryBox>
      <PrimaryContainer className='!flex flex-col justify-stretch items-stretch gap-6 md:gap-4 sm:gap-2'>
        <Box className={`grid grid-cols-2 sm:grid-cols-1 justify-stretch items-center gap-2 sm:gap-3`}>
          <Forms type={"search_for_driver"} />
          <Box className={`flex justify-end items-center sm:order-[-1]`}>
            <Link href={`${process.env.REACT_APP_ADD_DRIVER_ROUTE}`} className='flex justify-stretch items-center w-fit !no-underline'>
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

export default PendingDriversSection