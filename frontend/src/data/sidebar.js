import { AssessmentRounded, CommuteRounded, Home, PeopleAltRounded, RecentActorsRounded } from "@mui/icons-material";

export const DrawerMenu=[
  {
    text:"Dashboard",
    icon: <Home />,
    url:`${process.env.REACT_APP_DASHBOARD_ROUTE}`
  },
  {
    text:"Drivers",
    icon:<PeopleAltRounded />,
    url:`${process.env.REACT_APP_DRIVERS_ROUTE}`
  },
  // {
  //   text:"Allocate Driver",
  //   icon:<PersonPinCircleRounded />,
  //   url:`${process.env.REACT_APP_ALLOCATE_DRIVER_ROUTE}`
  // },
  {
    text:"Trips",
    icon: <CommuteRounded />,
    url:`${process.env.REACT_APP_TRIPS_ROUTE}`
  },
  {
    text:"Pending Drivers",
    icon:<RecentActorsRounded />,
    url:`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`
  },

  // {
  //   text:"Components",
  //   icon:<GridViewRounded />,
  //   url:`${process.env.REACT_APP_COMPONENTS_ROUTE}`
  // }
]