import { AddRounded, UploadFileRounded } from '@mui/icons-material'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Forms from '../../forms/Forms'
import { PrimaryBox } from '../../mui/PrimaryBox'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryContainer } from '../../mui/PrimaryContainer'
import { UploadSheetButton } from '../../mui/UploadSheetButton'
import { getTrips } from '../../store/tripsSlice'
import TripsTable from '../../tables/TripsTable/TripsTable'

const TripsSection = () => {
  const { setAddTripTab } = useContext(AppContext)
  const smScreen = useMediaQuery("(max-width:768px)")
  const dispatch = useDispatch()
  const { todayDate } = useContext(AppContext)
  const { trips, isLoading } = useSelector((state) => state.trips)

  useEffect(() => {
    dispatch(getTrips({ page: 0, date: todayDate }))
  }, [dispatch, todayDate])

  return (
    <PrimaryBox>
      <PrimaryContainer className='!flex flex-col justify-stretch items-stretch gap-6 md:gap-4 sm:gap-2'>
        <Box className={`grid justify-stretch items-end grid-cols-[1fr,1fr,auto] md: sm:grid-cols-1 gap-6 md:!gap-2 sm:!gap-3`}>
          <Forms type={"search_for_trip"} />
          <Box className={`flex justify-end items-center gap-4 sm:order-[-1] lg:!gap-2`}>
            <Link to={`${process.env.REACT_APP_ADD_TRIP_ROUTE}`} className='flex justify-stretch items-center w-fit !no-underline'>
              <PrimaryButton onClick={() => setAddTripTab(0)}>
                <AddRounded />
                {!smScreen && <Typography variant='button'>Add Trip</Typography>}
              </PrimaryButton>
            </Link>
            <Link to={`${process.env.REACT_APP_TRIP_SHEET_ROUTE}`}>
              <UploadSheetButton >
                <UploadFileRounded />
                {!smScreen && <Typography variant='button'>Upload Sheet</Typography>}
              </UploadSheetButton>
            </Link>
          </Box>
        </Box>
        <Forms type={"filter_trips_by_date"} />
        <TripsTable data={trips} isLoading={isLoading} />
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default TripsSection