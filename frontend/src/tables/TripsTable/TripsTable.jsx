import { TableBody } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { DrawersContext } from "../../context/DrawersContext";
import { ModalsContext } from "../../context/ModalsContext";
import { getNearestDrivers } from "../../store/nearestDriversSlice";
import PrimaryLoadingTable from "../PrimaryLoadingTable";
import PrimaryTable from "../PrimaryTable";
import LoadingRow from "./LoadingRow";
import TripsTableHead from "./TripsTableHead";
import TripsTableRow from "./TripsTableRow";

const TripsTable = ({ data, isLoading, sheet, name }) => {
  const dispatch = useDispatch()
  const [trips, setTrips] = useState()
  const [page, setPage] = useState(0);
  const { handleOpenNearestDriversModal } = useContext(ModalsContext)
  const { handleOpenTripDrawer, handleOpenEditTripDrawer } = useContext(DrawersContext)
  const { setTripId, setSheetTrip, setCurrentTrip, setSheetTripIndex } = useContext(AppContext)

  const handleDeleteTrip = (index) => {
    if (sheet) {
      index = index + page * 10
      setTrips(() => trips.filter((_, i) => i !== index))
    }
  }

  const handleViewTrip = (row) => {
    setCurrentTrip(row)
    handleOpenTripDrawer()
    setSheetTrip(sheet)
  }

  const handleAssignDriver = (index) => {
    if (sheet) {
      index = index + page * 10
      setTripId(index)
    } else {
      setTripId(trips[index]._id)
    }
    dispatch(getNearestDrivers({ lat: trips[index].pickup.latitude, lng: trips[index].pickup.longitude }))
    handleOpenNearestDriversModal()
    setSheetTrip(sheet)
  }

  const handleEditTrip = (row, index) => {
    setCurrentTrip(row)
    handleOpenEditTripDrawer()
    setSheetTrip(sheet)
    setSheetTripIndex(index)
  }

  useEffect(() => {
    if (data) {
      setTrips(data)
    }
  }, [data])

  return (
    <PrimaryTable page={page} setPage={setPage} data={trips} loading={isLoading} title={"No Trips Yet..."} total={trips && trips?.length} name={name || "trips"}>
      <TripsTableHead />
      {isLoading ? <PrimaryLoadingTable>
        <LoadingRow />
      </PrimaryLoadingTable> : (
        <TableBody>
          {
            (trips && trips.length > 0) && sheet ? trips.slice(10 * page, 10 + (10 * page)).map((row, i) =>
              <TripsTableRow key={i} row={row} handleDeleteTrip={() => handleDeleteTrip(i)} handleAssignDriver={() => handleAssignDriver(i)} handleEditTrip={() => handleEditTrip(row, i + page * 10)} handleViewTrip={() => handleViewTrip(row)} sheet={sheet} />
            ) : trips && trips.map((row, i) =>
              <TripsTableRow key={i} row={row} handleDeleteTrip={() => handleDeleteTrip(i)} handleAssignDriver={() => handleAssignDriver(i)} handleEditTrip={() => handleEditTrip(row, i)} handleViewTrip={() => handleViewTrip(row)} sheet={sheet} />
            )
          }
        </TableBody>
      )}
    </PrimaryTable>
  )
}

export default TripsTable