import React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableControl = ({ table1Data, deleteControl }) => {
  return (
    <>
      <TableContainer
        component={Paper}
        style={{ border: "0px solid red", width: "900px", margin: "auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Event ID</StyledTableCell>
              <StyledTableCell align="right">Program Name</StyledTableCell>
              <StyledTableCell align="right">Severity</StyledTableCell>
              <StyledTableCell align="right">Risk ID</StyledTableCell>
              <StyledTableCell align="right">Risk Description</StyledTableCell>
              <StyledTableCell align="right">Control Owner</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table1Data.map((e, i) => (
              <StyledTableRow key={e.i}>
                <StyledTableCell component="th" scope="e">
                  {e.EventID}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {e.PROGRAM_NAME}
                </StyledTableCell>
                <StyledTableCell align="right">{e.SEVERITY}</StyledTableCell>
                <StyledTableCell align="right">{e.RISK_ID}</StyledTableCell>
                <StyledTableCell align="right">{e.RISK_DESC}</StyledTableCell>
                <StyledTableCell align="right">
                  {e.CONTROL_OWNER}
                </StyledTableCell>
                <StyledTableCell align="right">{e.CATEGORY}</StyledTableCell>
                <StyledTableCell size="small" style={{ display: "flex" }}>
                  <NavLink
                    to={`/editControl/${e.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      Edit
                    </Button>
                  </NavLink>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => deleteControl(e.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableControl;
