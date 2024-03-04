import { TableRow, styled } from '@mui/material';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "25% 35% 15% 25%",
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "30% 40% 30%",
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "30% 45% 25%",
  }
}));