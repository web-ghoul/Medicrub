import { AddRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Forms from '../../forms/Forms'
import { PrimaryBox } from '../../mui/PrimaryBox'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryContainer } from '../../mui/PrimaryContainer'

const TripsSection = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getTrips({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryBox>
      <PrimaryContainer className='!flex flex-col justify-stretch items-stretch gap-6 md:gap-4 sm:gap-2'>
        <Box className={`grid grid-cols-2 sm:grid-cols-1 justify-stretch items-center gap-2 sm:gap-3`}>
          <Forms type={"search_for_trip"} />
          <Box className={`flex justify-end items-center sm:order-[-1]`}>
            <Link to={`${process.env.REACT_APP_ADD_TRIP_ROUTE}`} className='flex justify-stretch items-center w-fit !no-underline'>
              <PrimaryButton>
                <AddRounded />
                <Typography variant='button'>Add Trip</Typography>
              </PrimaryButton>
            </Link>
          </Box>
        </Box>
        {/* {trips && <TripsTable data={trips} />} */}
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default TripsSection