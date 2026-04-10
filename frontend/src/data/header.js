import { AddRounded, AssessmentRounded, CommuteRounded, GridViewRounded, Home, PeopleAltRounded, PersonPinCircleRounded, RecentActorsRounded, UploadFileRounded } from "@mui/icons-material"

const mainColor = {color:(theme)=>theme.palette.primary.main}

export const headerData ={
    "dashboard":[{title:"Dashboard" ,icon:<Home sx={mainColor} /> ,url:`${process.env.REACT_APP_DASHBOARD_ROUTE}`}],
    "drivers":[{title:"Drivers",icon:<PeopleAltRounded sx={mainColor}/>,url:`${process.env.REACT_APP_DRIVERS_ROUTE}`}],
    "add-driver":[{title:"Drivers",icon:<PeopleAltRounded sx={mainColor}/>,url:`${process.env.REACT_APP_DRIVERS_ROUTE}`},{title:"Add Driver",icon:<AddRounded sx={mainColor}/>,url:`${process.env.REACT_APP_ADD_DRIVER_ROUTE}`}],
    "allocate-driver":[{title:"Allocate Driver",icon:<PersonPinCircleRounded sx={mainColor}/>,url:`${process.env.REACT_APP_ALLOCATE_DRIVER_ROUTE}`}],
    "trips":[{title:"Trips",icon:<CommuteRounded sx={mainColor}/>,url:`${process.env.REACT_APP_TRIPS_ROUTE}`}],
    "add-trip":[{title:"Trips",icon:<CommuteRounded sx={mainColor}/>,url:`${process.env.REACT_APP_TRIPS_ROUTE}`},{title:"Add Trip",icon:<AddRounded sx={mainColor}/>,url:`${process.env.REACT_APP_ADD_TRIP_ROUTE}`}],
    "sheets":[{title:"Trips",icon:<CommuteRounded sx={mainColor}/>,url:`${process.env.REACT_APP_TRIPS_ROUTE}`},{title:"Sheets",icon:<UploadFileRounded sx={mainColor}/>,url:`${process.env.REACT_APP_TRIP_SHEET_ROUTE}`}],
    "pending-drivers":[{title:"Pending Drivers",icon:<RecentActorsRounded sx={mainColor}/>,url:`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}`}],

    "components":[{title:"Components",icon:<GridViewRounded sx={mainColor}/>,url:`${process.env.REACT_APP_COMPONENTS_ROUTE}`}],
}
