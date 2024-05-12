import { Box } from "@mui/material";
import Header from "../../components/Header";
import DatePicker from "../../components/DatePicker/DatePicker";
import HeadingTabs from "../../components/Tabs/Tabs";
import MyTable from "../../components/Table/Table";
import { demoData } from '../../data/demoData';

const Dashboard = () => {
    
      
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                
            </Box>
            <DatePicker/>
            <HeadingTabs />
            <MyTable data={demoData} />
        </Box>
    );
};

export default Dashboard;