import { Box, Typography } from '@mui/material';

const DataBox = ({ title, val, icon, clicked }) => {
  return (
    <Box className={'flex justify-start items-start gap-2'}>
      <Box className={'flex justify-start items-center gap-1'}>
        {icon}
        <Typography variant='h6' className='font-[600]  whitespace-nowrap'>{title}</Typography>
      </Box>
      <Typography onClick={clicked} className={`${clicked && "underline cursor-pointer"}`} variant='h6'>{val}</Typography>
    </Box>
  )
}

export default DataBox