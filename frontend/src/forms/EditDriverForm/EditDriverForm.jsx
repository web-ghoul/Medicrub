import { AssignmentIndRounded, CloseRounded, ContactsRounded, DateRangeRounded, EmailRounded, MedicalServicesRounded, PasswordRounded, PhoneAndroidRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { useSelector } from "react-redux";
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput';
import SelectLocation from '../../components/SelectLocation/SelectLocation';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import UploadImage from '../../components/UploadImage/UploadImage';
import { AppContext } from '../../context/AppContext';
import { handleDateForInput } from '../../functions/handleDateForInput';
import { PrimaryBox } from '../../mui/PrimaryBox';
import LoadingDriverInfo from '../../sidebars/DriverSidebar/LoadingDriverInfo';

const EditDriverForm = ({ formik, loading }) => {
  const { handleCloseDriverDrawer } = useContext(AppContext)
  const smSize = useMediaQuery("(max-width:768px)")
  const { driver, isLoading } = useSelector((state) => state.driver)

  const updateFormValuesRef = useRef();

  updateFormValuesRef.current = () => {
    const newValues = {
      firstName: driver.user.firstName,
      lastName: driver.user.lastName,
      ssn: driver.user.ssn,
      birthDate: handleDateForInput(driver.user.birthDate),
      medicalInsurance: driver.user.medicalInsurance,
      phone: driver.user.phone,
      profile: driver.user.profileImage,
      email: driver.user.email,
      address: driver.user.location.address,
      latitude: +driver.user.location.latitude,
      longitude: +driver.user.location.longitude,
      nationalFront: driver?.nationalCard?.front,
      nationalBack: driver?.nationalCard?.back,
      password: ""
      // licenseFront: driver?.driverLicense?.back,
      // licenseBack: driver?.driverLicense?.back
    };
    formik.setValues(newValues);
  };

  useEffect(() => {
    if (!isLoading) {
      updateFormValuesRef.current();
    }
  }, [driver, isLoading]);

  const nationalIdImages = useMemo(() =>
    <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
      <UploadImage title={"National Id (Front)"} name={"nationalFront"} value={driver?.nationalCard?.front} />
      <UploadImage title={"National Id (Back)"} name={"nationalBack"} value={driver?.nationalCard?.back} />
    </Box>, [driver]
  )

  return (
    <PrimaryBox className={`w-[600px] grid justify-stretch items-center gap-6 px-8 overflow-auto md:!px-6  md:w-[450px] sm:!w-[100vw] relative bg-gray`}>
      {
        isLoading ? <LoadingDriverInfo /> : (
          <>
            {smSize && <IconButton onClick
              ={handleCloseDriverDrawer} className='!absolute top-[10px] right-[10px]'>
              <CloseRounded />
            </IconButton>}

            <Box className={`grid justify-stretch items-center gap-4`}>
              <UploadImage formik={formik} title={"Profile Image"} name={"profile"} value={driver.user.profileImage} />

              <PrimaryInput
                formik={formik}
                icon={<AssignmentIndRounded />}
                name="firstName"
                ph={"First Legal Name"}
              />
              <PrimaryInput
                formik={formik}
                icon={<AssignmentIndRounded />}
                name="lastName"
                ph={"Last Legal Name"}
              />
            </Box>
            <Divider className='!border-2' />
            <Box className={`grid justify-stretch items-center gap-3`}>
              <Typography variant='h6' className='font-[700] text-primary'>Personal Information</Typography>
              <Box className={`grid justify-stretch items-center gap-4`}>
                <PrimaryInput
                  formik={formik}
                  type={"email"}
                  icon={<EmailRounded />}
                  name="email"
                  ph={"Email"}
                />

                <PrimaryInput
                  formik={formik}
                  type={"tel"}
                  icon={<PhoneAndroidRounded />}
                  name="phone"
                  ph={"Phone Number"}
                />

                <PrimaryInput
                  formik={formik}
                  icon={<MedicalServicesRounded />}
                  name="medicalInsurance"
                  ph={"Enter Your Medicial Insurance"}
                  ac={""}
                />

                <PrimaryInput
                  formik={formik}
                  type={"number"}
                  icon={<ContactsRounded />}
                  name="ssn"
                  ph={"SSN"}
                />

                <Box className={`grid justify-stretch items-center gap-1`}>
                  <Typography variant='h6'>Your Brith Date</Typography>
                  <PrimaryInput
                    formik={formik}
                    type={"date"}
                    icon={<DateRangeRounded />}
                    name="birthDate"
                    ph={"Birth Date"}
                  />
                </Box>

                <PrimaryInput
                  formik={formik}
                  type={"password"}
                  icon={<PasswordRounded />}
                  name="password"
                  ph={"Enter new password"}
                  ac={"current-password"}
                />

                <SelectLocation formik={formik.values} label={"Enter Driver Location"} />
              </Box>
            </Box>
            <Divider className='!border-2' />
            <Box className={`grid justify-stretch items-center gap-3`}>
              <Typography variant='h6' className='font-[700] text-primary'>National ID</Typography>
              {nationalIdImages}
            </Box>
            {/* <Divider className='!border-2' /> */}
            {/* <Box className={`grid justify-stretch items-center gap-3`}>
              <Typography variant='h6' className='font-[700] text-primary'>Driver License</Typography>
              <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
                <UploadImage formik={formik} title={"Driver License (Front)"} name={"licenseFront"} />
                <UploadImage formik={formik} title={"Driver License (Back)"} name={"licenseBack"} />
              </Box>
            </Box> */}
            <SubmitButton loading={loading}>
              Edit
            </SubmitButton>
          </>
        )
      }

    </PrimaryBox>
  )
}

export default EditDriverForm