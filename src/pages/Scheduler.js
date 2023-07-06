import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
} from "@material-ui/core";
import "../styles/styles.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { scheduledjobFun } from "../services/Apis";
import Nav from "../components/Nav";

function Scheduler() {
  const history = useHistory();
  const [table1Data, setTable1Data] = useState([
    {
      id: 1,
      column1: "BUS001",
      column2: "ZBUS001",
      column3: "Low",
      selected: false,
    },
    {
      id: 2,
      column1: "ITSEC001",
      column2: "ZITSEC001",
      column3: "High",
      selected: false,
    },
    {
      id: 3,
      column1: "MC_MM_P033",
      column2: "ZMC_MM_P033",
      column3: "High",
      selected: false,
    },
    {
      id: 4,
      column1: "MC_MM_P006",
      column2: "ZMC_MM_P006",
      column3: "Low",
      selected: false,
    },
    {
      id: 5,
      column1: "MC_SD_S002",
      column2: "ZMC_SD_S002",
      column3: "High",
      selected: false,
    },
  ]);

  const [table2Data, setTable2Data] = useState([
    { id: 1, column1: "Server1", selected: false },
    { id: 2, column1: "Server2", selected: false },
    { id: 3, column1: "Server3", selected: false },
    { id: 4, column1: "Server4", selected: false },
    { id: 5, column1: "Server5", selected: false },
  ]);

  const handleTable1CheckboxChange = (id) => {
    const updatedData = table1Data.map((row) => {
      if (row.id === id) {
        return { ...row, selected: !row.selected };
      }
      return row;
    });
    setTable1Data(updatedData);
  };

  const handleTable2CheckboxChange = (id) => {
    const updatedData = table2Data.map((row) => {
      if (row.id === id) {
        return { ...row, selected: !row.selected };
      }
      return row;
    });
    setTable2Data(updatedData);
  };
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [selectedInterval, setSelectedInterval] = React.useState(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleIntervalChange = (Interval) => {
    setSelectedInterval(Interval);
  };

  const convertIntervalToSeconds = (intervalValue) => {
    const [minutes, seconds] = intervalValue.split(":");
    return parseInt(minutes) * 60 + parseInt(seconds);
  };

  const handleSubmit = async () => {
    const selectedRowsTable1 = table1Data.filter((row) => row.selected);
    const selectedRowsTable2 = table2Data.filter((row) => row.selected);

    const selectedStartTime = selectedTime
      ? selectedTime.format("HH:mm:ss")
      : "";
    const intervalSeconds = selectedInterval
      ? convertIntervalToSeconds(selectedInterval.format("mm:ss"))
      : null;

    const requestData = {
      Control: selectedRowsTable1.map((item) => item.column1),
      Severname: selectedRowsTable2.map((item) => item.column1),
      Start_Time: selectedStartTime,
      //Interval: intervalSeconds,
      // Servers: [
      //   {
      //     server_1: {
      //       username: "<username>",
      //       password: "<password>",
      //       ashost: "<ashost>",
      //       system_number: "<system_number>",
      //       client_no: "<client_no>",
      //     },
      //   },
      //   {
      //     server_2: {
      //       username: "<username>",
      //       password: "<password>",
      //       ashost: "<ashost>",
      //       system_number: "<system_number>",
      //       client_no: "<client_no>",
      //     },
      //   },
      // ],
    };

    console.log("requestData321", requestData);

    /*{const controlColumns = requestData.Control.map(item => ({
      column1: item.column1,
      column2: item.column2
    }));
    
    console.log(controlColumns);}*/

    // const response = await scheduledjobFun(requestData)
    // console.log("res", response)
    // Make API request using Python (e.g., using fetch or axios) and pass the requestData as JSON data
    // Example:
    fetch("/scheduledjob", {
      method: "POST", // Set the request method to POST
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
      },
      body: JSON.stringify(requestData), // Convert the requestData to JSON string and send it as the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dataRahul", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StyledContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
  }));

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
  }));

  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: "#e0e0e0",
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: "1px solid #ccc",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#2196f3",
    color: "#fff",
    fontWeight: "bold",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  }));

  return (
    <div>
      {/* <Navbar /> */}

      <Nav />

      <div style={{ padding: "0 5%", margin: "80px 0px 0px 0px" }}>
        {/* Add left and right padding of 5% */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* Table 1 */}
            <StyledContainer>
              <Typography variant="h5" style={{ fontFamily: "Arial" }}>
                Controls
              </Typography>
              <StyledTableContainer>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>EventID</StyledTableCell>
                      <StyledTableCell>PROGRAM_NAME</StyledTableCell>
                      <StyledTableCell>SEVERITY</StyledTableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {table1Data.map((row) => (
                      <TableRow key={row.id}>
                        <StyledTableCell>
                          <Checkbox
                            checked={row.selected}
                            onChange={() => handleTable1CheckboxChange(row.id)}
                            style={{
                              color: row.selected ? "#2196f3" : "inherit",
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>{row.column1}</StyledTableCell>
                        <StyledTableCell>{row.column2}</StyledTableCell>
                        <StyledTableCell>{row.column3}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </StyledContainer>
          </Grid>
          <Grid item xs={6}>
            {/* Table 2 */}
            <StyledContainer>
              <Typography
                variant="h5"
                style={{ fontFamily: "Arial", textAlign: "left" }}
              >
                Servers List
              </Typography>
              <StyledTableContainer>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>ServerNames</StyledTableCell>
                      <br />
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {table2Data.map((row) => (
                      <TableRow key={row.id}>
                        <StyledTableCell>
                          <Checkbox
                            checked={row.selected}
                            onChange={() => handleTable2CheckboxChange(row.id)}
                            style={{
                              color: row.selected ? "#2196f3" : "inherit",
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>{row.column1}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </StyledContainer>
          </Grid>
          <Grid item xs={12}>
            <br />
            {/* Scheduler */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: "Arial", textAlign: "left" }}
              >
                Job Scheduler
              </Typography>
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <br style={{ margin: "5px 0" }} />

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeField
                  label="Interval"
                  value={selectedInterval}
                  onChange={handleIntervalChange}
                  renderInput={(props) => <TextField {...props} />}
                  format="mm:ss"
                  ampm={false}
                  mask="__:__"
                  views={["minutes", "seconds"]}
                />
              </LocalizationProvider> */}

              <br style={{ margin: "10px 0" }} />

              <StyledButton onClick={handleSubmit}>Submit</StyledButton>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Scheduler;
