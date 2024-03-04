import { EditRounded, FiberManualRecordRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from '@mui/material';
import ActionIcon from "../../components/ActionIcon/ActionIcon";
import AvatarTableBox from "../AvatarTableBox";
import { StyledTableCell } from "../StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";


const DriversTableRow = ({ row, handleViewDriver, handleEditDriver }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  return (
    <StyledTableRow>
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
        {
          row.visible ?
            <Box className={`flex flex-wrap justify-center items-center gap-1`}>
              <FiberManualRecordRounded sx={{ fontSize: "18px", color: (theme) => theme.palette.common.whatsapp }} />
              <Typography variant="subtitle2">Online</Typography>
            </Box> :
            <Typography variant="subtitle2">Offline</Typography>
        }
      </StyledTableCell>
      {!smScreen && <StyledTableCell align="center">
        <Typography variant="subtitle2" >{row.onTrip ? "Unavailable" : "Available"}</Typography>
      </StyledTableCell>}
      <StyledTableCell align="right">
        <Box className={`flex flex-wrap justify-end items-center gap-1`}>
          {!mdScreen && <ActionIcon title={"View"} clicked={handleViewDriver}>
            <VisibilityRounded className="text-blue" />
          </ActionIcon>}
          {!mdScreen && <ActionIcon title={"Edit"} clicked={handleEditDriver}>
            <EditRounded className="text-secondary" />
          </ActionIcon>}
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default DriversTableRow