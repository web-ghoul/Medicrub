import { FacebookRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../../context/AppContext";
import { DarkButton } from "../../mui/DarkButton";
import { PrimaryTextField } from "../../mui/PrimaryTextField";

const LoginForm = ({ formik, loading }) => {
  const { handleOpenForgotPasswordModal } = useContext(AppContext)
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"}>Sign in</Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-6`}>
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="text"
          id="username"
          name="username"
          label={"Username"}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <PrimaryTextField
          fullWidth
          variant="outlined"
          type="password"
          id="password"
          name="password"
          label={"Password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

      </Box>
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Box className={`flex justify-end items-center`}>
          <Button onClick={handleOpenForgotPasswordModal} className="w-fit !text-secondary">
            Forgot Password ?
          </Button>
        </Box>
        <DarkButton loadingPosition={"center"}
          loading={loading} loadingIndicator={
            <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
          } fullWidth type={"submit"}>Login</DarkButton>
      </Box>
      <Typography variant="h6" className="text-center" >or continue with</Typography>
      <Box className={`flex justify-center items-center g-4`}>
        <IconButton>
          <FacebookRounded sx={{ color: (theme) => theme.palette.common.facebook }} className={`!text-[40px]`} />
        </IconButton>
        <IconButton>
          <FcGoogle className={`!text-[40px]`} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default LoginForm