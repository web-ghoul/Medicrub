import { TableBody } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { DrawersContext } from "../../context/DrawersContext";
import { ModalsContext } from "../../context/ModalsContext";
import { SheetsContext } from "../../context/SheetsContext";
import { getDriver } from "../../store/driverSlice";
import PrimaryLoadingTable from "../PrimaryLoadingTable";
import PrimaryTable from "../PrimaryTable";
import LoadingRow from "./LoadingRow";
import NearestDriversTableHead from "./NearestDriversTableHead";
import NearestDriversTableRow from "./NearestDriversTableRow";

const NearestDriversTable = () => {
  const [page, setPage] = useState(0);
  const { nearestDrivers, isLoading } = useSelector((state) => state.nearestDrivers)
  const { tripId, setDriverId, sheetTrip } = useContext(AppContext)
  const { setTripsSheets, tripsSheets } = useContext(SheetsContext)
  const { handleCloseNearestDriversModal, handleOpenAssignDriverModal } = useContext(ModalsContext)
  const { handleOpenDriverDrawer } = useContext(DrawersContext)
  const { driver } = useSelector((state) => state.driver)
  const dispatch = useDispatch()

  const handleAssignDriver = (index) => {
    if (sheetTrip) {
      tripsSheets[0].trips[tripId].driver = nearestDrivers[index].driver
      setTripsSheets(tripsSheets)
    } else {
      setDriverId(nearestDrivers[index].driver._id)
      handleOpenAssignDriverModal()
    }
    handleCloseNearestDriversModal()
  }

  const handleViewDriver = (index) => {
    const driverId = nearestDrivers[index].driver._id
    if (!driver || driver._id !== driverId) {
      dispatch(getDriver({ id: driverId }))
    }
    handleOpenDriverDrawer()
  }

  return (
    <PrimaryTable page={page} setPage={setPage} loading={isLoading} data={nearestDrivers} title={"No nearestDrivers Yet..."} name={"nearestDrivers"}>
      <NearestDriversTableHead />
      {isLoading ? <PrimaryLoadingTable>
        <LoadingRow />
      </PrimaryLoadingTable> : (
        <TableBody>
          {
            nearestDrivers && nearestDrivers.map((row, i) => {
              return row.driver && (
                <NearestDriversTableRow key={i} row={row} handleAssignDriver={() => handleAssignDriver(i)} handleViewDriver={() => handleViewDriver(i)} />
              )
            })
          }
        </TableBody>
      )}
    </PrimaryTable>
  )
}

export default NearestDriversTable