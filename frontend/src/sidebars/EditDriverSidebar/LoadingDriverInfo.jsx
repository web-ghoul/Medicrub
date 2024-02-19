import { Box, Divider, Skeleton, useMediaQuery } from '@mui/material';

const LoadingDriverInfo = () => {
  const smSize = useMediaQuery("(max-width:768px)")
  const text = (
    <Skeleton variant='text' className='w-[45%]' />
  )
  return (
    <>
      {smSize && <Skeleton variant='circular' />}
      <Box className={`flex justify-start items-center gap-2`}>
        <Skeleton variant='circular' className='!w-[150px] !h-[150px] md:!h-[125px] md:!w-[125px]' />
        {text}
      </Box>
      <Divider className='!border-2' />
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Skeleton variant='text' />

        <Box className={`grid justify-stretch items-center gap-2`}>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
        </Box>
      </Box>
      <Divider className='!border-2' />
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Skeleton variant='text' />

        <Box className={`grid justify-stretch items-center gap-2`}>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
          <Box className={'flex justify-start items-start gap-2'}>
            {text}
            {text}
          </Box>
        </Box>
      </Box>
      <Divider className='!border-2' />
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Skeleton variant='text' />
        <Box className={`grid justify-stretch items-start gap-2 grid-cols-[1fr,1fr]`}>
          <Skeleton variant='rounded' className={`w-[100%] !h-[150px] rounded-md overflow-hidden`} />
          <Skeleton variant='rounded' className={`w-[100%] !h-[150px] rounded-md overflow-hidden`} />
        </Box>
      </Box>
      <Divider className='!border-2' />
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Skeleton variant='text' />
        <Box className={`grid justify-stretch items-start gap-2 grid-cols-[1fr,1fr]`}>
          <Skeleton variant='rounded' className={`w-[100%] !h-[150px] rounded-md overflow-hidden`} />
          <Skeleton variant='rounded' className={`w-[100%] !h-[150px] rounded-md overflow-hidden`} />
        </Box>
      </Box>
      <Divider className='!border-2' />
      <Box className={`grid justify-stretch items-center gap-3`}>
        <Skeleton variant='text' />
        <Box className={`grid justify-stretch items-start gap-2 grid-cols-[1fr,1fr]`}>
          <Skeleton variant='rounded' className={`w-[100%] !h-[150px] rounded-md overflow-hidden`} />
          <Skeleton variant='rounded' className={`w-[100%] !h-[150px] rounded-md overflow-hidden`} />
        </Box>
      </Box>
    </>
  )
}

export default LoadingDriverInfo