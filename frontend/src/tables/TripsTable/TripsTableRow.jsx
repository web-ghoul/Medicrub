import { AssignmentTurnedInRounded, DeleteRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionIcon from "../../components/ActionIcon/ActionIcon";
import { DrawersContext } from "../../context/DrawersContext";
import { getDriver } from "../../store/driverSlice";
import { StyledTableCell } from "../StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";

const TripsTableRow = ({ row, handleDeleteTrip, handleAssignDriver, handleEditTrip, handleViewTrip, sheet }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const xsScreen = useMediaQuery("(max-width:540px)")
  const { handleOpenDriverDrawer } = useContext(DrawersContext)
  const dispatch = useDispatch()
  const { driver } = useSelector((state) => state.driver)

  const handleViewDriver = () => {
    if (!driver || driver._id !== row.driver._id) {
      dispatch(getDriver({ id: row.driver._id }))
    }
    handleOpenDriverDrawer()
  }

  return (
    <StyledTableRow>
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
      {!mdScreen && <StyledTableCell align="center">
        <Typography variant="subtitle2">{row.time}</Typography>
      </StyledTableCell>}
      {!xsScreen && <StyledTableCell align="center">
        <Typography variant="subtitle2">{row.pickup.address}</Typography>
      </StyledTableCell>}
      {!smScreen && <StyledTableCell align="center">
        <Typography variant="subtitle2">{row.destination.address}</Typography>
      </StyledTableCell>}
      {!row.driver ? <StyledTableCell align="center">
        <Typography variant="subtitle1">-</Typography>
      </StyledTableCell> : mdScreen ? <StyledTableCell align="center" onClick={handleViewDriver}>
        <Typography variant="subtitle2" className="font-[600] underline cursor-pointer">{`${row.driver.user.firstName}`}</Typography>
      </StyledTableCell> : <StyledTableCell align="center" onClick={handleViewDriver}>
        <Typography variant="subtitle2" className="font-[600] underline cursor-pointer">{`${row.driver.user.firstName} ${row.driver.user.lastName}`}</Typography>
      </StyledTableCell>}
      <StyledTableCell align="right">
        <Box className={`flex justify-end items-center gap-1`}>
          {
            sheet ?
              <ActionIcon title={"Delete"} clicked={handleDeleteTrip}>
                <DeleteRounded className="text-primary" />
              </ActionIcon>
              :
              <ActionIcon title={"View"} clicked={handleViewTrip}>
                <VisibilityRounded className="text-blue" />
              </ActionIcon>
          }
          <ActionIcon title={"Assign"} clicked={handleAssignDriver}>
            <AssignmentTurnedInRounded className="text-green" />
          </ActionIcon>
          {!mdScreen && <ActionIcon title={"Edit"} clicked={handleEditTrip}>
            <EditRounded className="text-secondary" />
          </ActionIcon>}
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default TripsTableRow