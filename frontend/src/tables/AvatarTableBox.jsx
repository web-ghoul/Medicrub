import { Avatar, Typography, useMediaQuery } from '@mui/material'
import { Link } from "react-router-dom"

const AvatarTableBox = ({ name, avatar, url }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  return (
    <Link to={url} className={`flex items-center justify-start gap-2 md:!gap-1`}>
      {!mdScreen && <Avatar src={avatar} alt={"avatar"} />}
      <Typography variant='subtitle2'>{name}</Typography>
    </Link>
  )
}

export default AvatarTableBox