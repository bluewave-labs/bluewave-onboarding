import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { VscEdit } from "react-icons/vsc";
import styles from './TeamTab.module.css';
import TeamTable from "./TeamTable/TeamTable";
import Button from "../../../components/Button/Button";
import InviteTeamMemberModal from "../../../components/Modals/InviteTeamMemberModal/InviteTeamMemberModal";
import CustomTextField from "../../../components/TextFieldComponents/CustomTextField/CustomTextField";
import { FaCheck } from "react-icons/fa";

const TeamTab = () => {
  const [value, setValue] = React.useState('1');
  const [editOrgName, setEditOrgName] = useState(false);
  const [orgName, setOrgName] = useState('BlueWave Labs');

  const [openInviteTeamMemberModal, setOpenInviteTeamMemberModal] = useState(false);

  const handleInviteTeamMemberModalClose = () => {
    setOpenInviteTeamMemberModal(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleEdit = () => {
    setEditOrgName(!editOrgName);
  }

  const handleInviteTeamMemberModalOpen = () => {
    setOpenInviteTeamMemberModal(true);
  };

  return (
    <>
      <div className={styles.organisation}>
        <h6 className={styles.nameHeading}>Organisation Name</h6>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {!editOrgName && <p className={styles.organisationName}>{orgName}</p>}
          {editOrgName && <CustomTextField
            autofocus={true}
            TextFieldWidth="auto"
            value={orgName}
            onChange={e => setOrgName(e.target.value)}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
          />}
          {!editOrgName ?
            <VscEdit aria-label="Edit Organisation Name" className={styles.pencil} onClick={toggleEdit} /> :
            <FaCheck aria-label="Save Organisation Name" onClick={toggleEdit} className={styles.pencil} color="green"
            />
          }

        </div>
      </div>
      <div>
        <h6>Team Members</h6>
        <div className={styles.team}>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box className={styles.team}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "rgba(244, 245, 247, 1)",
                      paddingTop: '0px',
                    },
                  }}
                >
                  <Tab
                    label="All"
                    value="1"
                    style={{
                      fontWeight: value === '1' ? 'bold' : 'normal'
                    }}
                    className={styles.tabs} />
                  <Tab label="Administrator" value="2" style={{
                    fontWeight: value === '2' ? 'bold' : 'normal'
                  }} className={styles.tabs} />
                  <Tab label="Member" value="3" style={{
                    fontWeight: value === '3' ? 'bold' : 'normal'
                  }} className={styles.tabs} />
                </TabList>
                <Button
                  text="Invite Team Members"
                  onClick={handleInviteTeamMemberModalOpen}
                // onClick={handleSubmit}
                />
              </Box>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="1"><TeamTable /></TabPanel>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="2">Item Two</TabPanel>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </div>
        <InviteTeamMemberModal open={openInviteTeamMemberModal} handleClose={handleInviteTeamMemberModalClose} />
      </div>
    </>
  );
};

export default TeamTab;
