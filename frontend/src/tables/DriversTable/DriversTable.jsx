import { DeleteRounded, EditRounded, FiberManualRecordRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { getDriver } from "../../store/driverSlice";
import { getDrivers } from "../../store/driversSlice";
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

const DriversTable = () => {
  const { drivers, isLoading } = useSelector((state) => state.drivers)
  const dispatch = useDispatch()
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const { handleOpenDriverDrawer, handleOpenEditDriverDrawer } = useContext(AppContext)
  const [page, setPage] = useState(0);

  const handleViewDriver = (index) => {
    dispatch(getDriver({ id: drivers[index]._id }))
    handleOpenDriverDrawer()
  }

  const handleEditDriver = (index) => {
    dispatch(getDriver({ id: drivers[index]._id }))
    handleOpenEditDriverDrawer()
  }

  useEffect(() => {
    dispatch(getDrivers({ page: 0 }))
  }, [dispatch])

  return (
    <PrimaryTable page={page} setPage={setPage} loading={isLoading} data={drivers} title={"No Drivers Yet..."} name={"drivers"}>
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
      {isLoading ? <PrimaryLoadingTable /> : drivers && drivers.map((row, i) => {
        return row.user && (
          <TableBody key={i}>
            <StyledTableRow >
              {mdScreen ? <StyledTableCell>
                <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName}`} handleViewDriver={handleViewDriver} />
              </StyledTableCell> : <StyledTableCell>
                <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName} ${row.user.lastName}`} handleViewDriver={handleViewDriver} />
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

export default DriversTable