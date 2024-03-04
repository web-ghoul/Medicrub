import { FacebookRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const LoginProviders = () => {
  return (
    <Box className={`flex justify-center items-center g-4`}>
      <IconButton title={"provider button"}>
        <FacebookRounded sx={{ color: (theme) => theme.palette.common.facebook }} className={`!text-[40px]`} />
      </IconButton>
      <IconButton title={"provider button"}>
        <FcGoogle className={`!text-[40px]`} />
      </IconButton>
    </Box>
  )
}

export default LoginProviders