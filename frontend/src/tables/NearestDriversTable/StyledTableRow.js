import { TableRow, styled } from '@mui/material';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "25% 30% 20% 25%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "none",
    display: "table-row"
  }
}));