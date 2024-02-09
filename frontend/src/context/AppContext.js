import { createContext, useState } from "react";

export const AppContext = createContext()

const AppProvider = ({children}) => {
  //Forgot Password
  const [openForgotPasswordModal , setOpenForgotPasswordModal] = useState(false)
  
  const handleOpenForgotPasswordModal =()=>{
    setOpenForgotPasswordModal(true)
  }

  const handleCloseForgotPasswordModal =()=>{
    setOpenForgotPasswordModal(false)
  }

  //Upload Sheet
  const [openUploadSheetModal , setOpenUploadSheetModal] = useState(false)
  
  const handleOpenUploadSheetModal =()=>{
    setOpenUploadSheetModal(true)
  }

  const handleCloseUploadSheetModal =()=>{
    setOpenUploadSheetModal(false)
  }


  //Drawer
  const [openDrawer, setOpenDrawer]= useState(false)
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };


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
    openUploadSheetModal,
    handleOpenUploadSheetModal,
    handleCloseUploadSheetModal,
    openDrawer,
    drawerWidth,
    handleDrawerOpen,
    handleDrawerClose,
    addDriverTab,
    setAddDriverTab,
    addTripTab,
    setAddTripTab,
    currentTripsPage ,
    setCurrentTripsPage,
    todayDate
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider