import { Box, CircularProgress, Typography } from '@mui/material'
import UploadImage from '../../components/UploadImage/UploadImage'
import { PrimaryButton } from '../../mui/PrimaryButton'

const LicenseForm = ({ formik, loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"}>Add License</Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-10`}>
        <Box className={`flex justify-between items-center gap-6 flex-wrap sm:!justify-center`} >
          <UploadImage formik={formik} title={"License (Front)"} img={"/images/nationa_id_front.png"} name={"front"} />
          <UploadImage formik={formik} title={"License (Back)"} img={"/images/nationa_id_back.png"} name={"back"} />
        </Box>
      </Box>
      <PrimaryButton loadingPosition={"center"}
        loading={loading} loadingIndicator={
          <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
        } fullWidth type={"submit"}>Next</PrimaryButton>
    </Box>
  )
}

export default LicenseForm