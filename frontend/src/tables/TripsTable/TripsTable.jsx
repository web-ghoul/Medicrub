import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import { useState } from "react";
import PrimaryLoadingTable from "../PrimaryLoadingTable";
import PrimaryTable from "../PrimaryTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TripsTable = ({ data, isLoading, readOnly, name }) => {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [page, setPage] = useState(0);

  const StyledTableRow = styled(TableRow)(({ theme }) => {
    return !readOnly && ({
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

  return (
    <PrimaryTable page={page} setPage={setPage} data={data} loading={isLoading} title={"No Trips Yet..."} total={data && data?.length} name={name || "trips"}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <Typography variant='h6'>Patient</Typography>
          </StyledTableCell>
          {!mdScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Phone</Typography>
          </StyledTableCell>}
          {!smScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Address</Typography>
          </StyledTableCell>}
          {!mdScreen && <StyledTableCell align="center">
            <Typography variant='h6'>Destination</Typography>
          </StyledTableCell>}
          <StyledTableCell align="center">
            <Typography variant='h6'>Driver</Typography>
          </StyledTableCell>
          {!readOnly && <StyledTableCell align="right">
            <Typography variant='h6'>Action</Typography>
          </StyledTableCell>}
        </StyledTableRow>
      </TableHead>
      {isLoading ? <PrimaryLoadingTable /> : data && data.length > 10 ? data.slice(10 * page, 10 + (10 * page)).map((row, i) => {
        return (
          <TableBody key={i}>
            <StyledTableRow >
              {
                mdScreen ? <StyledTableCell>
                  <Typography variant="subtitle2">${row.patient.firstName}</Typography>
                </StyledTableCell> : <StyledTableCell>
                  <Typography variant="subtitle2">{`${row.patient.firstName} ${row.patient.lastName}`}</Typography>
                </StyledTableCell>
              }
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.patient.phone}</Typography>
              </StyledTableCell>}
              {!smScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.pickup.address}</Typography>
              </StyledTableCell>}
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.destination.address}</Typography>
              </StyledTableCell>}
              {!row.driver ? <StyledTableCell align="center">
                <Typography variant="subtitle1">webGhoul</Typography>
              </StyledTableCell> : <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.driver}</Typography>
              </StyledTableCell>}
              {!readOnly && <StyledTableCell align="right">
                <Box className={`flex flex-wrap justify-end items-center gap-1`}>
                  <IconButton>
                    <EditRounded className="text-secondary" />
                  </IconButton>
                  {!smScreen && <IconButton>
                    <DeleteRounded className="text-primary" />
                  </IconButton>}
                </Box>
              </StyledTableCell>}
            </StyledTableRow>
          </TableBody>
        )
      }) : data && data.map((row, i) => {
        return (
          <TableBody key={i}>
            <StyledTableRow >
              {
                mdScreen ? <StyledTableCell>
                  <Typography variant="subtitle2">${row.patient.firstName}</Typography>
                </StyledTableCell> : <StyledTableCell>
                  <Typography variant="subtitle2">{`${row.patient.firstName} ${row.patient.lastName}`}</Typography>
                </StyledTableCell>
              }
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.patient.phone}</Typography>
              </StyledTableCell>}
              {!smScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.pickup.address}</Typography>
              </StyledTableCell>}
              {!mdScreen && <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.destination.address}</Typography>
              </StyledTableCell>}
              {!row.driver ? <StyledTableCell align="center">
                <Typography variant="subtitle1">webGhoul</Typography>
              </StyledTableCell> : <StyledTableCell align="center">
                <Typography variant="subtitle2">{row.driver}</Typography>
              </StyledTableCell>}
              {!readOnly && <StyledTableCell align="right">
                <Box className={`flex flex-wrap justify-end items-center gap-1`}>
                  <IconButton>
                    <EditRounded className="text-secondary" />
                  </IconButton>
                  {!smScreen && <IconButton>
                    <DeleteRounded className="text-primary" />
                  </IconButton>}
                </Box>
              </StyledTableCell>}
            </StyledTableRow>
          </TableBody>
        )
      })}
    </PrimaryTable>
  )
}

export default TripsTable