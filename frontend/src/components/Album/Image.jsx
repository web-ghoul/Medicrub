import { Box } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = ({ img }) => {
  return (
    <Box className={`w-[100%] h-[auto] rounded-md overflow-hidden`}>
      <LazyLoadImage src={img} alt={"item"} width={"100%"} height={"100%"} />
    </Box>
  )
}

export default Image