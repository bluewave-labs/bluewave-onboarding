import React from 'react';
import { Box } from "@mui/material";
import Title from "../../components/Title/Title";
import DatePicker from "../../components/DatePicker/DatePicker";
import HeadingTabs from "../../components/Tabs/Tabs";
import DataTable from "../../components/Table/Table";
import { demoData } from '../../data/demoData';


const Dashboard = () => {
    return (
      <Box p={3}>
        <Title />
        {/* <DatePicker/> */}
        <HeadingTabs />
        <DataTable data={demoData} />
      </Box>
    );
  };
export default Dashboard;