import {
  createBrowserRouter
} from "react-router-dom";
import App from "./App";
import AddDriver from "./pages/AddDriver";
import AllocateDriver from "./pages/AllocateDriver";
import Components from "./pages/Components";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Error from "./pages/Error";
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
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"drivers",
        children:[
          {
            index:true,
            element:<Drivers/>
          },{
          path:"add-driver",
          element:<AddDriver/>
        }]
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
        path:"components",
        element:<Components/>
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