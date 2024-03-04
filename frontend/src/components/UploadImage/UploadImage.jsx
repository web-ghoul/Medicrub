import { Box, Typography } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UploadImagesContext } from '../../context/UploadImagesContext'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const UploadImage = ({ title, name, value }) => {
  const [file, setFile] = useState("")
  const {
    setProfile,
    setNationalFront,
    setNationalBack, setRegistration, setInsurance, setFront, setBack, setLeft, setRight } = useContext(UploadImagesContext)

  const handleSetImage = useCallback(
    (image) => {
      if (name === "profile") {
        setProfile(image)
      } else if (name === "nationalFront") {
        setNationalFront(image)
      } else if (name === "nationalBack") {
        setNationalBack(image)
      } else if (name === "registration") {
        setRegistration(image)
      } else if (name === "insurance") {
        setInsurance(image)
      } else if (name === "front") {
        setFront(image)
      } else if (name === "back") {
        setBack(image)
      } else if (name === "left") {
        setRight(image)
      } else if (name === "right") {
        setLeft(image)
      }
    }
    , [name, setProfile,
      setNationalFront,
      setNationalBack, setRegistration, setInsurance, setFront, setBack, setLeft, setRight]
  )

  const handleUploadImage = (e) => {
    const image = e.target.files[0]
    handleSetImage(image)
    setFile(image)
  }

  useEffect(() => {
    if (value) {
      setFile(value)
      handleSetImage(value)
    }
  }, [value, handleSetImage])

  return (
    <Box className={`grid justify-center items-center gap-4 md:gap-3 sm:gap-2`}>
      {title && <Typography variant={'subtitle1'} className='text-[#666] text-center'>{title}</Typography>}
      <Box className={`flex justify-center items-center`}>
        <Box component={"label"} htmlFor={name} className={`relative bg-white flex justify-center items-center rounded-full w-[200px] h-[200px] cursor-pointer overflow-hidden lg:w-[175px] lg:h-[175px] md:!h-[150px] md:!w-[150px] transition-all hover:cursor-pointer border-2 border-white hover:border-primary bg-cover bg-no-repeat bg-center`} sx={{ backgroundImage: `url('${file ? file instanceof File ? URL.createObjectURL(file) : file : '/images/image_upload.png'}')` }}>
          <PrimaryTextField
            fullWidth
            type={"file"}
            inputProps={{ accept: "image/jpeg, image/png, image/jpg, image/gif, image/jfif, image/svg" }}
            id={name}
            name={name}
            onChange={handleUploadImage}
            sx={{ position: "absolute", opacity: "0", zIndex: "-1" }}
          />
        </Box>
      </Box>
    </Box >
  )
}

export default UploadImage