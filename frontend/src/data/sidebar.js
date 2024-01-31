import { AssessmentRounded, CommuteRounded, DashboardRounded, PeopleAltRounded, PersonPinCircleRounded, RecentActorsRounded } from "@mui/icons-material";

export const DrawerMenu=[
  {
    text:"Dashboard",
    icon: <DashboardRounded />,
    url:`${process.env.REACT_APP_DASHBOARD_ROUTE}`
  },
  {
    text:"Drivers",
    icon:<PeopleAltRounded />,
    url:`${process.env.REACT_APP_DRIVERS_ROUTE}`
  },
  {
    text:"Allocate Driver",
    icon:<PersonPinCircleRounded />,
    url:`${process.env.REACT_APP_ALLOCATE_DRIVER_ROUTE}`
  },
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
  {
    text:"Reports",
    icon:<AssessmentRounded />,
    url:`${process.env.REACT_APP_REPORTS_ROUTE}`
  }
]