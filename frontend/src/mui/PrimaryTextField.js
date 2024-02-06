import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PrimaryTextField = styled(TextField)(({ theme }) => ({
  "& input":{
    padding:"15px",
    backgroundColor:theme.palette.common.white,
    boxShadow:theme.shadows.textField,
  },
  "& svg":{
    fontSize:"30px"
  },
  [theme.breakpoints.down("lg")]: {
    "& input":{
      padding:"14px"
    },
    "& svg":{
      fontSize:"28px"
    },
  },
  [theme.breakpoints.down("md")]: {
    "& input":{
      padding:"12px"
    },
    "& label":{
      lineHeight:"1rem"
    },
    "& svg":{
      fontSize:"26px"
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& input":{
      padding:"10px"
    },
    "& svg":{
      fontSize:"24px"
    },
  },
  [theme.breakpoints.down("xs")]: {
    "& svg":{
      fontSize:"22px"
    },
  }
}));