import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import UploadImage from '../../components/UploadImage/UploadImage'

const CarAlbumForm = ({ loading }) => {
  return (
    <Box className={`grid justify-stretch items-stretch content-stretch self-stretch gap-10 h-[100%]`}>
      <Box className={`flex justify-start items-start`}>
        <Typography variant={"h3"} className='font-[600] text-primary'>Car Album</Typography>
      </Box>

      {useMemo(() =>
        <Box className={`grid justify-stretch items-center gap-6 grid-cols-[1fr,1fr] md:!grid-cols-[1fr]`} >
          <UploadImage title={"Car (Front)"} name={"front"} defaultImage={"/images/license.png"} />
          <UploadImage title={"Car (Back)"} name={"back"} defaultImage={"/images/license.png"} />
          <UploadImage title={"Car (Right)"} name={"right"} defaultImage={"/images/license.png"} />
          <UploadImage title={"Car (Left)"} name={"left"} defaultImage={"/images/license.png"} />
        </Box>, []
      )}

      <SubmitButton variant={"primary"} loading={loading}>
        Add
      </SubmitButton>
    </Box>
  )
}

export default CarAlbumForm