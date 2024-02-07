import { DeleteRounded, EditRounded, FiberManualRecordRounded } from "@mui/icons-material";
import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingDrivers } from "../../store/pendingDriversSlice";
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
  gridTemplateColumns: "20% 30% 15% 10% 10% 15%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "20% 25% 15% 20% 20%",
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "none",
    display: "table-row"
  }
}));

const PendingDriversTable = () => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { pendingDrivers, isLoading } = useSelector((state) => state.pendingDrivers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPendingDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryTable page={page} setPage={setPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} data={pendingDrivers} loading={isLoading} title={"No Drivers Yet..."}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <Typography variant='h6'>Name</Typography>
          </StyledTableCell>
          {!smScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Address</Typography>
          </StyledTableCell>}
          {!mdScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Phone</Typography>
          </StyledTableCell>}
          <StyledTableCell align="center">
            <Typography variant='h6'>Active</Typography>
          </StyledTableCell>
          {!smScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Status</Typography>
          </StyledTableCell>}
          <StyledTableCell align="right">
            <Typography variant='h6'>Actions</Typography>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {isLoading ? <PrimaryLoadingTable /> : pendingDrivers && (rowsPerPage > 0
          ? pendingDrivers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : pendingDrivers
        ).map((row) => {
          return row.user && (
            <StyledTableRow key={row._id}>
              {mdScreen ? <StyledTableCell>
                <Typography variant="subtitle2">${row.user.firstName}</Typography>
              </StyledTableCell> : <StyledTableCell>
                <Typography variant="subtitle2">{`${row.user.firstName} ${row.user.lastName}`}</Typography>
              </StyledTableCell>}
              {!smScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.location.address}</Typography>
              </StyledTableCell>}
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.user.phone}</Typography>
              </StyledTableCell>}
              <StyledTableCell align="center">
                <Box className={`flex flex-wrap justify-center items-center gap-1`}>
                  <FiberManualRecordRounded sx={{ fontSize: "18px", color: (theme) => theme.palette.common.whatsapp }} />
                  <Typography variant="subtitle2">Online</Typography>
                </Box>
              </StyledTableCell>
              {!smScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2" >Unavailable</Typography>
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

export default PendingDriversTable