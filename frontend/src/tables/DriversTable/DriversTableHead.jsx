import { TableHead, Typography, useMediaQuery } from '@mui/material';
import { StyledTableCell } from "../StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";

const DriversTableHead = () => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  return (
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
  )
}

export default DriversTableHead