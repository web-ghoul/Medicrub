import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'

const AvatarTableBox = ({ name, avatar, handleViewDriver, sm }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")

  return (
    <Box onClick={handleViewDriver} className={`flex items-center justify-start gap-2 md:!gap-1 hover:cursor-pointer`}>
      {!(sm ? smScreen : mdScreen) && <Avatar src={avatar} alt={"avatar"} />}
      <Typography variant='subtitle1' className='transition-all hover:underline'>{name}</Typography>
    </Box>
  )
}

export default AvatarTableBox