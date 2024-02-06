import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const UploadImage = ({ formik, title, name, img, icon }) => {
  const [file, setFile] = useState("")
  useEffect(() => {
    if (file) {
      formik.values[name] = file
      setFile("")
    }
  }, [formik, file, name])
  return (
    <Box className={`grid justify-center items-center gap-4 md:gap-3 sm:gap-2`}>
      {title && <Typography variant={'subtitle1'} className='text-[#666] text-center'>{title}</Typography>}
      <Box className={`flex justify-center items-center`}>
        <Box component={"label"} htmlFor={name} className={`relative p-8 bg-white flex justify-center items-center rounded-full w-[200px] h-[200px] cursor-pointer overflow-hidden lg:w-[175px] lg:h-[175px] md:!h-[150px] md:!w-[150px]`}>
          {formik.values[name] ?
            <LazyLoadImage src={URL.createObjectURL(formik.values[name])} alt={name} />
            : <>
              {img && <LazyLoadImage src={img} alt={name} />}
              {icon && icon}
            </>}
          <PrimaryTextField
            fullWidth
            type={"file"}
            inputProps={{ accept: "image/jpeg, image/png, image/jpg, image/gif, image/jfif, image/svg" }}
            id={name}
            name={name}
            onChange={(e) => setFile(e.target.files[0])}
            sx={{ position: "absolute", opacity: "0", zIndex: "-1" }}
          />
          {/* <Box className={"rounded-full w-[20px] h-[20px] bg-primary flex justify-center items-center p-4 absolute bottom-0 text-white right-0"}>
            <AddRounded />
          </Box> */}
        </Box>
      </Box>
    </Box >
  )
}

export default UploadImage