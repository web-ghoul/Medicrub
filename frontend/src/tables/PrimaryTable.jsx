import { Pagination, Paper, Stack, Table, TableContainer, TableFooter, TableRow } from '@mui/material';
import { useDispatch } from "react-redux";
import NoData from "../components/NoData/NoData";
import { getPendingDrivers } from '../store/pendingDriversSlice';

const PrimaryTable = ({ setPage, children, data, title, loading, total, name }) => {

  const dispatch = useDispatch()

  const handleChange = (event, value) => {
    setPage(value);
    if (name === "pending-drivers") {
      dispatch(getPendingDrivers({ page: value - 1 }))
    } else if (name === "drivers") {
      dispatch(getPendingDrivers({ page: value - 1 }))
    } else if (name === "trips") {
      dispatch(getPendingDrivers({ page: value - 1 }))
    } else if (name === "trips_sheet") {

    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} aria-label="custom pagination table">
        {children}
        <TableFooter>
          <TableRow>
            {((data && data.length > 0) ? (data.length > 0 && (<Stack className="p-4" component={"td"} spacing={2}>
              <Pagination count={Math.ceil(total / 10)} variant="outlined" shape="rounded" onChange={handleChange} />
            </Stack>)) : (!loading && <NoData title={title} />))}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default PrimaryTable