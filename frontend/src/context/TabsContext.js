import { createContext, useState } from "react";

export const TabsContext = createContext()

const TabsProvider = ({children}) => {
  //Forgot Password
  const [openForgotPasswordModal , setOpenForgotPasswordModal] = useState(false)
  
  const handleOpenForgotPasswordModal =()=>{
    setOpenForgotPasswordModal(true)
  }

  const handleCloseForgotPasswordModal =()=>{
    setOpenForgotPasswordModal(false)
  }

  
  //Add Driver Tabs
  const [addDriverTab, setAddDriverTab] = useState(0)


  //Add Trip Tabs
  const [addTripTab, setAddTripTab] = useState(0)
  

  //Trips Page
  const [currentTripsPage , setCurrentTripsPage] = useState(0)


  //Get Today Day
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  const values= {
    openForgotPasswordModal,
    handleOpenForgotPasswordModal,
    handleCloseForgotPasswordModal,
    addDriverTab,
    setAddDriverTab,
    addTripTab,
    setAddTripTab,
    currentTripsPage ,
    setCurrentTripsPage,
    todayDate,
  }
  return (
    <TabsContext.Provider value={values}>
      {children}
    </TabsContext.Provider>
  )
}

export default TabsProvider