import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import MyDatePicker from "../../components/DatePicker";
import MyTabs from "../../components/Tabs";
import MyTable from "../../components/Table";
import '../../Styles/Index.css';

const Dashboard = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleDatePickerButtonClick = () => {
        setIsDatePickerOpen(true);
    };

    const handleDatePickerClose = () => {
        setIsDatePickerOpen(false);
    };
    const demoData = [
        { id: 1, name: "John Doe1", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 2, name: "Jane Smith2", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 3, name: "John Doe3", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 4, name: "Jane Smith4", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 5, name: "John Doe5", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 6, name: "Jane Smith6", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 7, name: "John Doe7", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 8, name: "Jane Smith8", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 9, name: "John Doe9", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 10, name: "Jane Smith10", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 11, name: "John Doe11", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 12, name: "Jane Smith12", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 13, name: "John Doe13", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 14, name: "Jane Smith14", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 15, name: "John Doe15", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 16, name: "Jane Smith16", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 17, name: "John Doe17", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 18, name: "Jane Smith18", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 19, name: "John Doe19", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 20, name: "Jane Smith20", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 21, name: "John Doe21", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 22, name: "Jane Smith22", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 23, name: "John Doe23", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 24, name: "Jane Smith24", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 25, name: "John Doe25", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 26, name: "Jane Smith26", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 27, name: "John Doe27", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 28, name: "Jane Smith28", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 29, name: "John Doe29", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 30, name: "Jane Smith30", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 31, name: "John Doe31", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 32, name: "Jane Smith32", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 33, name: "John Doe33", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 34, name: "Jane Smith34", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 35, name: "John Doe35", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 36, name: "Jane Smith36", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 37, name: "John Doe37", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 38, name: "Jane Smith38", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 39, name: "John Doe39", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 40, name: "Jane Smith40", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 41, name: "John Doe41", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 42, name: "Jane Smith42", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 43, name: "John Doe43", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 44, name: "Jane Smith44", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 45, name: "John Doe45", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 46, name: "Jane Smith46", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 47, name: "John Doe47", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 48, name: "Jane Smith48", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 49, name: "John Doe49", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 50, name: "Jane Smith50", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 51, name: "John Doe51", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 52, name: "Jane Smith52", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" },
        { id: 53, name: "John Doe53", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"10 April, 2024" },
        { id: 54, name: "Jane Smith54", status: "Active", role:"Frontend Dev", team:"Development", hireDate:"14 Jan, 2023" }
      ];
      
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                
            </Box>
            <Button className='dateSelect' onClick={handleDatePickerButtonClick}>Select Date</Button>
            {isDatePickerOpen && <MyDatePicker onClose={handleDatePickerClose} />}
            <MyTabs />
            <MyTable data={demoData} />
        </Box>
    );
};

export default Dashboard;