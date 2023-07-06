import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Nav from "../components/Nav";
import { editControlsData, getSingleControl } from "../services/Apis";
import Select from "react-select";
import { useParams, useHistory } from "react-router-dom";

const StyledTabs = styled(Tabs)({
  marginBottom: "16px",
});

const StyledTab = styled(Tab)({
  minWidth: "120px",
});

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log("is p", id);
  const [controlData, setControlData] = useState({
    EventID: "",
    PROGRAM_NAME: "",
    RISK_ID: "",
    RISK_DESC: "",
    CONTROL_OWNER: "",
  });

  //   console.log("controlData", controlData)

  const { EventID, PROGRAM_NAME, RISK_DESC, RISK_ID, CONTROL_OWNER } =
    controlData;
  const [serverData, setServerData] = useState({
    serverslist: "",
  });

  const [tabValue, setTabValue] = useState(0);
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  //   const history = useHistory()
  console.log("cat", category);
  console.log("sav", severity);
  //   console.log("table1Data", table1Data);
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
    setServerData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditControl = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("EventID", EventID);
    data.append("PROGRAM_NAME", PROGRAM_NAME);
    data.append("RISK_ID", RISK_ID);
    data.append("RISK_DESC", RISK_DESC);
    data.append("CONTROL_OWNER", CONTROL_OWNER);
    data.append("CATEGORY", category);
    data.append("SEVERITY", severity);
    data.append("Unique_id", new Date().getTime().toString());

    const response = await editControlsData(id, data);
    console.log("response", response);
    if (response.status === 200) {
      alert("Control Update successfully!");
      fetchTableData();
      history.push("/configure");
    }
  };

  const fetchTableData = async () => {
    try {
      const res = await getSingleControl(id);
      console.log("res", res);
      setControlData(res.data);
      setCategory(res.data.CATEGORY);
      setSeverity(res.data.SEVERITY);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

 

  

  useEffect(() => {
    fetchTableData();
  }, [id]);
  return (
    <div>
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
          {/* <StyledTab label="Servers" /> */}
        </StyledTabs>

        {tabValue === 0 && (
          <div>
            <form>
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
                  onClick={handleEditControl}
                  sx={{ mt: 2, bgcolor: "#2196f3" }}
                >
                  Update Control
                </Button>
              </Box>
            </form>
          </div>
        )}

        {/* {tabValue === 1 && (
          <>
            <form onSubmit={handleServerSubmit}>
              <TextField
                name="serverslist"
                label="Server List"
                value={serverData.serverslist}
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
          </>
        )} */}
      </Box>
    </div>
  );
};

export default Edit;
