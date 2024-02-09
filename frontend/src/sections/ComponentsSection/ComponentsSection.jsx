import { SearchRounded } from "@mui/icons-material"
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import { handleAlert } from '../../functions/handleAlert'
import { ConfirmButton } from '../../mui/ConfirmButton'
import { DarkButton } from "../../mui/DarkButton"
import { PrimaryBox } from "../../mui/PrimaryBox"
import { PrimaryButton } from '../../mui/PrimaryButton'
import { PrimaryContainer } from '../../mui/PrimaryContainer'
import { PrimaryTextField } from '../../mui/PrimaryTextField'
import { SecondaryButton } from "../../mui/SecondaryButton"
import { UploadSheetButton } from "../../mui/UploadSheetButton"

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.8;
      if (success) {
        const data = { message: 'Data successfully fetched!' };
        resolve(data)
      } else {
      }
    }, 2000);
  });
}

const ComponentsSection = () => {
  return (
    <PrimaryBox>
      <PrimaryContainer className='!flex flex-col flex-wrap justify-start items-start gap-8'>
        <Box className={`grid justify-start items-start gap-3`}>
          <Typography variant='h6'>Buttons</Typography>
          <Box className={`flex flex-wrap gap-4`}>
            <PrimaryButton>Primary</PrimaryButton>
            <ConfirmButton>Confirm</ConfirmButton>
            <SecondaryButton>Cancel</SecondaryButton>
            <DarkButton>Dark</DarkButton>
            <UploadSheetButton>Upload Sheet</UploadSheetButton>
          </Box>
        </Box>
        <Box className={`grid justify-start items-start gap-3`}>
          <Typography variant='h6'>Text Fields</Typography>
          <Box className={`flex flex-wrap items-end gap-4`}>
            <PrimaryTextField
              type={"text"}
              placeholder={"Outlined"}
              label={"Outlined"}
              variant={"outlined"}
            />
            <PrimaryTextField
              type={"text"}
              placeholder={"Filled"}
              label={"Filled"}
              variant={"filled"}
            />
            <PrimaryTextField
              type={"text"}
              placeholder={"Standard"}
              label={"Standard"}
              variant={"standard"}
            />
            <PrimaryTextField
              type={"search"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
              placeholder={"Search..."}
              variant={"outlined"}
            />
            <PrimaryTextField
              type={"search"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
              placeholder={"Search..."}
              variant={"filled"}
            />
            <PrimaryTextField
              type={"search"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
              placeholder={"Search..."}
              variant={"standard"}
            />
          </Box>
        </Box>
        <Box className={`grid justify-start items-start gap-3`}>
          <Typography variant='h6'>Alerts</Typography>
          <Box className={`flex flex-wrap gap-4`}>
            <Button onClick={() => handleAlert({ msg: "Success Message", status: "success" })}>Try Success Alert</Button>
            <Button onClick={() => handleAlert({ msg: "Error Message", status: "error" })}>Try Error Alert</Button>
            <Button onClick={() => handleAlert({ msg: "Error Message", status: "promise", promise: fetchData(), loadMsg: "Saving..", successMsg: "Saved Successfully", errorMsg: "error occurs" })}>Try Promise Alert</Button>
          </Box>
        </Box>
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default ComponentsSection