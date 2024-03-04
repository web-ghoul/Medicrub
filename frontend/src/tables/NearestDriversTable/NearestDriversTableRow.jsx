import { AssignmentTurnedInRounded } from "@mui/icons-material";
import { IconButton, Typography, useMediaQuery } from '@mui/material';
import { StyledTableCell } from "../StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";

const NearestDriversTableRow = ({ row, handleAssignDriver }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Typography variant="subtitle2">{`${row.driver.user.firstName} ${row.driver.user.lastName}`}</Typography>
      </StyledTableCell>
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