import {
  createBrowserRouter
} from "react-router-dom";
import App from "./App";
import AddDriver from "./pages/AddDriver";
import AddTrip from "./pages/AddTrip";
import AllocateDriver from "./pages/AllocateDriver";
import Components from "./pages/Components";
import Dashboard from "./pages/Dashboard";
import Driver from "./pages/Driver";
import Drivers from "./pages/Drivers";
import Error from "./pages/Error";
import Login from "./pages/Login";
import PendingDrivers from "./pages/PendingDrivers";
import Reports from "./pages/Reports";
import TripSheets from "./pages/TripSheets";
import Trips from "./pages/Trips";

export const router = createBrowserRouter([
  {
    path:process.env.REACT_APP_HOME_ROUTE,
    element:<App/>,
    children:[
      {
        path:process.env.REACT_APP_DASHBOARD_ROUTE,
        element:<Dashboard/>
      },
      {
        path:process.env.REACT_APP_DRIVERS_ROUTE,
        children:[
          {
            index:true,
            element:<Drivers/>
          },{
          path:"add-driver",
          element:<AddDriver/>
        },{
          path:":id",
          element:<Driver/>
        }]
      },
      {
        path:process.env.REACT_APP_TRIPS_ROUTE,
        children:[
          {
            index:true,
            element:<Trips/>
          },{
            path:"add-trip",
            element:<AddTrip/>
          },{
            path:"sheets",
            element:<TripSheets/>
          }
        ]
      },
      {
        path:process.env.REACT_APP_ALLOCATE_DRIVER_ROUTE,
        element:<AllocateDriver/>
      },
      {
        path:process.env.REACT_APP_PENDING_DRIVERS_ROUTE,
        children:[
          {index:true,
          element:<PendingDrivers/>}
          ,{
            path:":id",
            element:<Driver/>
          }
        ]
      },
      {
        path:process.env.REACT_APP_REPORTS_ROUTE,
        element:<Reports/>
      },
      {
        path:process.env.REACT_APP_COMPONENTS_ROUTE,
        element:<Components/>
      },
      {
        path:process.env.REACT_APP_LOGIN_ROUTE,
        element:<Login/>
      },
      {
        path:"*",
        element:<Error/>
      }
    ]
  }
])