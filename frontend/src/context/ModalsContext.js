import { createContext, useState } from "react";

export const ModalsContext = createContext()

const ModalsProvider = ({children}) => {
  //Forgot Password
  const [openForgotPasswordModal , setOpenForgotPasswordModal] = useState(false)
  
  const handleOpenForgotPasswordModal =()=>{
    setOpenForgotPasswordModal(true)
  }

  const handleCloseForgotPasswordModal =()=>{
    setOpenForgotPasswordModal(false)
  }

  
  //Nearest Drivers
  const [openNearestDriversModal , setOpenNearestDriversModal] = useState(false)

  const handleOpenNearestDriversModal =()=>{
    setOpenNearestDriversModal(true)
  }

  const handleCloseNearestDriversModal =()=>{
    setOpenNearestDriversModal(false)
  }


  //Verify Driver
  const [openVerifyDriverModal , setOpenVerifyDriverModal] = useState(false)

  const handleOpenVerifyDriverModal =()=>{
    setOpenVerifyDriverModal(true)
  }

  const handleCloseVerifyDriverModal =()=>{
    setOpenVerifyDriverModal(false)
  }


  //Assign Driver
  const [openAssignDriverModal , setOpenAssignDriverModal] = useState(false)

  const handleOpenAssignDriverModal =()=>{
    setOpenAssignDriverModal(true)
  }
  
  const handleCloseAssignDriverModal =()=>{
    setOpenAssignDriverModal(false)
  }


  //Create Multiple Trips
  const [openCreateMultipleTripsModal , setOpenCreateMultipleTripsModal] = useState(false)

  const handleOpenCreateMultipleTripsModal =()=>{
    setOpenCreateMultipleTripsModal(true)
  }
  
  const handleCloseCreateMultipleTripsModal =()=>{
    setOpenCreateMultipleTripsModal(false)
  }
  

  
  const values= {
    openForgotPasswordModal,
    handleOpenForgotPasswordModal,
    handleCloseForgotPasswordModal,
    openNearestDriversModal,
    handleOpenNearestDriversModal,
    handleCloseNearestDriversModal,
    openVerifyDriverModal,
    handleOpenVerifyDriverModal,
    handleCloseVerifyDriverModal,
    openAssignDriverModal,
    handleOpenAssignDriverModal,
    handleCloseAssignDriverModal,
    openCreateMultipleTripsModal,
    handleOpenCreateMultipleTripsModal,
    handleCloseCreateMultipleTripsModal
  }
  
  return (
    <ModalsContext.Provider value={values}>
      {children}
    </ModalsContext.Provider>
  )
}

export default ModalsProvider