import { Pagination, Paper, Stack, Table, TableContainer, TableFooter, TableRow } from '@mui/material';
import { useContext } from 'react';
import { useDispatch } from "react-redux";
import NoData from "../components/NoData/NoData";
import { AppContext } from '../context/AppContext';
import { getDrivers } from '../store/driversSlice';
import { getPendingDrivers } from '../store/pendingDriversSlice';
import { getTrips } from '../store/tripsSlice';

const PrimaryTable = ({ setPage, children, data, title, loading, total, name }) => {

  const dispatch = useDispatch()
  const { chosenDate, setChosenPage } = useContext(AppContext)

  const handleChange = (event, value) => {
    setPage(value);
    if (name === "pending-drivers") {
      dispatch(getPendingDrivers({ page: value - 1 }))
    } else if (name === "drivers") {
      dispatch(getDrivers({ page: value - 1 }))
    } else if (name === "trips") {
      setChosenPage(value - 1)
      dispatch(getTrips({ page: value - 1, date: chosenDate }))
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} aria-label="custom pagination table">
        {children}
        <TableFooter>
          <TableRow>
            {((data && data.length > 0) ? (data.length > 0 && (Math.ceil(total / 10) > 1 && <Stack className="p-4" component={"td"} spacing={2}>
              <Pagination count={Math.ceil(total / 10)} variant="outlined" shape="rounded" onChange={handleChange} />
            </Stack>)) : (!loading && <NoData title={title} />))}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default PrimaryTable