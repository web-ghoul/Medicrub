import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import io from 'socket.io-client';
import Theme from "./Theme";
import Header from "./components/Header/Header";
import Outlay from "./components/Outlay/Outlay";
import { AppContext } from "./context/AppContext";
import AssignDriverModal from "./modals/AssignDriverModal";
import CreateMultipleTripsModal from "./modals/CreateMultipleTripsModal";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import NearestDriversModal from "./modals/NearestDriversModal";
import UploadSheetModal from "./modals/UploadSheetModal";
import VerifyDriverModal from "./modals/VerifyDriverModal";
import DriverSidebar from "./sidebars/DriverSidebar/DriverSidebar";
import EditDriverSidebar from "./sidebars/EditDriverSidebar/EditDriverSidebar";
import EditTripSidebar from "./sidebars/EditTripSidebar/EditTripSidebar";
import Sidebar from "./sidebars/Sidebar/Sidebar";
import TripSidebar from "./sidebars/TripSidebar/TripSidebar";
import { setAuth } from "./store/authSlice";
import { updateDriver } from "./store/driversSlice";

const SOCKET_SERVER_URL = 'http://localhost:3000/admin'; 
    
function App() {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const {openDrawer,handleDrawerClose} = useContext(AppContext)
  const mdScreen = useMediaQuery("(max-width:992px)")

  const urls =["/","/components","/allocate-driver","/trips","/trips/add-trip","/pending-drivers",`/pending-drivers/${params.id}`,"/dashboard","/drivers",`/drivers/${params.id}`,"/drivers/add-driver","/reports","/trips/sheets"]
  
  useEffect(()=>{
    try{
      const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
      if(!token){
        if(pathname !== `${process.env.REACT_APP_LOGIN_ROUTE}`){
          navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)
        }
      } else{
        dispatch(setAuth({token}))
      }
    }catch(err){
      navigate(`${process.env.REACT_APP_LOGIN_ROUTE}`)
    }
  },[pathname ,dispatch, navigate])

  // Handle Socket Event
  useEffect(() => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)

    const headers = {
      authorization: `Bearer ${token}`,
    };

    const socket = io(SOCKET_SERVER_URL,{
      extraHeaders:headers
    });

    socket.on('admin-connected', (message) => {
      console.log('Admin connected:', message);
    });

    socket.on("drivers-positions",(data)=>{
      dispatch(updateDriver(data))
    })
  
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={Theme("light")}>
        <Box className="flex min-h-[100vh] min-w-[100vw] relative">
          {urls.includes(pathname) ? 
            (
                <>
                  <Header/>
                  <Sidebar/>
                  <DriverSidebar/>
                  <EditDriverSidebar/>
                  <TripSidebar/>
                  <EditTripSidebar/>
                  {mdScreen && <Outlay clicked={handleDrawerClose} toggle={openDrawer}/>}
                  <Box component={"main"} className="pt-[65px] lg:pt-[60px] md:pt-[58px] sm:pt-[55px] w-[100%] min-h-[100vh]">
                    <Outlet/>
                  </Box>
                </>
            ):(
              <Box component={"main"} className="w-[100%] min-h-[100vh]">
                <Outlet/>
              </Box>
            )
          }
          <CssBaseline />
          <ForgotPasswordModal/>
          <UploadSheetModal/>
          <NearestDriversModal/>
          <VerifyDriverModal/>
          <AssignDriverModal/>
          <CreateMultipleTripsModal/>
        </Box>
        <Toaster/>
    </ThemeProvider>
  );
}

export default App;