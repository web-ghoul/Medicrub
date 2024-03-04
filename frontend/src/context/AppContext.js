import { createContext, useState } from "react";

export const AppContext = createContext()

const AppProvider = ({children}) => {
  //Get Today Day
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  //Store Trip Id
  const [tripId,setTripId] = useState(null)

  //Store Trips
  const [trips,setTrips] = useState(null)

  //Store Driver Id
  const [driverId,setDriverId] = useState(null)

  //Sheet Trips
  const [sheetTrip,setSheetTrip] = useState(null)

  //Store Chosen Trips Date
  const [chosenDate,setChosenDate] = useState(todayDate)

  const values= {
    todayDate,
    tripId,
    setTripId,
    driverId,
    setDriverId,
    trips,
    setTrips,
    sheetTrip,
    setSheetTrip,
    chosenDate,
    setChosenDate
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider