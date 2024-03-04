import { useMediaQuery } from "@mui/material";
import PrimarySkeleton from "../PrimarySkeleton";
import { StyledTableCell } from '../StyledTableCell';
import { StyledTableRow } from './StyledTableRow';

const LoadingRow = () => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const xsScreen = useMediaQuery("(max-width:540px)")

  return (
    <StyledTableRow>
      <StyledTableCell>
        <PrimarySkeleton />
      </StyledTableCell>
      {!mdScreen && <StyledTableCell align="center">
        <PrimarySkeleton />
      </StyledTableCell>}
      {!xsScreen && <StyledTableCell align="center">
        <PrimarySkeleton />
      </StyledTableCell>}
      {!smScreen && <StyledTableCell align="center">
        <PrimarySkeleton />
      </StyledTableCell>}
      <StyledTableCell align="center">
        <PrimarySkeleton />
      </StyledTableCell>
      <StyledTableCell align="right">
        <PrimarySkeleton />
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default LoadingRow