import { TableHead, Typography, useMediaQuery } from '@mui/material';
import { StyledTableCell } from '../StyledTableCell';
import { StyledTableRow } from './StyledTableRow';

const TripsTableHead = () => {

  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const xsScreen = useMediaQuery("(max-width:540px)")

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell>
          <Typography variant='h6'>Patient</Typography>
        </StyledTableCell>
        {!mdScreen && <StyledTableCell align="center">
          <Typography variant='h6'>Phone</Typography>
        </StyledTableCell>}
        {!xsScreen && <StyledTableCell align="center">
          <Typography variant='h6'>Address</Typography>
        </StyledTableCell>}
        {!smScreen && <StyledTableCell align="center">
          <Typography variant='h6'>Destination</Typography>
        </StyledTableCell>}
        <StyledTableCell align="center">
          <Typography variant='h6'>Driver</Typography>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Typography variant='h6'>Action</Typography>
        </StyledTableCell>
      </StyledTableRow>
    </TableHead>
  )
}

export default TripsTableHead