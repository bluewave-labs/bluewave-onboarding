import { Box } from "@mui/material";
import DatePicker from "../../components/DatePicker/DatePicker";
import HeadingTabs from "../../components/Tabs/Tabs";
import DataTable from "../../components/Table/Table";
import { demoData } from '../../data/demoData';

const Dashboard = () => {
    
      
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                
                {/* <DatePicker/> */}
                <HeadingTabs />
                <DataTable dasta={demoData} />
            </Box>
        </>
    );
};

export default Dashboard;