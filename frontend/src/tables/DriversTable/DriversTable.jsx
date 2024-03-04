import { TableBody } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DrawersContext } from "../../context/DrawersContext";
import { getDriver } from "../../store/driverSlice";
import { getDrivers } from "../../store/driversSlice";
import PrimaryLoadingTable from "../PrimaryLoadingTable";
import PrimaryTable from "../PrimaryTable";
import DriversTableHead from './DriversTableHead';
import DriversTableRow from './DriversTableRow';
import LoadingRow from './LoadingRow';

const DriversTable = () => {
  const { drivers, isLoading } = useSelector((state) => state.drivers)
  const dispatch = useDispatch()
  const { handleOpenDriverDrawer, handleOpenEditDriverDrawer } = useContext(DrawersContext)
  const [page, setPage] = useState(0);
  const { driver } = useSelector((state) => state.driver)

  const handleViewDriver = (index) => {
    const driverId = drivers[index]._id
    if (!driver || driver._id !== driverId) {
      dispatch(getDriver({ id: driverId }))
    }
    handleOpenDriverDrawer()
  }

  const handleEditDriver = (index) => {
    const driverId = drivers[index]._id
    if (!driver || driver._id !== driverId) {
      dispatch(getDriver({ id: driverId }))
    }
    handleOpenEditDriverDrawer()
  }

  useEffect(() => {
    dispatch(getDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryTable page={page} setPage={setPage} loading={isLoading} data={drivers} title={"No Drivers Yet..."} name={"drivers"}>
      <DriversTableHead />
      {isLoading ? <PrimaryLoadingTable>
        <LoadingRow />
      </PrimaryLoadingTable> : (
        <TableBody>
          {
            drivers && drivers.map((row, i) => {
              return row.user && (
                <DriversTableRow key={i} row={row} handleEditDriver={() => handleEditDriver(i)} handleViewDriver={() => handleViewDriver(i)} />
              )
            })
          }
        </TableBody>
      )
      }
    </PrimaryTable>
  )
}

export default DriversTable