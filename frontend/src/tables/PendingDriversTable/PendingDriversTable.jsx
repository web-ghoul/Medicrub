import { DeleteRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingDrivers } from "../../store/pendingDriversSlice";
import AvatarTableBox from "../AvatarTableBox";
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
  gridTemplateColumns: "25% 35% 15% 25%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "30% 40% 30%",
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "30% 45% 25%",
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
          <StyledTableCell align="center">
            <Typography variant='h6'>Address</Typography>
          </StyledTableCell>
          {!mdScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Phone</Typography>
          </StyledTableCell>}
          <StyledTableCell align="right">
            <Typography variant='h6'>Actions</Typography>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      {isLoading ? <PrimaryLoadingTable /> : pendingDrivers && (rowsPerPage > 0
        ? pendingDrivers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : pendingDrivers
      ).map((row, i) => {
        return row.user && (
          <TableBody key={i}>
            <StyledTableRow>
              {mdScreen ? <StyledTableCell>
                <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName}`} url={`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}/${row._id}`} />
              </StyledTableCell> : <StyledTableCell>
                <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName} ${row.user.lastName}`} url={`${process.env.REACT_APP_PENDING_DRIVERS_ROUTE}/${row._id}`} />
              </StyledTableCell>}
              <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.location.address}</Typography>
              </StyledTableCell>
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.user.phone}</Typography>
              </StyledTableCell>}
              <StyledTableCell align="right">
                <Box className={`flex flex-wrap justify-end items-center gap-1 sm:!gap-0`}>
                  <IconButton>
                    <VisibilityRounded className="text-green" />
                  </IconButton>
                  <IconButton>
                    <EditRounded className="text-secondary" />
                  </IconButton>
                  {!smScreen && <IconButton>
                    <DeleteRounded className="text-primary" />
                  </IconButton>}
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        )
      })}
    </PrimaryTable>
  )
}

export default PendingDriversTable