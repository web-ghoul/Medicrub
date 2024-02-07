import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import Header from "./components/Header/Header";
import Outlay from "./components/Outlay/Outlay";
import Sidebar from "./components/Sidebar/Sidebar";
import { AppContext } from "./context/AppContext";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { setAuth } from "./store/authSlice";

const urls =["/","/components","/allocate-driver","/trips","/trips/add-trip","/pending-drivers","/dashboard","/drivers","/drivers/add-driver","/reports"]

function App() {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {openDrawer,handleDrawerClose} = useContext(AppContext)
  
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

  return (
    <ThemeProvider theme={Theme("light")}>
        <Box className="flex min-h-[100vh] min-w-[100vw] relative">
          {urls.includes(pathname) ? 
            (
                <>
                  <Header/>
                  <Sidebar/>
                  <Outlay clicked={handleDrawerClose} toggle={openDrawer}/>
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
        </Box>
        <Toaster/>
    </ThemeProvider>
  );
}

export default App;
