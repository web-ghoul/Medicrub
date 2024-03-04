import { TableRow, styled } from '@mui/material';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "20% 30% 15% 10% 10% 15%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "20% 25% 15% 20% 20%",
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "none",
    display: "table-row"
  }
}));