import { CalendarMonthRounded, CallRounded, CarCrashRounded, CarRentalRounded, CloseRounded, ColorLensRounded, ContactsRounded, ContentCopyRounded, EditRounded, FmdGoodRounded, MailRounded, MedicalServicesRounded, SdRounded } from '@mui/icons-material';
import { Box, Chip, Divider, Drawer, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from "react-redux";
import AlbumGhoul from '../../components/Album/Album';
import { AppContext } from '../../context/AppContext';
import { handleCopyText } from '../../functions/handleCopyText';
import { handleDateFormate } from '../../functions/handleDateFormate';
import { PrimaryBox } from '../../mui/PrimaryBox';
import { PrimaryButton } from '../../mui/PrimaryButton';
import DataBox from './DataBox';
import DriverAvatar from './DriverAvatar';
import LoadingDriverInfo from './LoadingDriverInfo';

const DriverSidebar = () => {
  const { driver, isLoading } = useSelector((state) => state.driver)
  const { openDriverDrawer, handleCloseDriverDrawer, handleOpenEditDriverDrawer } = useContext(AppContext)
  const smSize = useMediaQuery("(max-width:768px)")

  const handleEditDriver = () => {
    handleCloseDriverDrawer()
    handleOpenEditDriverDrawer()
  }

  return (
    <Drawer
      anchor={"right"}
      open={openDriverDrawer}
      onClose={handleCloseDriverDrawer}
      sx={{ zIndex: 2500 }}
    >
      <PrimaryBox className={`w-[600px] grid justify-stretch items-center gap-6 px-8 overflow-auto md:!px-6  md:w-[450px] sm:!w-[100vw] relative`}>
        {isLoading ?
          <LoadingDriverInfo /> : (
            <>
              {smSize && <IconButton onClick
                ={handleCloseDriverDrawer} className='!absolute top-[10px] right-[10px]'>
                <CloseRounded />
              </IconButton>}
              <DriverAvatar img={driver.user.profileImage} name={`${driver.user.firstName} ${driver.user.lastName}`} />
              <Divider className='!border-2' />
              <Box className={`grid justify-stretch items-center gap-3`}>
                <Typography variant='h6' className='font-[700] text-primary'>Personal Information</Typography>
                <Box className={`grid justify-stretch items-center gap-2`}>
                  <DataBox val={driver.user.email} icon={<MailRounded color='primary' />} title={"Email :"} />

                  <DataBox val={driver.user.phone} icon={<CallRounded color='primary' />} title={"Phone Number :"} />

                  <DataBox val={driver.user.location.address} icon={<FmdGoodRounded color='primary' />} title={"Address :"} />

                  <DataBox val={handleDateFormate(driver.user.birthDate)} icon={<CalendarMonthRounded color='primary' />} title={"Birth Date :"} />

                  <DataBox val={driver.user.medicalInsurance} icon={<MedicalServicesRounded color='primary' />} title={"Medical Insurance :"} />

                  <DataBox val={driver.user.ssn} icon={<ContactsRounded color='primary' />} title={"SSN :"} />
                </Box>
              </Box>
              {driver?.car && (
                <>
                  <Divider className='!border-2' />
                  <Box className={`grid justify-stretch items-center gap-3`}>
                    <Typography variant='h6' className='font-[700] text-primary'>Car Information</Typography>
                    <Box className={`grid justify-stretch items-center gap-2`}>
                      <DataBox val={driver.car.carType} icon={<CarCrashRounded color='primary' />} title={"Car Type :"} />

                      <DataBox val={driver.car.carModel} icon={<CarRentalRounded color='primary' />} title={"Car Model :"} />

                      <DataBox val={<Chip onClick={() => handleCopyText(`#${driver.car.color}`)} label={<ContentCopyRounded className='text-white' />} sx={{ backgroundColor: `#${driver.car.color}` }} />} icon={<ColorLensRounded color='primary' />} title={"Car Color :"} />

                      <DataBox val={driver.car.plateNum} icon={<SdRounded color='primary' />} title={"Plate Numebr :"} />
                    </Box>
                  </Box>
                </>
              )}
              {driver?.nationalCard && (
                <>
                  <Divider className='!border-2' />
                  <AlbumGhoul title={"National ID"} front={driver.nationalCard.front} back={driver.nationalCard.back} />
                </>
              )}
              {driver?.driverLicense && (
                <>
                  <Divider className='!border-2' />
                  <AlbumGhoul title={"Driver License"} front={driver.driverLicense.front} back={driver.driverLicense.back} />
                </>
              )}
              {driver?.car && (
                <>
                  <Divider className='!border-2' />
                  <AlbumGhoul title={"Car License"} front={driver.car.insurance} back={driver.car.registration} />
                </>
              )}
              {driver?.car?.carAlbum && (
                <>
                  <Divider className='!border-2' />
                  <AlbumGhoul title={"Car Album"} front={driver.car.carAlbum.front} back={driver.car.carAlbum.back} right={driver.car.carAlbum.right} left={driver.car.carAlbum.left} />
                </>
              )}
              <PrimaryButton onClick={handleEditDriver}>
                <EditRounded />
                <Typography variant='button'>Edit</Typography>
              </PrimaryButton>
            </>
          )
        }
      </PrimaryBox>
    </Drawer>
  )
}

export default DriverSidebar