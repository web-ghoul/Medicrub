import { styled } from '@mui/material/styles';
import { PrimaryButton } from './PrimaryButton';

export const UploadSheetButton = styled(PrimaryButton)(({ theme }) => ({
  backgroundColor:theme.palette.common.excel,
  "&:hover":{
    backgroundColor:theme.palette.common.whatsapp,
  }
}));