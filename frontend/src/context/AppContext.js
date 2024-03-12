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

  //Store Chosen Page
  const [chosenPage,setChosenPage] = useState(0)

  //Store Currenct Trip
  const [currentTrip , setCurrentTrip] = useState(null)

  //Store Sheet Trip Index
  const [sheetTripIndex , setSheetTripIndex] = useState(null)

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
    setChosenDate,
    currentTrip ,
    setCurrentTrip,
    sheetTripIndex,
    setSheetTripIndex,
    chosenPage,setChosenPage
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider