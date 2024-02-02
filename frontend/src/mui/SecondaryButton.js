import { styled } from '@mui/material/styles';
import { PrimaryButton } from './PrimaryButton';

export const SecondaryButton = styled(PrimaryButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor:theme.palette.common.white,
  borderColor:theme.palette.primary.main,
  "&:hover":{
    backgroundColor: theme.palette.primary.main,
    color:theme.palette.common.white,
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