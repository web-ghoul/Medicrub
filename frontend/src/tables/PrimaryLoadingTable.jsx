import { TableBody } from "@mui/material";
import { Fragment } from "react";
import { handleRandomNumber } from "../functions/handleRandomNumber";

const PrimaryLoadingTable = ({ children }) => {
  return (
    <TableBody>
      {Array(handleRandomNumber()).fill(0).map((_, i) => (
        <Fragment key={i}>
          {children}
        </Fragment>
      ))}
    </TableBody>
  )
}

export default PrimaryLoadingTable
