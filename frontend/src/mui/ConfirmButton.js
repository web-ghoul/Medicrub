import { styled } from '@mui/material/styles';
import { PrimaryButton } from './PrimaryButton';

export const ConfirmButton = styled(PrimaryButton)(({ theme }) => ({
  backgroundColor:theme.palette.success.main,
  "&:hover":{
    backgroundColor:theme.palette.success.dark,
  }
}));