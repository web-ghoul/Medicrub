import { AutoModeRounded, CheckCircleRounded, CloudUploadRounded, HighlightOffRounded } from "@mui/icons-material"
import { LinearProgress, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { ExcelRenderer } from "react-excel-renderer"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { AppContext } from "../../context/AppContext"
import { handleAlert } from '../../functions/handleAlert'
import { handleGetLocation } from "../../functions/handleGetLocation"
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const UploadSheet = () => {
  const [dragging, setDragging] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [draggingFailed, setDraggingFailed] = useState(false)
  const { setTripsSheets } = useContext(AppContext)

  const handleChange = (e) => {
    setLoading(true)
    const file = e.target.files[0]
    if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx") || file.name.endsWith(".xlsb") || file.name.endsWith(".xlsm") || file.name.endsWith(".xls")) {
      ExcelRenderer(file, async (err, res) => {
        if (err) {
          try {
            setDraggingFailed(true)
            setInterval(() => {
              setDraggingFailed(false)
            }, 5000);
            handleAlert({ msg: err.message, status: "success" })
          } catch (error) {
            handleAlert({ msg: error.message, status: "error" })
          }
        } else {
          try {
            const data = res.rows
            const fileName = file.name

            //Handle Data to Storage
            const trips = []
            for (let i = 1; i < data.length; i++) {
              const pickupAddress = `${data[i][23]}, ${data[i][24]}, ${data[i][25]} ${data[i][26]}`
              const destinationAddress = `${data[i][5]}, ${data[i][6]}, ${data[i][9]} ${data[i][10]}`
              const pickup = await handleGetLocation(pickupAddress)
              const destination = await handleGetLocation(destinationAddress)
              trips.push({
                time: data[i][29],
                cost: data[i][30],
                number: data[i][32],
                date: data[i][1],
                specialNeeds: data[i][28],
                pickup,
                destination,
                patient: { firstName: data[i][18], lastName: data[i][19], phone: data[i][20] }
              })
            }

            //Add Data to Local Storage
            let tripSheets = []
            const local = localStorage.getItem(`${process.env.REACT_APP_TRIPS_SHEETS_STORAGE_NAME}`)
            if (local) {
              tripSheets = JSON.parse(local)
            }
            tripSheets.push({ fileName, trips })
            localStorage.setItem(`${process.env.REACT_APP_TRIPS_SHEETS_STORAGE_NAME}`, JSON.stringify(tripSheets))

            //Handle Data to Table
            setTripsSheets(tripSheets)
            setLoading(false)
            setSuccess(true)
            setInterval(() => {
              setSuccess(false)
            }, 5000);
          } catch (error) {
            handleAlert({ msg: error.message, status: "error" })
            setLoading(false)
            setDraggingFailed(true)
            setInterval(() => {
              setDraggingFailed(false)
            }, 5000);
          }
        }
      })
    } else {
      setDraggingFailed(true)
      setInterval(() => {
        setDraggingFailed(false)
      }, 5000);
      handleAlert({ msg: "Allow Excel Files Only", status: "error" })
      setLoading(false)
    }
    e.target.value = ""
  }

  const handleDragOver = (event) => {
    setDragging(true)
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default drop behavior
    const files = event.dataTransfer;
    setDragging(false)
    handleChange({ "target": files });
  };

  return (
    <>
      <Box className={`flex justify-stretch items-center`}>
        <Box component={"label"} htmlFor={"file"} className={`relative p-8 bg-gray grid justify-stretch items-center rounded-md h-[300px] w-full cursor-pointer overflow-hidden lg:!h-[250px] md:!h-[200px] transition-all border-2 text-center border-transparent ${dragging && "!border-green !bg-[#ddd]"}`}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop} sx={{ "& img": { margin: "auto" } }}>
          {
            dragging ? (
              <>
                <Box className={`flex justify-center items-center`}>
                  <CloudUploadRounded sx={{ color: (theme) => theme.palette.common.excel }} className="!text-[60px]" />
                </Box>
                <Typography variant='h6'>Uploading Excel...</Typography>
              </>
            ) : draggingFailed ? (
              <>
                <Box className={`flex justify-center items-center `}>
                  <HighlightOffRounded color="primary" className="!text-[60px]" />
                </Box>
                <Typography variant='h6'>Uploading Failed !!</Typography>
              </>
            ) : loading ? (
              <>
                <Box className={`flex justify-center items-center `}>
                  <AutoModeRounded className=" text-green !text-[60px]" />
                </Box>
                <Typography variant='h6'>Uploading...</Typography>
              </>
            ) : success ? (
              <>
                <Box className={`flex justify-center items-center `}>
                  <CheckCircleRounded className=" text-green !text-[60px]" />
                </Box>
                <Typography variant='h6'>Uploading Successfully!!</Typography>
              </>
            ) : (
              <>
                <LazyLoadImage width={75} src={"/images/xls.png"} alt={"upload file"} />
                <Typography variant='h6' >Browse or drag a excel file</Typography>
              </>
            )
          }
          <PrimaryTextField
            fullWidth
            type={"file"}
            inputProps={{ accept: ".xls, .xlsx, .xlsm, .xlsb, .csv" }}
            id={"file"}
            name={"file"}
            onChange={handleChange}
            sx={{ position: "absolute", opacity: "0", zIndex: "-1" }}
          />
          {
            loading && (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="success" />
              </Stack>
            )
          }
        </Box>
      </Box>
    </>
  )
}

export default UploadSheet