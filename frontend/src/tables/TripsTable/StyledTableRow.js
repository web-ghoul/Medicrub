import { TableRow, styled } from '@mui/material';
export const StyledTableRow = styled(TableRow)(({ theme }) => {
  return ({
    display: "grid",
    gridTemplateColumns: "15% 15% 20% 20% 15% 15%",
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
  })
});