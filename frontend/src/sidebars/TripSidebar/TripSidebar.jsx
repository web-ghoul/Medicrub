import { AccessTimeFilledRounded, AccountCircleRounded, AssignmentTurnedInRounded, CalendarMonthRounded, CallRounded, CloseRounded, DeleteRounded, DirectionsCarFilledRounded, EditRounded, FmdGoodRounded } from '@mui/icons-material';
import { Box, Drawer, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Location from '../../components/Location/Location';
import { AppContext } from '../../context/AppContext';
import { DrawersContext } from '../../context/DrawersContext';
import { ModalsContext } from '../../context/ModalsContext';
import { handleAlert } from '../../functions/handleAlert';
import { handleDateFormate } from '../../functions/handleDateFormate';
import { ConfirmButton } from '../../mui/ConfirmButton';
import { DarkButton } from '../../mui/DarkButton';
import { PrimaryBox } from '../../mui/PrimaryBox';
import { PrimaryButton } from '../../mui/PrimaryButton';
import { getDriver } from '../../store/driverSlice';
import { getNearestDrivers } from '../../store/nearestDriversSlice';
import AvatarTableBox from '../../tables/AvatarTableBox';
import DataBox from './DataBox';

const TripSidebar = () => {
  const { openTripDrawer, handleOpenEditTripDrawer, handleCloseTripDrawer, handleOpenDriverDrawer } = useContext(DrawersContext)
  const dispatch = useDispatch()
  const { currentTrip, setTripId } = useContext(AppContext)
  const { handleOpenNearestDriversModal } = useContext(ModalsContext)
  const smSize = useMediaQuery("(max-width:768px)")
  const { driver } = useSelector((state) => state.driver)

  const handleEditTrip = () => {
    handleCloseTripDrawer()
    handleOpenEditTripDrawer()
  }

  const handleDeleteTrip = () => {
    handleAlert({ msg: "Under Development..." })
  }

  const handleViewDriver = () => {
    if (!driver || driver._id !== currentTrip.driver._id) {
      dispatch(getDriver({ id: currentTrip.driver._id }))
    }
    handleOpenDriverDrawer()
    handleCloseTripDrawer()
  }

  const handleAssignDriver = () => {
    dispatch(getNearestDrivers({ lat: currentTrip.pickup.latitude, lng: currentTrip.pickup.longitude }))
    setTripId(currentTrip._id)
    handleOpenNearestDriversModal()
    handleCloseTripDrawer()
  }

  const iconStyle = "!text-[20px]"

  return (
    <Drawer
      anchor={"right"}
      open={openTripDrawer}
      onClose={handleCloseTripDrawer}
      sx={{ zIndex: 2500 }}
    >
      {currentTrip && <PrimaryBox className={`w-[600px] grid justify-stretch items-center gap-6 px-8 overflow-auto md:!px-6  md:w-[450px] sm:!w-[100vw] relative`}>
        {smSize && <IconButton onClick
          ={handleCloseTripDrawer} className='!absolute top-[10px] right-[10px]'>
          <CloseRounded />
        </IconButton>}
        <Box className={`grid justify-stretch items-center gap-3`}>
          <Typography variant='h5' className='font-[700] text-primary'>Trip Information</Typography>
          <Box className={`grid justify-stretch items-center gap-2`}>
            <DataBox val={`${currentTrip.patient.firstName} ${currentTrip.patient.lastName}`} icon={<AccountCircleRounded className={iconStyle} />} title={"Patient Name :"} />

            <DataBox val={currentTrip.patient.phone} icon={<CallRounded className={iconStyle} />} title={"Patient Phone :"} />

            <DataBox val={handleDateFormate(currentTrip.date)} icon={<CalendarMonthRounded className={iconStyle} />} title={"Trip Date :"} />

            <DataBox val={currentTrip.time} icon={<AccessTimeFilledRounded className={iconStyle} />} title={"Trip Time :"} />

            {
              currentTrip.driver &&
              <DataBox val={<AvatarTableBox name={`${currentTrip.driver.user.firstName} ${currentTrip.driver.user.lastName}`} title={"Driver:"} avatar={currentTrip.driver.user.profileImage} handleViewDriver={handleViewDriver} />} icon={<DirectionsCarFilledRounded className={iconStyle} />} title={"Driver :"} />
            }

            <DataBox val={currentTrip.pickup.address} icon={<FmdGoodRounded className={iconStyle} />} title={"Address :"} />
            <Location lat={+currentTrip.pickup.latitude} lng={+currentTrip.pickup.longitude} />

            <DataBox val={currentTrip.destination.address} icon={<FmdGoodRounded className={iconStyle} />} title={"Destination :"} />
            <Location lat={+currentTrip.destination.latitude} lng={+currentTrip.destination.longitude} />
          </Box>
        </Box>
        <Box className={`grid grid-cols-2 justify-stretch items-center gap-4`}>
          <ConfirmButton fullWidth onClick={handleAssignDriver}>
            <AssignmentTurnedInRounded />
            <Typography variant='button'>Assign</Typography>
          </ConfirmButton>
          <DarkButton fullWidth onClick={handleEditTrip}>
            <EditRounded />
            <Typography variant='button'>Edit</Typography>
          </DarkButton>
          <PrimaryButton fullWidth onClick={handleDeleteTrip}>
            <DeleteRounded />
            <Typography variant='button'>Delete</Typography>
          </PrimaryButton>
        </Box>
      </PrimaryBox>}
    </Drawer>
  )
}

export default TripSidebar