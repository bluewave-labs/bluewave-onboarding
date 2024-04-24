import { Box } from "@mui/material";
// import { mockTransactions } from "../../data/mockData";
import Header from "../../components/Header";

const Dashboard = () => {
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Box></Box>
        </Box>
    );
};

export default Dashboard;