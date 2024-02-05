import { styled } from '@mui/material/styles';
import { PrimaryButton } from './PrimaryButton';

export const DarkButton = styled(PrimaryButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor:theme.palette.secondary.main,
  "&:hover":{
    backgroundColor:theme.palette.secondary.dark,
  },
}));