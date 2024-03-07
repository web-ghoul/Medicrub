import { AssignmentTurnedInRounded } from "@mui/icons-material";
import { IconButton, Typography, useMediaQuery } from '@mui/material';
import AvatarTableBox from "../AvatarTableBox";
import { StyledTableCell } from "../StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";

const NearestDriversTableRow = ({ row, handleAssignDriver, handleViewDriver }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const xsScreen = useMediaQuery("(max-width:540px)")

  return (
    <StyledTableRow>
      {smScreen ? <StyledTableCell>
        <AvatarTableBox avatar={row.driver.user.profileImage} name={xsScreen ? `${row.driver.user.firstName}` : `${row.driver.user.firstName} ${row.driver.user.lastName}`} handleViewDriver={handleViewDriver} />
      </StyledTableCell> : <StyledTableCell>
        <AvatarTableBox sm={true} avatar={row.driver.user.profileImage} name={`${row.driver.user.firstName} ${row.driver.user.lastName}`} handleViewDriver={handleViewDriver} />
      </StyledTableCell>}
      {/* <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.driver.location?.address}</Typography>
              </StyledTableCell> */}
      <StyledTableCell align="center">
        <Typography variant="subtitle2" className="font-[700]">{row.distance.toFixed(2)} miles</Typography>
      </StyledTableCell>
      {!mdScreen && <StyledTableCell align="center">
        <Typography variant="subtitle2">{row.driver.user.phone}</Typography>
      </StyledTableCell>}
      <StyledTableCell align="right">
        <IconButton onClick={handleAssignDriver}>
          <AssignmentTurnedInRounded className="text-green" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default NearestDriversTableRow