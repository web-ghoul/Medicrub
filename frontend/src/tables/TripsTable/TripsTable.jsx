import { DeleteRounded, EditRounded, FiberManualRecordRounded, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses, useMediaQuery, useTheme } from '@mui/material';
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

const TripsTable = ({ data }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <Typography variant='h6'>Name</Typography>
            </StyledTableCell>
            {!smScreen && <StyledTableCell align="center">
              <Typography variant='h6'>Address</Typography>
            </StyledTableCell>}
            {!mdScreen && <StyledTableCell align="center">
              <Typography variant='h6'>Phone Number</Typography>
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
        <TableBody>
          {data && (rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => {
            return row.user && (
              <StyledTableRow key={row._id}>
                <StyledTableCell>
                  <Typography variant="subtitle2">{`${row.user.firstName} ${row.user.lastName}`}</Typography>
                </StyledTableCell>
                {!smScreen && <StyledTableCell align="center">
                  <Typography variant="subtitle2">{row.location.address}</Typography>
                </StyledTableCell>}
                {!mdScreen && <StyledTableCell align="center">
                  <Typography variant="subtitle2">{row.user.phone}</Typography>
                </StyledTableCell>}
                <StyledTableCell align="center">
                  <Box className={`flex flex-wrap justify-center items-center gap-1`}>
                    <FiberManualRecordRounded sx={{ fontSize: "18px", color: (theme) => theme.palette.common.whatsapp }} />
                    <Typography variant="subtitle2">Online</Typography>
                  </Box>
                </StyledTableCell>
                {!smScreen && <StyledTableCell align="center">
                  <Typography variant="subtitle2" >Unavailable</Typography>
                </StyledTableCell>}
                <StyledTableCell align="right">
                  <Box className={`flex flex-wrap justify-end items-center gap-1`}>
                    <IconButton>
                      <EditRounded className="text-secondary" />
                    </IconButton>
                    {!smScreen && <IconButton>
                      <DeleteRounded className="text-primary" />
                    </IconButton>}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default TripsTable