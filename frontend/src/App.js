import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Theme from "./Theme";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AppProvider from "./context/AppContext";

function App() {
  const {pathname} = useLocation()

  return (
    <ThemeProvider theme={Theme("light")}>
      <AppProvider>
        <Box className="flex min-h-[100vh] min-w-[100vw]">
          {pathname !== "/login" && 
            (
              <>
                <Header/>
                <Sidebar/>
              </>
            )
          }
          <CssBaseline />
          <Box component={"main"} className="pt-[100px] lg:pt-[90px] md:pt-[80px] sm:pt-[60px] w-[100%] min-h-[100vh]">
            <Outlet/>
          </Box>
        </Box>
        <Toaster/>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
