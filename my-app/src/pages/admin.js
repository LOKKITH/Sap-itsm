import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Nav from '../components/Nav';
//import Navbar from './navbar';
//import { Nav } from 'react-bootstrap';

const StyledTabs = styled(Tabs)({
 marginBottom: '16px',
});

const StyledTab = styled(Tab)({
 minWidth: '120px',
});

const StyledTableCell = styled(TableCell)({
 border: '1px solid #ddd',
 padding: '8px',
 boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
});

const AdminPage = () => {
 const [tabValue, setTabValue] = useState(0);
 const [table1Data, setTable1Data] = useState([]);
 const [table2Data, setTable2Data] = useState([]);

 useEffect(() => {
 fetchTableData();
 }, []);

 const fetchTableData = async () => {
 try {
 const controlResponse = await fetch('http://localhost:5000/api/controls');
 if (!controlResponse.ok) {
 throw new Error('Failed to fetch control data');
 }
 const controlResult = await controlResponse.json();
 setTable1Data(controlResult); // Assign the fetched data directly
 console.log('Table 1 data:', controlResult);
 
 const serverResponse = await fetch('http://localhost:5000/api/servers');
 if (!serverResponse.ok) {
 throw new Error('Failed to fetch server data');
 }
 const serverResult = await serverResponse.json();
 setTable2Data(serverResult); // Assign the fetched data directly
 console.log('Table 2 data:', serverResult);
 } catch (error) {
 console.error('Error fetching table data:', error);
 }
 };
 

 const handleTabChange = (event, newValue) => {
 setTabValue(newValue);
 };

 const [controlData, setControlData] = useState({
 EventID: '',
 PROGRAM_NAME: '',
 SEVERITY: '',
 });

 const [serverData, setServerData] = useState({
 serverslist: '',
 });

 const handleControlInputChange = (e) => {
 setControlData((prevData) => ({
 ...prevData,
 [e.target.name]: e.target.value,
 }));
 };

 const handleServerInputChange = (e) => {
 setServerData((prevData) => ({
 ...prevData,
 [e.target.name]: e.target.value,
 }));
 };

 const handleControlSubmit = async (e) => {
 e.preventDefault();
 try {
 const response = await fetch('http://localhost:5000/api/controls', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(controlData),
 });
 const result = await response.json();
 setTable1Data((prevData) => [...prevData, result]); // Update to use result instead of result.data
 setControlData({
 EventID: '',
 PROGRAM_NAME: '',
 SEVERITY: '',
 });
 } catch (error) {
 console.error('Error adding data to controls:', error);
 }
 };

 const handleServerSubmit = async (e) => {
 e.preventDefault();
 try {
 const response = await fetch('http://localhost:5000/api/servers', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(serverData),
 });
 const result = await response.json();
 setTable2Data((prevData) => [...prevData, result]);
 setServerData({
 serverslist: '',
 });
 } catch (error) {
 console.error('Error adding data to servers:', error);
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
 console.log('Exporting to PDF');
 };

 return (
 <>
 <Nav/>
 <Box display="flex" flexDirection="column" alignItems="center">
 <StyledTabs value={tabValue} onChange={handleTabChange} centered>
 <StyledTab label="Controls" />
 <StyledTab label="Servers" />
 </StyledTabs>

 {tabValue === 0 && (
 <>
 <form onSubmit={handleControlSubmit}>
 <TextField
 name="EventID"
 label="Event ID"
 value={controlData.EventID}
 onChange={handleControlInputChange}
 required
 />
 <TextField
 name="PROGRAM_NAME"
 label="Program Name"
 value={controlData.PROGRAM_NAME}
 onChange={handleControlInputChange}
 required
 />
 <TextField
 name="SEVERITY"
 label="SEVERITY"
 value={controlData.SEVERITY}
 onChange={handleControlInputChange}
 required
 />
 <Box display="flex" justifyContent="center">
 <Button
 type="submit"
 variant="contained"
 color="primary"
 sx={{ mt: 2, bgcolor: '#2196f3' }}
 >
 Add Control
 </Button>
 </Box>
 </form>

 <Typography variant="h6" mt={4} mb={2}>
 Controls List
 </Typography>
 {table1Data.length > 0 ? (
 <TableContainer component={Paper}>
 <Table>
 <TableHead>
 <TableRow>
 <StyledTableCell>Event ID</StyledTableCell>
 <StyledTableCell>Program Name</StyledTableCell>
 <StyledTableCell>Severity</StyledTableCell>
 <StyledTableCell size="small">Action</StyledTableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 {table1Data.map((row, index) => (
 <TableRow key={index}>
 <StyledTableCell>{row.EventID}</StyledTableCell>
 <StyledTableCell>{row.PROGRAM_NAME}</StyledTableCell>
 <StyledTableCell>{row.SEVERITY}</StyledTableCell>
 <StyledTableCell size="small">
 <Button variant="outlined" size="small" onClick={() => handleRowEdit(index)}>
 Edit
 </Button>
 <Button variant="outlined" size="small" color="error" onClick={() => handleRowDelete(index)}>
 Delete
 </Button>
 </StyledTableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </TableContainer>
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
 sx={{ mt: 2, bgcolor: '#2196f3' }}
 >
 Add Server
 </Button>
 </Box>
 </form>

 <Typography variant="h6" mt={4} mb={2}>
 Servers List
 </Typography>
 {table2Data.length > 0 ? (
 <TableContainer component={Paper}>
 <Table>
 <TableHead>
 <TableRow>
 <StyledTableCell>Server List</StyledTableCell>
 <StyledTableCell size="small">Action</StyledTableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 {table2Data.map((row, index) => (
 <TableRow key={index}>
 <StyledTableCell>{row.serverslist}</StyledTableCell>
 <StyledTableCell size="small">
 <Button variant="outlined" size="small" onClick={() => handleRowEdit(index)}>
 Edit
 </Button>
 <Button variant="outlined" size="small" color="error" onClick={() => handleRowDelete(index)}>
 Delete
 </Button>
 </StyledTableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </TableContainer>
 ) : (
 <Typography variant="body1">No servers found.</Typography>
 )}
 </>
 )}
 </Box>
 </>
 );
};

export default AdminPage;