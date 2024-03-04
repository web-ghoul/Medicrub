import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import { ModalsContext } from '../../context/ModalsContext'
import { PrimaryButton } from '../../mui/PrimaryButton'

const AssignDriverForm = ({ loading }) => {
  const { handleCloseAssignDriverModal } = useContext(ModalsContext)

  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-full`}>
      <Box className={`flex justify-center items-start`}>
        <Typography variant={"h3"} className='font-[700]'>Are you sure ?</Typography>
      </Box>
      <Box className={`grid grid-cols-2 justify-stretch items-center gap-4`}>
        <SubmitButton variant={"confirm"} loading={loading} dt={"assign-button"}>
          Assign
        </SubmitButton>
        <PrimaryButton fullWidth onClick={handleCloseAssignDriverModal}>
          Cancel
        </PrimaryButton>
      </Box>
    </Box>
  )
}

export default AssignDriverForm