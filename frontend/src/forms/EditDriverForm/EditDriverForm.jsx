import { AssignmentIndRounded, CloseRounded, ContactsRounded, DateRangeRounded, EmailRounded, MedicalServicesRounded, PasswordRounded, PhoneAndroidRounded } from '@mui/icons-material';
import { Box, CircularProgress, Divider, IconButton, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import SelectLocation from '../../components/SelectLocation/SelectLocation';
import UploadImage from '../../components/UploadImage/UploadImage';
import { AppContext } from '../../context/AppContext';
import { handleDateForInput } from '../../functions/handleDateForInput';
import { PrimaryBox } from '../../mui/PrimaryBox';
import { PrimaryButton } from '../../mui/PrimaryButton';
import { PrimaryTextField } from '../../mui/PrimaryTextField';
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
      nationalFront: driver.nationalCard.front,
      nationalBack: driver.nationalCard.back,
      licenseFront: driver.driverLicense.back,
      licenseBack: driver.driverLicense.back
    };
    formik.setValues(newValues);
  };

  useEffect(() => {
    if (!isLoading) {
      updateFormValuesRef.current();
    }
  }, [driver, isLoading]);

  return (
    <PrimaryBox className={`w-[500px] grid justify-stretch items-center gap-6 px-8 overflow-auto md:w-[400px] sm:!w-[100vw] relative bg-gray`}>
      {
        isLoading ? <LoadingDriverInfo /> : (
          <>
            {smSize && <IconButton onClick
              ={handleCloseDriverDrawer} className='!absolute top-[10px] right-[10px]'>
              <CloseRounded />
            </IconButton>}

            <Box className={`grid justify-stretch items-center gap-4`}>
              <UploadImage formik={formik} title={"Profile Image"} name={"profile"} />
              <PrimaryTextField
                fullWidth
                type={"text"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndRounded />
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
                id="firstName"
                name="firstName"
                placeholder={"First Legal Name"}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <PrimaryTextField
                fullWidth
                type={"text"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndRounded />
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
                id="lastName"
                name="lastName"
                placeholder={"Last Legal Name"}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Box>
            <Divider className='!border-2' />
            <Box className={`grid justify-stretch items-center gap-3`}>
              <Typography variant='h6' className='font-[700] text-primary'>Personal Information</Typography>
              <Box className={`grid justify-stretch items-center gap-4`}>
                <PrimaryTextField
                  fullWidth
                  type={"email"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRounded />
                      </InputAdornment>
                    ),
                  }}
                  variant={"outlined"}
                  id="email"
                  name="email"
                  placeholder={"Email"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <PrimaryTextField
                  fullWidth
                  type={"tel"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidRounded />
                      </InputAdornment>
                    ),
                  }}
                  variant={"outlined"}
                  id="phone"
                  name="phone"
                  placeholder={"Phone Number"}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />

                <PrimaryTextField
                  fullWidth
                  type={"text"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MedicalServicesRounded />
                      </InputAdornment>
                    ),
                  }}
                  variant={"outlined"}
                  id="medicalInsurance"
                  name="medicalInsurance"
                  placeholder={"Enter Your Medicial Insurance"}
                  value={formik.values.medicalInsurance}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.medicalInsurance && Boolean(formik.errors.medicalInsurance)}
                  helperText={formik.touched.medicalInsurance && formik.errors.medicalInsurance}
                />

                <PrimaryTextField
                  fullWidth
                  type={"number"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactsRounded />
                      </InputAdornment>
                    ),
                  }}
                  variant={"outlined"}
                  id="ssn"
                  name="ssn"
                  placeholder={"SSN"}
                  value={formik.values.ssn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                  helperText={formik.touched.ssn && formik.errors.ssn}
                />

                <Box className={`grid justify-stretch items-center gap-1`}>
                  <Typography variant='h6'>Your Brith Date</Typography>
                  <PrimaryTextField
                    fullWidth
                    type={"date"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeRounded />
                        </InputAdornment>
                      ),
                    }}
                    variant={"outlined"}
                    id="birthDate"
                    name="birthDate"
                    placeholder={"Birth Date"}
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                  />
                </Box>

                <PrimaryTextField
                  fullWidth
                  type={"password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordRounded />
                      </InputAdornment>
                    ),
                  }}
                  variant={"outlined"}
                  id="password"
                  name="password"
                  placeholder={"Enter new password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <SelectLocation formik={formik.values} label={"Enter Driver Location"} />
              </Box>
            </Box>
            <Divider className='!border-2' />
            <Box className={`grid justify-stretch items-center gap-3`}>
              <Typography variant='h6' className='font-[700] text-primary'>National ID</Typography>
              <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
                <UploadImage formik={formik} title={"National Id (Front)"} name={"nationalFront"} />
                <UploadImage formik={formik} title={"National Id (Back)"} name={"nationalBack"} />
              </Box>
            </Box>
            <Divider className='!border-2' />
            <Box className={`grid justify-stretch items-center gap-3`}>
              <Typography variant='h6' className='font-[700] text-primary'>Driver License</Typography>
              <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
                <UploadImage formik={formik} title={"Driver License (Front)"} name={"licenseFront"} />
                <UploadImage formik={formik} title={"Driver License (Back)"} name={"licenseBack"} />
              </Box>
            </Box>
            <PrimaryButton loadingPosition={"center"}
              loading={loading} loadingIndicator={
                <CircularProgress sx={{ color: "#fff" }} />
              } fullWidth type={"submit"}>Edit</PrimaryButton>
          </>
        )
      }

    </PrimaryBox>
  )
}

export default EditDriverForm