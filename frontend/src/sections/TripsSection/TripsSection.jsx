import { AddRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UploadExcel from '../../components/UploadExcel/UploadExcel'
import { AppContext } from '../../context/AppContext'
import Forms from '../../forms/Forms'
import { PrimaryBox } from '../../mui/PrimaryBox'
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryContainer } from '../../mui/PrimaryContainer'
import TripsTable from '../../tables/TripsTable/TripsTable'

const TripsSection = () => {
  const { setAddTripTab } = useContext(AppContext)

  return (
    <PrimaryBox>
      <PrimaryContainer className='!flex flex-col justify-stretch items-stretch gap-6 md:gap-4 sm:gap-2'>
        <Box className={`grid grid-cols-2 sm:grid-cols-1 justify-stretch items-center gap-2 sm:gap-3`}>
          <Forms type={"search_for_trip"} />
          <Box className={`flex justify-end items-center sm:order-[-1]`}>
            <Link to={`${process.env.REACT_APP_ADD_TRIP_ROUTE}`} className='flex justify-stretch items-center w-fit !no-underline'>
              <PrimaryButton onClick={() => setAddTripTab(0)}>
                <AddRounded />
                <Typography variant='button'>Add Trip</Typography>
              </PrimaryButton>
            </Link>
          </Box>
        </Box>
        <UploadExcel />
        <TripsTable />
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default TripsSection