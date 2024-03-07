import { TableCell, styled, tableCellClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: 14
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
  [theme.breakpoints.down('md')]: {
    padding:"14px",
    [`&.${tableCellClasses.head}`]: {
      fontSize: 12
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding:"10px",
    [`&.${tableCellClasses.head}`]: {
      fontSize: 10
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10
    },
  }
}));