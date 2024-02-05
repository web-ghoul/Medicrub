import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AppProvider from "./context/AppContext";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { setAuth } from "./store/authSlice";

function App() {
  const {pathname} = useLocation()
  const navigate =useNavigate()
  const dispatch= useDispatch()
  console.log(pathname)
  useEffect(()=>{
    try{
      const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
      if(!token){
        if(pathname !== `${process.env.REACT_APP_LOGIN_ROUTE}` || pathname !== `${process.env.REACT_APP_FORGOT_PASSWORD_ROUTE}`){
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
      <AppProvider>
        <Box className="flex min-h-[100vh] min-w-[100vw]">
          {pathname !== "/login" ? 
            (
                <>
                  <Header/>
                  <Sidebar/>
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
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
