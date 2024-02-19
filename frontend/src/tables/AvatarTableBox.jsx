import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'

const AvatarTableBox = ({ name, avatar, handleViewDriver }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")

  return (
    <Box onClick={handleViewDriver} className={`flex items-center justify-start gap-2 md:!gap-1 hover:cursor-pointer`}>
      {!mdScreen && <Avatar src={avatar} alt={"avatar"} />}
      <Typography variant='subtitle1' className='transition-all hover:underline'>{name}</Typography>
    </Box>
  )
}

export default AvatarTableBox