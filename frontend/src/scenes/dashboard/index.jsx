import { Box } from "@mui/material";
import DatePicker from "../../components/DatePicker/DatePicker";
import HeadingTabs from "../../components/Tabs/Tabs";
import DataTable from "../../components/Table/Table";
import { demoData } from '../../data/demoData';
import Popups from '../../components/Popups/Popups';
import Charts from '../../components/Charts/Charts';
import EditorDesign from '../../components/EditorDesign/EditorDesign';
import Logos from '../../components/Logos/Logos';
import TextFieldComponents from '../../components/TextFieldComponents/TextFieldComponents';
import ToolTips from '../../components/ToolTips/ToolTips';




const Dashboard = () => {
    
      
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Popups />
                <Charts />
                <EditorDesign />
                <Logos />
                <TextFieldComponents />
                <ToolTips />

                {/* <DatePicker/> */}
                <HeadingTabs />
                <DataTable data={demoData} />
            </Box>
        </>
    );
};

export default Dashboard;