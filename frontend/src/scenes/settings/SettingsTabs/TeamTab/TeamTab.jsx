import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { VscEdit } from "react-icons/vsc";
import './TeamTab.css'
import TeamTable from "./TeamTable/TeamTable";

const TeamTab = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
      <div className="organisation">
        <h6 className="nameHeading">Organisation Name</h6>
        <p className="organisationName">
          BlueWave Labs
          <VscEdit />
        </p>
      </div>
      <div>
        <h6>Team Members</h6>
        <div className="team">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box className="team">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="tabs-list"
                TabIndicatorProps={{
                    style: {
                      backgroundColor: "rgba(244, 245, 247, 1)",
                      paddingTop: '0px'
                    }
                  }}
              >
                <Tab label="All" value="1" className="tabs"/>
                <Tab label="Administrator" value="2" className="tabs" />
                <Tab label="Member" value="3" className="tabs" />
              </TabList>
              <button className="invite">Invite Team Members</button>
            </Box>
            <TabPanel value="1"><TeamTable/></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
        
        </div>
      </div>
    </div>
  );
};

export default TeamTab;
