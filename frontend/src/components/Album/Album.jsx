import { Box, Typography } from '@mui/material';
import Image from './Image';

const AlbumGhoul = ({ title, left, right, front, back }) => {
  return (
    <Box className={`grid justify-stretch items-center gap-3`}>
      <Typography variant='h6' className='font-[700] text-primary'>{title}</Typography>
      <Box className={`grid justify-stretch items-start gap-2 grid-cols-[1fr,1fr]`}>
        {front &&
          <Image img={front} />
        }
        {back &&
          <Image img={back} />
        }
        {right &&
          <Image img={right} />
        }
        {left &&
          <Image img={left} />
        }
      </Box>
    </Box>
  )
}

export default AlbumGhoul