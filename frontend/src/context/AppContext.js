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
  

  const values= {
    openForgotPasswordModal,
    handleOpenForgotPasswordModal,handleCloseForgotPasswordModal,
    openDrawer,
    drawerWidth,
    handleDrawerOpen,
    handleDrawerClose,
    addDriverTab,
    setAddDriverTab,
    addTripTab,
    setAddTripTab
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider