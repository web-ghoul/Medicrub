import { createContext, useState } from "react";

export const SheetsContext = createContext()

const SheetsProvider = ({children}) => {
  //Upload Sheet
  const [openUploadSheetModal , setOpenUploadSheetModal] = useState(false)
  
  const handleOpenUploadSheetModal =()=>{
    setOpenUploadSheetModal(true)
  }

  const handleCloseUploadSheetModal =()=>{
    setOpenUploadSheetModal(false)
  }

  //Trips Sheet From Local Storage
  const [tripsSheets , setTripsSheets] = useState([])

  const values= {
    openUploadSheetModal,
    handleOpenUploadSheetModal,
    handleCloseUploadSheetModal,
    tripsSheets ,
    setTripsSheets
  }

  return (
    <SheetsContext.Provider value={values}>
      {children}
    </SheetsContext.Provider>
  )
}

export default SheetsProvider