import { LoadingButton } from "@mui/lab";
import { styled } from '@mui/material/styles';

export const PrimaryButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor:theme.palette.primary.main,
  borderRadius:"8px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:"5px",
  padding:"8px 28px",
  border:"2px solid transparent",
  boxShadow:theme.shadows.button,
  "&:hover":{
    backgroundColor:theme.palette.primary.dark,
  },
  [theme.breakpoints.down("lg")]: {
    borderRadius:"7px",
    gap:"4px",
    padding:"9px 28px",
  },
  [theme.breakpoints.down("md")]: {
    borderRadius:"6px",
    gap:"3px",
    padding:"8px 26px",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius:"5px",
    padding:"7px 24px",
  },
  [theme.breakpoints.down("xs")]: {
    borderRadius:"4px",
    gap:"2px",
    padding:"6px 20px",
  },
}));