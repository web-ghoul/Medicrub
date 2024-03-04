import { TableBody } from "@mui/material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { ModalsContext } from "../../context/ModalsContext";
import { SheetsContext } from "../../context/SheetsContext";
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
                <NearestDriversTableRow key={i} row={row} handleAssignDriver={() => handleAssignDriver(i)} />
              )
            })
          }
        </TableBody>
      )}
    </PrimaryTable>
  )
}

export default NearestDriversTable