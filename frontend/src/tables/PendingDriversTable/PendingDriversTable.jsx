import { TableBody } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { DrawersContext } from "../../context/DrawersContext";
import { ModalsContext } from "../../context/ModalsContext";
import { getDriver } from "../../store/driverSlice";
import { getPendingDrivers } from "../../store/pendingDriversSlice";
import PrimaryLoadingTable from "../PrimaryLoadingTable";
import PrimaryTable from "../PrimaryTable";
import LoadingRow from "./LoadingRow";
import PendingDriversTableHead from "./PendingDriversTableHead";
import PendingDriversTableRow from "./PendingDriversTableRow";

const PendingDriversTable = () => {
  const [page, setPage] = useState(1);
  const { pendingDrivers, isLoading } = useSelector((state) => state.pendingDrivers)
  const { driver } = useSelector((state) => state.driver)
  const { handleOpenDriverDrawer, handleOpenEditDriverDrawer } = useContext(DrawersContext)
  const { handleOpenVerifyDriverModal } = useContext(ModalsContext)
  const { setDriverId } = useContext(AppContext)

  const dispatch = useDispatch()

  const handleViewDriver = (index) => {
    const driverId = pendingDrivers[index]._id
    if (!driver || driver._id !== driverId) {
      dispatch(getDriver({ id: driverId }))
    }
    handleOpenDriverDrawer()
  }

  const handleEditDriver = (index) => {
    const driverId = pendingDrivers[index]._id
    if (!driver || driver._id !== driverId) {
      dispatch(getDriver({ id: driverId }))
    }
    handleOpenEditDriverDrawer()
  }

  const handleVerifyDriver = (index) => {
    handleOpenVerifyDriverModal()
    setDriverId(pendingDrivers[index]._id)
  }

  useEffect(() => {
    dispatch(getPendingDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryTable page={page} setPage={setPage} data={pendingDrivers} loading={isLoading} title={"No Drivers Yet..."} name={"pending-drivers"} total={pendingDrivers && pendingDrivers.length}>
      <PendingDriversTableHead />
      {isLoading ? <PrimaryLoadingTable>
        <LoadingRow />
      </PrimaryLoadingTable> : (
        <TableBody>
          {
            pendingDrivers && pendingDrivers
              .map((row, i) => {
                return row.user && (
                  <PendingDriversTableRow row={row} key={i} handleEditDriver={() => handleEditDriver(i)} handleViewDriver={() => handleViewDriver(i)} handleVerifyDriver={() => handleVerifyDriver(i)} />
                )
              })
          }
        </TableBody>
      )}
    </PrimaryTable>
  )
}

export default PendingDriversTable