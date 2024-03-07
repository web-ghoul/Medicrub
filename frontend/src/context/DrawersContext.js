import { createContext, useState } from "react";

export const DrawersContext = createContext()

const DrawersProvider = ({children}) => {
  //Drawer
  const [openDrawer, setOpenDrawer]= useState(false)
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };


  //Driver Drawer
  const [openDriverDrawer , setOpenDriverDrawer] = useState(false)
  
  const handleOpenDriverDrawer=()=>{
    setOpenDriverDrawer(true)
  }

  const handleCloseDriverDrawer=()=>{
    setOpenDriverDrawer(false)
  }


  //Edit Driver Drawer
  const [openEditDriverDrawer , setOpenEditDriverDrawer] = useState(false)

  const handleOpenEditDriverDrawer=()=>{
    setOpenEditDriverDrawer(true)
  }

  const handleCloseEditDriverDrawer=()=>{
    setOpenEditDriverDrawer(false)
  }


  //Trip Drawer
  const [openTripDrawer , setOpenTripDrawer] = useState(false)

  const handleOpenTripDrawer=()=>{
    setOpenTripDrawer(true)
  }

  const handleCloseTripDrawer=()=>{
    setOpenTripDrawer(false)
  }
  
  //Edit Trip Drawer
  const [openEditTripDrawer , setOpenEditTripDrawer] = useState(false)

  const handleOpenEditTripDrawer=()=>{
    setOpenEditTripDrawer(true)
  }

  const handleCloseEditTripDrawer=()=>{
    setOpenEditTripDrawer(false)
  }
  
  

  const values= {
    openDrawer,
    drawerWidth,
    handleDrawerOpen,
    handleDrawerClose,
    openDriverDrawer,
    handleOpenDriverDrawer,
    handleCloseDriverDrawer,
    openEditDriverDrawer,
    handleOpenEditDriverDrawer,
    handleCloseEditDriverDrawer,
    openTripDrawer,
    handleOpenTripDrawer,
    handleCloseTripDrawer,
    openEditTripDrawer,
    handleOpenEditTripDrawer,
    handleCloseEditTripDrawer
  }
  return (
    <DrawersContext.Provider value={values}>
      {children}
    </DrawersContext.Provider>
  )
}

export default DrawersProvider