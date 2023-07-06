import React, { useState, useEffect } from "react";
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
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Nav from "../components/Nav";
import {
  addControlData,
  addServerData,
  controlDelete,
  getControlData,
  getServerData,
  serverDelete,
} from "../services/Apis";
import Select from "react-select";
import TableControl from "../components/TableControl";
import TableServer from "../components/TableServer";

const StyledTabs = styled(Tabs)({
  marginBottom: "16px",
});

const StyledTab = styled(Tab)({
  minWidth: "120px",
});

const StyledTableCell = styled(TableCell)({
  border: "1px solid #ddd",
  padding: "8px",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
});

const Config = () => {
  const [controlData, setControlData] = useState({
    EventID: "",
    PROGRAM_NAME: "",
    RISK_ID: "",
    RISK_DESC: "",
    CONTROL_OWNER: "",
  });

  const { EventID, PROGRAM_NAME, RISK_DESC, RISK_ID, CONTROL_OWNER } =
    controlData;
  const [serverData, setServerData] = useState({
    serverList: "",
    UID: new Date().getTime().toString(),
  });

  const [tabValue, setTabValue] = useState(0);
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");

  const optionsCategory = [
    { value: "Business Control", label: "Business Control" },
    { value: "ITSec Control", label: "ITSec Control" },
  ];

  const optionsSeverity = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const setCategoryValue = (e) => {
    setCategory(e.value);
  };

  const setSeverityValue = (e) => {
    setSeverity(e.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleControlInputChange = (e) => {
    const { name, value } = e.target;

    setControlData({
      ...controlData,
      [name]: value,
    });
  };

  const handleServerInputChange = (e) => {
    const { name, value } = e.target;
    setServerData({
      ...serverData,
      [name]: value,
    });
  };

  const handleControlSubmit = async (e) => {
    e.preventDefault();
    const { EventID, PROGRAM_NAME } = controlData;

    const data = new FormData();
    data.append("EventID", EventID);
    data.append("PROGRAM_NAME", PROGRAM_NAME);
    data.append("RISK_ID", RISK_ID);
    data.append("RISK_DESC", RISK_DESC);
    data.append("CONTROL_OWNER", CONTROL_OWNER);
    data.append("CATEGORY", category);
    data.append("SEVERITY", severity);
    data.append("Unique_id", new Date().getTime());

    const response = await addControlData(data);

    if (response.status === 201) {
      setControlData({
        ...controlData,
        EventID: "",
        PROGRAM_NAME: "",
        RISK_ID: "",
        RISK_DESC: "",
        CONTROL_OWNER: "",
      });

      alert("New Control added successfully!");
      fetchTableData();
    }
  };
  const handleServerSubmit = async (e) => {
    e.preventDefault();
    const { serverList, UID } = serverData;
    const data = new FormData();
    data.append("serverList", serverList);
    data.append("UID", UID);

    const response = await addServerData(data);

    if (response.status === 201) {
      setServerData({
        ...serverData,
        serverList: "",
      });

      alert("New Server added successfully!");
      fetchServerTableData();
    }
  };

  const fetchTableData = async () => {
    try {
      const res = await getControlData();
      setTable1Data(res.data.reverse());
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const fetchServerTableData = async () => {
    try {
      const res = await getServerData();
      setTable2Data(res.data.reverse());
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const deleteControl = async (id) => {
    const response = await controlDelete(id);
    if (response.status === 200) {
      fetchTableData();
      alert("Control Delete");
    } else {
      alert("error");
    }
  };
  const deleteServer = async (id) => {
    const response = await serverDelete(id);
    if (response.status === 200) {
      fetchServerTableData()
      alert("Control Delete");
    } else {
      alert("error");
    }
  };

  const handleRowEdit = (index) => {
    const controlID = table1Data[index].EventID;
    // Perform edit logic with controlID
    console.log(controlID);
  };

  const handleRowDelete = (index) => {
    const controlID = table1Data[index].EventID;
    // Perform delete logic with controlID
    console.log(controlID);
  };

  const handleExportPDF = () => {
    // Placeholder logic for exporting to PDF
    console.log("Exporting to PDF");
  };

  useEffect(() => {
    fetchTableData();
    fetchServerTableData();
  }, []);
  return (
    <>
      <Nav />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="80px 0px 0px 0px"
        border="0px solid red"
      >
        <StyledTabs value={tabValue} onChange={handleTabChange} centered>
          <StyledTab label="Controls" />
          <StyledTab label="Servers" />
        </StyledTabs>

        {tabValue === 0 && (
          <>
            <form onSubmit={handleControlSubmit}>
              <TextField
                name="EventID"
                placeholder="Event ID"
                value={EventID}
                onChange={handleControlInputChange}
                required
              />
              <TextField
                name="PROGRAM_NAME"
                placeholder="Program Name"
                value={PROGRAM_NAME}
                onChange={handleControlInputChange}
                required
              />
              <TextField
                name="RISK_ID"
                type="text"
                placeholder="Risk ID"
                value={RISK_ID}
                onChange={handleControlInputChange}
                required
              />
              <TextField
                name="RISK_DESC"
                type="text"
                placeholder="Risk Description"
                value={RISK_DESC}
                onChange={handleControlInputChange}
                required
              />
              <TextField
                name="CONTROL_OWNER"
                type="text"
                placeholder="Control Owner"
                value={CONTROL_OWNER}
                onChange={handleControlInputChange}
                required
              />

              <Select
                options={optionsCategory}
                onChange={setCategoryValue}
                placeholder="Select Category"
              />
              <Select
                options={optionsSeverity}
                onChange={setSeverityValue}
                placeholder="Select Severity"
              />
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, bgcolor: "#2196f3" }}
                >
                  Add Control
                </Button>
              </Box>
            </form>

            <Typography variant="h6" mt={4} mb={2}>
              Controls List
            </Typography>
            {table1Data.length > 0 ? (
              <TableControl
                table1Data={table1Data}
                deleteControl={deleteControl}
              />
            ) : (
              <Typography variant="body1">No controls found.</Typography>
            )}

            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" onClick={handleExportPDF}>
                Export to PDF
              </Button>
            </Box>
          </>
        )}

        {tabValue === 1 && (
          <>
            <form onSubmit={handleServerSubmit}>
              <TextField
                name="serverList"
                label="Server List"
                value={serverData.serverList}
                onChange={handleServerInputChange}
                required
              />
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, bgcolor: "#2196f3" }}
                >
                  Add Server
                </Button>
              </Box>
            </form>

            <Typography variant="h6" mt={4} mb={2}>
              Servers List
            </Typography>
            {table2Data.length > 0 ? (
              <TableServer table2Data={table2Data} deleteServer={deleteServer}/>
             
            ) : (
              <Typography variant="body1">No servers found.</Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Config;
