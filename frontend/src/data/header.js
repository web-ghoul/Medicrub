import { AddRounded, AssessmentRounded, CommuteRounded, GridViewRounded, Home, PeopleAltRounded, PersonPinCircleRounded, RecentActorsRounded } from "@mui/icons-material"

const mainColor = {color:(theme)=>theme.palette.primary.main}

export const headerData = {
  "dashboard":[{title:"Dashboard" ,icon:<Home sx={mainColor} /> ,url:"/dashboard"}],
  "drivers":[{title:"Drivers",icon:<PeopleAltRounded sx={mainColor}/>,url:"/drivers"}],
  "add-driver":[{title:"Drivers",icon:<PeopleAltRounded sx={mainColor}/>,url:"/drivers"},{title:"Add Driver",icon:<AddRounded sx={mainColor}/>,url:"/drivers/add-driver"}],
  "allocate-driver":[{title:"Allocate Driver",icon:<PersonPinCircleRounded sx={mainColor}/>,url:"/allocate-driver"}],
  "trips":[{title:"Trips",icon:<CommuteRounded sx={mainColor}/>,url:"/trips"}],
  "pending-drivers":[{title:"Pending Drivers",icon:<RecentActorsRounded sx={mainColor}/>,url:"/pending-drivers"}],
  "reports":[{title:"Reports",icon:<AssessmentRounded sx={mainColor}/>,url:"/reports"}],
  "components":[{title:"Components",icon:<GridViewRounded sx={mainColor}/>,url:"/components"}],
}