import { MenuRounded, NotificationsRounded } from "@mui/icons-material";
import { Badge, Box, Breadcrumbs, IconButton, Toolbar, Typography, styled, useMediaQuery } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import { headerData } from "../../data/header";
import { PrimaryContainer } from "../../mui/PrimaryContainer";

const Header = () => {
  const { handleDrawerOpen, drawerWidth, openDrawer } = useContext(AppContext)
  const { pathname } = useLocation()
  const [headerUrl, setHeaderUrl] = useState([])
  const mdScreen = useMediaQuery("(max-width:992px)")

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
    ...(open && !mdScreen && {
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
        <Box className={`flex justify-stretch items-center w-[100%]`}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(openDrawer && !mdScreen && { display: 'none' }),
            }}
          >
            <MenuRounded />
          </IconButton>
          <PrimaryContainer className="!flex justify-between items-center">
            <Breadcrumbs aria-label="breadcrumb" className="flex gap-1">
              {
                headerUrl.map((link, i) => (
                  <Link
                    key={i}
                    to={link.url}
                    className="w-fit flex gap-2 !text-black sm:gap-1"
                    sx={{ display: 'flex', alignItems: 'center', "& svg": { fontSize: { sm: "18px", md: "20px", lg: "22px" } } }}
                  >
                    {link.icon}
                    <Typography variant="subtitle1">{link.title}</Typography>
                  </Link>
                )
                )
              }
            </Breadcrumbs>
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <NotificationsRounded />
              </Badge>
            </IconButton>
          </PrimaryContainer>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header