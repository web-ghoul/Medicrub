import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ExcelRenderer } from "react-excel-renderer"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { handleAlert } from '../../functions/handleAlert'
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const UploadExcel = () => {
  const handleChange = (e) => {
    const file = e.target.files[0]
    ExcelRenderer(file, (err, res) => {
      if (err) {
        try {
          handleAlert({ msg: err.message, status: "error" })
        } catch (error) {
          handleAlert({ msg: error.message, status: "error" })
        }
      } else {
      }
    })
  }

  return (
    <Box className={`flex justify-stretch items-center`}>
      <Box component={"label"} htmlFor={"file"} className={`relative p-8 bg-gray grid justify-center items-center rounded-md h-[200px] w-full cursor-pointer overflow-hidden lg:!h-[175px] md:!h-[150px]`} sx={{ "& img": { margin: "auto" } }}>
        <LazyLoadImage width={75} src={"/images/xls.png"} alt={"upload file"} />
        <Typography variant='h6' >Upload Excel File</Typography>
        <PrimaryTextField
          fullWidth
          type={"file"}
          inputProps={{ accept: "image/xls, image/xlsx, image/xlsm, image/xlsb, image/csv" }}
          id={"file"}
          name={"file"}
          onChange={handleChange}
          sx={{ position: "absolute", opacity: "0", zIndex: "-1" }}
        />
      </Box>
    </Box>
  )
}

export default UploadExcel