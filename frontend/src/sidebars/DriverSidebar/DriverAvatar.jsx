import { Avatar, Box, Typography } from '@mui/material';

const DriverAvatar = ({ img, name }) => {
  return (
    <Box className={`flex justify-start items-center gap-2`}>
      <Avatar alt={"avatar"} src={img} className='!w-[150px] !h-[150px] md:!h-[125px] md:!w-[125px]' />
      <Typography variant='h6' className='font-[700]'>{name}</Typography>
    </Box>
  )
}

export default DriverAvatar