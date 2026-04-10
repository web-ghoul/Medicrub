import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { ModalsContext } from "../../context/ModalsContext";

const LoginForm = ({ formik, loading }) => {
  const { handleOpenForgotPasswordModal } = useContext(ModalsContext);

  return (
    <Box
      className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}
    >
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"} data-test={"login-title"}>
          Sign in
        </Typography>
      </Box>
      <Box className={`grid justify-stretch items-center gap-6`}>
        <PrimaryInput
          formik={formik}
          label={"Username"}
          name={"username"}
          ac={"username"}
        />
        <PrimaryInput
          formik={formik}
          name={"password"}
          type={"password"}
          label={"Password"}
          ac={"current-password"}
        />
      </Box>
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Box className={`flex justify-end items-center`}>
          <Button
            onClick={handleOpenForgotPasswordModal}
            className="w-fit !text-secondary"
            data-test={"forgot-password-button"}
          >
            Forgot Password ?
          </Button>
        </Box>
        <SubmitButton loading={loading} dt={"login-button"}>
          Login
        </SubmitButton>
      </Box>
    </Box>
  );
};

export default LoginForm;
