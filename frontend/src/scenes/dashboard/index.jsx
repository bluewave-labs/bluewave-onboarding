import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import MyDatePicker from "../../components/DatePicker";
import MyTabs from "../../components/Tabs";
import MyTable from "../../components/Table";

const Dashboard = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleDatePickerButtonClick = () => {
        setIsDatePickerOpen(true);
    };

    const handleDatePickerClose = () => {
        setIsDatePickerOpen(false);
    };
    const demoData = [
        { id: 1, name: "John Doe", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 2, name: "Jane Smith", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        
    ];
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                
            </Box>
            <Button onClick={handleDatePickerButtonClick}>Select Date</Button>
            {isDatePickerOpen && <MyDatePicker onClose={handleDatePickerClose} />}
            <MyTabs />
            <MyTable data={demoData} />
        </Box>
    );
};

export default Dashboard;