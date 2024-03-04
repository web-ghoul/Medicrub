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
  }
  return (
    <DrawersContext.Provider value={values}>
      {children}
    </DrawersContext.Provider>
  )
}

export default DrawersProvider