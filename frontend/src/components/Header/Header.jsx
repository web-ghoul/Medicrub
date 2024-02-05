import { MenuRounded } from "@mui/icons-material";
import { Box, Breadcrumbs, IconButton, Link, Toolbar, Typography, styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import { headerData } from "../../data/header";
import { PrimaryContainer } from "../../mui/PrimaryContainer";

const Header = () => {
  const { handleDrawerOpen, drawerWidth, openDrawer } = useContext(AppContext)
  const { pathname } = useLocation()
  const [headerUrl, setHeaderUrl] = useState([])

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

  useEffect(() => {
    const path = pathname.split("/")
    const url = path[path.length - 1]
    if (headerData.hasOwnProperty(url)) {
      setHeaderUrl(headerData[url])
    }
  }, [pathname])

  return (
    <AppBar position="fixed" open={openDrawer}>
      <Toolbar sx={{ minHeight: { xs: '55px', sm: '58px', md: '60px', lg: '65px' } }}>
        <Box className={`flex justify-start items-center h-[100%]`}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(openDrawer && { display: 'none' }),
            }}
          >
            <MenuRounded />
          </IconButton>
          <PrimaryContainer>
            <Breadcrumbs aria-label="breadcrumb">
              {
                headerUrl.map((link, i) => (
                  <Link
                    key={i}
                    underline="hover"
                    href={link.url}
                    className="flex gap-2 !text-black"
                    sx={{ display: 'flex', alignItems: 'center', "& svg": { fontSize: { sm: "18px", md: "20px", lg: "22px" } } }}
                  >
                    {link.icon}
                    <Typography variant="subtitle1">{link.title}</Typography>
                  </Link>
                ))
              }
            </Breadcrumbs>
          </PrimaryContainer>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header