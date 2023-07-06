import React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { NavLink } from "react-router-dom";
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

const TableServer = ({ table2Data, deleteServer }) => {
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          border: "0px solid red",
          borderRadius: "10px",
          width: "600px",
          margin: "auto",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Server Lists</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table2Data.map((elem, id) => (
              <StyledTableRow key={elem.UID}>
                <StyledTableCell component="th" scope="row">
                  {elem.serverList}
                </StyledTableCell>

                <NavLink
                  to={`/editServer/${elem.id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Button variant="outlined" size="small">
                    Edit
                  </Button>
                </NavLink>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => deleteServer(elem.id)}
                >
                  Delete
                </Button>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableServer;
