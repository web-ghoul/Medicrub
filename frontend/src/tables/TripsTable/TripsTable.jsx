import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../store/tripsSlice";
import PrimaryLoadingTable from "../PrimaryLoadingTable";
import PrimaryTable from "../PrimaryTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "15% 15% 20% 20% 15% 15%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
    wordBreak: "break-all"
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "none",
    display: "table-row"
  }
}));

const TripsTable = () => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch()
  const { trips, isLoading } = useSelector((state) => state.trips)

  useEffect(() => {
    dispatch(getTrips({ page: 0, date: new Date() }))
  }, [dispatch])
  return (
    <PrimaryTable page={page} setPage={setPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} data={trips} loading={isLoading} title={"No Trips Yet..."}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <Typography variant='h6'>Patient</Typography>
          </StyledTableCell>
          {!mdScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Phone</Typography>
          </StyledTableCell>}
          {!smScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Address</Typography>
          </StyledTableCell>}
          {!mdScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Destination</Typography>
          </StyledTableCell>}
          <StyledTableCell align="center">
            <Typography variant='h6'>Driver</Typography>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography variant='h6'>Action</Typography>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {isLoading ? <PrimaryLoadingTable /> : trips && (rowsPerPage > 0
          ? trips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : trips
        ).map((row, i) => {
          return (
            <StyledTableRow key={row._id}>
              {
                mdScreen ? <StyledTableCell>
                  <Typography variant="subtitle2">${row.patient.firstName}</Typography>
                </StyledTableCell> : <StyledTableCell>
                  <Typography variant="subtitle2">{`${row.patient.firstName} ${row.patient.lastName}`}</Typography>
                </StyledTableCell>
              }
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.patient.phone}</Typography>
              </StyledTableCell>}
              {!smScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.pickup}</Typography>
              </StyledTableCell>}
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.destination}</Typography>
              </StyledTableCell>}
              {!row.driver ? <StyledTableCell align="center">
                <Typography variant="subtitle2">webGhoul</Typography>
              </StyledTableCell> : <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.driver}</Typography>
              </StyledTableCell>}
              <StyledTableCell align="right">
                <Box className={`flex flex-wrap justify-end items-center gap-1`}>
                  <IconButton>
                    <EditRounded className="text-secondary" />
                  </IconButton>
                  {!smScreen && <IconButton>
                    <DeleteRounded className="text-primary" />
                  </IconButton>}
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          )
        })}
      </TableBody>
    </PrimaryTable>
  )
}

export default TripsTable