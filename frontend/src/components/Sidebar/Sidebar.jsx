import { ChevronLeft, Logout } from "@mui/icons-material";
import { Box, Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import { useContext } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { DrawerMenu } from "../../data/sidebar";
import { PrimaryButton } from "../../mui/PrimaryButton";
import { logout } from "../../store/authSlice";

const Sidebar = () => {
  const { openDrawer, drawerWidth, handleDrawerClose } = useContext(AppContext)

  const navigate = useNavigate()

  const dispatch = useDispatch()

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
    [theme.breakpoints.up('lg')]: {
      width: `calc(60px)`,
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(58px)`,
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(55px)`,
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
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
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

  const handleLogout = () => {
    dispatch(logout())
    navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)
  }

  return (
    <Drawer variant="permanent" open={openDrawer}>
      <DrawerHeader className="flex justify-between items-center p-1" sx={{ minHeight: { xs: '54px', sm: '57px', md: '59px', lg: '64px' } }}>
        <Box className={`flex justify-start items-center gap-1`}>
          <LazyLoadImage src={"./images/logo.png"} alt={"Logo"} />
          <Typography variant="h6" >Medicrub</Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className="grid justify-stretch items-stretch gap-2 !pt-4 !pb-4" sx={{ height: "100%" }}>
        {DrawerMenu.map((list, index) => (
          <Link key={index} href={list.url} color={"inherit"} underline="none">
            <ListItem sx={{ display: 'block' }}>
              <ListItemIcon>
                {list.icon}
              </ListItemIcon>
              <ListItemText primary={list.text} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Box className={`flex justify-start items-center px-4 py-4 lg:py-3 lg:px-3 md:py-2 md:px-2 sm:py-1 sm:px-1`}>
        {openDrawer ? (
          <PrimaryButton onClick={handleLogout}>
            <Logout />
            <Typography variant="button">Logout</Typography>
          </PrimaryButton>
        ) : (
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        )}
      </Box>
    </Drawer>
  )
}

export default Sidebar