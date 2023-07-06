import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Nav from "../components/Nav";
import { editServerData, getSingleServer } from "../services/Apis";
import Select from "react-select";
import { useParams, useHistory } from "react-router-dom";

const StyledTabs = styled(Tabs)({
  marginBottom: "16px",
});

const StyledTab = styled(Tab)({
  minWidth: "120px",
});

const EditServer = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log("is p", id);

  const [serverData, setServerData] = useState({
    serverList: "",
  });
  const { serverList } = serverData;

  const [tabValue, setTabValue] = useState(0);
  //   const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  //   const history = useHistory()

  //   console.log("table1Data", table1Data);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleServerInputChange = (e) => {
    const { name, value } = e.target;
    setServerData({
      ...serverData,
      [name]: value,
    });
  };

  //   const handleEditControl = async (e) => {
  //     e.preventDefault();
  //     const data = new FormData();
  //     data.append("EventID", EventID);
  //     data.append("PROGRAM_NAME", PROGRAM_NAME);
  //     data.append("RISK_ID", RISK_ID);
  //     data.append("RISK_DESC", RISK_DESC);
  //     data.append("CONTROL_OWNER", CONTROL_OWNER);
  //     data.append("CATEGORY", category);
  //     data.append("SEVERITY", severity);
  //     data.append("Unique_id", new Date().getTime().toString());

  //     const response = await editControlsData(id, data);
  //     console.log("response", response);
  //     if (response.status === 200) {
  //       alert("Control Update successfully!");
  //       fetchTableData();
  //       history.push("/configure");
  //     }
  //   };

  const fetchServerTableData = async () => {
    try {
      const res = await getSingleServer(id);
      console.log("res", res);
      setServerData(res.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  const handleEditServer = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("serverList", serverList);

    const response = await editServerData(id, data);
    console.log("response update", response);
    if (response.status === 200) {
      alert("Control Update successfully!");
      //   fetchTableData();
      fetchServerTableData();
      history.push("/configure");
    }
  };

  useEffect(() => {
    fetchServerTableData();
  }, [id]);
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
          <StyledTab label="Servers" />
        </StyledTabs>

        <>
          <form>
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
                onClick={handleEditServer}
              >
                Update Server
              </Button>
            </Box>
          </form>
        </>
      </Box>
    </>
  );
};

export default EditServer;
