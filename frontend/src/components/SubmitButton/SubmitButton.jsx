import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import { ConfirmButton } from "../../mui/ConfirmButton";
import { DarkButton } from "../../mui/DarkButton";
import { PrimaryButton } from "../../mui/PrimaryButton";

const SubmitButton = ({ variant, loading, dt, children }) => {

  let loadingIcon = (<CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />)

  let chosenButton = (<DarkButton title={"Submit Form"} loadingPosition={"center"}
    loading={loading} loadingIndicator={loadingIcon} fullWidth type={"submit"} data-test={dt}>{children}</DarkButton>)

  if (variant === "confirm") {
    chosenButton = (<ConfirmButton title={"Submit Form"} loadingPosition={"center"}
      loading={loading} loadingIndicator={loadingIcon} fullWidth type={"submit"} data-test={dt}>{children}</ConfirmButton>)
  }

  if (variant === "primary") {
    chosenButton = (<PrimaryButton title={"Submit Form"} loadingPosition={"center"}
      loading={loading} loadingIndicator={loadingIcon} fullWidth type={"submit"} data-test={dt}>{children}</PrimaryButton>)
  }

  if (variant === "icon") {
    chosenButton = (<LoadingButton title={"Submit Form"} loadingPosition={"center"}
      loading={loading} loadingIndicator={loadingIcon} type={"submit"} data-test={dt}>{loading || children}</LoadingButton>)
  }

  return chosenButton
}

export default SubmitButton