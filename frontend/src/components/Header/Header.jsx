import { MenuRounded } from "@mui/icons-material";
import { IconButton, Toolbar, Typography, styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import { headerData } from "../../data/header";

const Header = () => {
  const { handleDrawerOpen, drawerWidth, openDrawer } = useContext(AppContext)
  const { pathname } = useLocation()

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: theme.shadows["0"],
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="fixed" open={openDrawer}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(openDrawer && { display: 'none' }),
          }}
        >
          <MenuRounded />
        </IconButton>
        <Typography variant="h6" noWrap component="h6" className="font-[600]">
          {headerData[pathname].title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header