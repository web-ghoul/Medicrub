import { createContext, useState } from "react";

export const AppContext = createContext()

const AppProvider = ({children}) => {
  //Drawer
  const [openDrawer, setOpenDrawer]= useState(false)
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };


  const values= {
    openDrawer,
    drawerWidth,
    handleDrawerOpen,
    handleDrawerClose,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider