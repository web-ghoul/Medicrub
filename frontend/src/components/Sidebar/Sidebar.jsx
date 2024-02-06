import { ChevronLeft, Logout } from "@mui/icons-material";
import { Box, Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography, styled, useMediaQuery } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import { useContext } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { DrawerMenu } from "../../data/sidebar";
import { PrimaryButton } from "../../mui/PrimaryButton";
import { logout } from "../../store/authSlice";

const Sidebar = () => {
  const { openDrawer, drawerWidth, handleDrawerClose } = useContext(AppContext)
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const lgDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      "&>div": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white
      },
      "& svg": {
        color: theme.palette.common.white
      },
      boxShadow: theme.shadows["0"],
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  const mdDrawer = styled(MuiDrawer)(
    ({ theme, open }) => ({
      zIndex: open && "1300",
      "& > div": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        width: smScreen ? "100%" : "50vw",
        transition: "ease-in-out all .3s"
      },
      "& svg": {
        color: theme.palette.common.white
      },
    }),
  );

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.down('lg')]: {
      width: `60px`,
    },
    [theme.breakpoints.down('md')]: {
      width: `58px`,
    },
    [theme.breakpoints.down('sm')]: {
      width: `55px`,
    },
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    height: "64px",
    "& > div": {
      width: "100%",
      height: "100%"
    },
    "& > div img": {
      width: "auto",
      height: "100%"
    },
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('lg')]: {
      minHeight: '60px',
      height: "60px",
    },
    [theme.breakpoints.down('md')]: {
      minHeight: '58px',
      height: "58px",
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '54px',
      height: "54px",
    }
    ,
    [theme.breakpoints.down('xs')]: {
      minHeight: '55px',
      height: "55px",
    }
  }));

  const Drawer = mdScreen ? mdDrawer : lgDrawer

  const handleLogout = () => {
    dispatch(logout())
    navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)
  }

  return (
    <Drawer variant={mdScreen ? "persistent" : "permanent"} anchor={"left"} open={openDrawer}
      onClose={handleDrawerClose} >
      <DrawerHeader className="flex justify-between items-center p-1" >
        <Box className={`flex justify-start items-center gap-1`}>
          <LazyLoadImage src={"/images/logo.png"} alt={"Logo"} />
          <Typography variant="h6" >Medicrub</Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className="grid justify-stretch items-center gap-2 !pt-4 !pb-4" sx={{ height: "100%" }}>
        {DrawerMenu.map((list, index) => (
          <Link key={index} href={list.url} color={"inherit"} underline="none" sx={{ backgroundColor: (theme) => list.url === `/${pathname.split("/")[1]}` && theme.palette.primary.main }}>
            <ListItem sx={{ display: 'flex' }} className="transition-all duration-500 hover:bg-primary">
              <ListItemIcon>
                {list.icon}
              </ListItemIcon>
              <ListItemText primary={list.text} sx={{ display: openDrawer ? "block" : "none" }} />
            </ListItem>
          </Link>
        ))}
        <ListItem sx={{ display: 'flex' }}>
          {openDrawer ? (
            <PrimaryButton onClick={handleLogout}>
              <Logout />
              <Typography variant="button">Logout</Typography>
            </PrimaryButton>
          ) : (
            <ListItemIcon sx={{ cursor: "pointer" }} onClick={handleLogout}>
              <Logout />
            </ListItemIcon>
          )}
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar