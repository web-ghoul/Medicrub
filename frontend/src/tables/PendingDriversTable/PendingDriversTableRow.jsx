import { EditRounded, NoCrashRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from '@mui/material';
import ActionIcon from "../../components/ActionIcon/ActionIcon";
import AvatarTableBox from "../AvatarTableBox";
import { StyledTableCell } from "../StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";

const PendingDriversTableRow = ({ row, handleViewDriver, handleEditDriver, handleVerifyDriver }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")

  return (
    <StyledTableRow>
      {mdScreen ? <StyledTableCell>
        <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName}`} handleViewDriver={handleViewDriver} />
      </StyledTableCell> : <StyledTableCell>
        <AvatarTableBox avatar={row.user.profileImage} name={`${row.user.firstName} ${row.user.lastName}`} handleViewDriver={handleViewDriver} />
      </StyledTableCell>}
      <StyledTableCell align="center">
        <Typography variant="subtitle2">{row.location.address}</Typography>
      </StyledTableCell>
      {!mdScreen && <StyledTableCell align="center">
        <Typography variant="subtitle2">{row.user.phone}</Typography>
      </StyledTableCell>}
      <StyledTableCell align="right">
        <Box className={`flex flex-wrap justify-end items-center gap-1 sm:!gap-0`}>
          {!smScreen && <ActionIcon title={"Verify"} clicked={handleVerifyDriver}>
            <NoCrashRounded className="text-green" />
          </ActionIcon>}
          {!mdScreen && <ActionIcon title={"View"} clicked={handleViewDriver}>
            <VisibilityRounded className="text-blue" />
          </ActionIcon>}
          <ActionIcon title={"Edit"} clicked={handleEditDriver}>
            <EditRounded className="text-secondary" />
          </ActionIcon>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default PendingDriversTableRow