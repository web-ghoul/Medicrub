import { TableRow, styled } from '@mui/material';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "30% 25% 25% 20%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "none",
    display: "table-row"
  }
}));