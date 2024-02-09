import { Box, Typography } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"

const UnderDevelopment = () => {
  return (
    <Box className={"grid justify-stretch items-center gap-4"}>
      <Box className={"m-auto flex justify-center items-center"}>
        <LazyLoadImage src={"/images/under_development.gif"} alt={"under development"} />
      </Box>
      <Typography variant="h4" className="text-center" >Under Development...</Typography>
    </Box>
  )
}

export default UnderDevelopment