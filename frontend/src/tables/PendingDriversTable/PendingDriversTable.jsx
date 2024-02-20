import { DeleteRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { getDriver } from "../../store/driverSlice";
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
  const [page, setPage] = useState(1);
  const { handleOpenDriverDrawer, handleOpenEditDriverDrawer } = useContext(AppContext)
  const { pendingDrivers, isLoading } = useSelector((state) => state.pendingDrivers)
  const { driver } = useSelector((state) => state.driver)

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

  useEffect(() => {
    dispatch(getPendingDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryTable page={page} setPage={setPage} data={pendingDrivers} loading={isLoading} title={"No Drivers Yet..."} name={"pending-drivers"} total={pendingDrivers && pendingDrivers.length}>
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
      {isLoading ? <PrimaryLoadingTable /> : pendingDrivers && pendingDrivers
        .map((row, i) => {
          return row.user && (
            <TableBody key={i}>
              <StyledTableRow>
                {mdScreen ? <StyledTableCell>
                  <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName}`} handleViewDriver={() => handleViewDriver(i)} />
                </StyledTableCell> : <StyledTableCell>
                  <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName} ${row.user.lastName}`} handleViewDriver={() => handleViewDriver(i)} />
                </StyledTableCell>}
                <StyledTableCell align="center">
                  <Typography variant="subtitle2">{row.location.address}</Typography>
                </StyledTableCell>
                {!mdScreen && <StyledTableCell align="center">
                  <Typography variant="subtitle2">{row.user.phone}</Typography>
                </StyledTableCell>}
                <StyledTableCell align="right">
                  <Box className={`flex flex-wrap justify-end items-center gap-1 sm:!gap-0`}>
                    {!mdScreen && <IconButton onClick={() => handleViewDriver(i)}>
                      <VisibilityRounded className="text-green" />
                    </IconButton>}
                    <IconButton onClick={() => handleEditDriver(i)}>
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