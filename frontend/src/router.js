import {
  createBrowserRouter
} from "react-router-dom";
import App from "./App";
import AllocateDriver from "./pages/AllocateDriver";
import Drivers from "./pages/Drivers";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PendingDrivers from "./pages/PendingDrivers";
import Reports from "./pages/Reports";
import Trips from "./pages/Trips";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"drivers",
        element:<Drivers/>
      },
      {
        path:"trips",
        element:<Trips/>
      },
      {
        path:"allocate-driver",
        element:<AllocateDriver/>
      },
      {
        path:"pending-drivers",
        element:<PendingDrivers/>
      },
      {
        path:"reports",
        element:<Reports/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"*",
        element:<Error/>
      }
    ]
  }
])