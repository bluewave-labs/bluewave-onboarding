import React, { useEffect, useState } from "react";
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
import { handleEditOrgNameSuccess, handleOrgDataError } from "../../../utils/settingsHelper";
import LoadingArea from "../../../components/LoadingPage/LoadingArea";
import { getOrgDetails } from "../../../services/settingServices";


const TeamTab = () => {
  const [value, setValue] = React.useState('1');
  const [editOrgName, setEditOrgName] = useState(false);
  const [orgName, setOrgName] = useState('BlueWave Labs');
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);

  const [openInviteTeamMemberModal, setOpenInviteTeamMemberModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(()=>true)
        const response = await getOrgDetails();
        if(response.status != 200) {
          handleOrgDataError(response.data.error || response.data.message);
        }
        setOrgName(()=>response.data.name);
        setTeam(()=>response.data.users);
        setLoading(()=>false);
      }
      catch (error) {
        console.error("Error fetching team details", error.message);
        handleOrgDataError("Error fetching team details");
      }
    })()
  }, [refetch])

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

  const handleEditOrgName = async () => {
    try {
      const response = await updateTeamName(orgName);
      if(response.status != 200) {
        throw new Error(response.data.error || response.data.message);
      }
    }
    catch(error) {

    }
  }

  return loading
    ? <LoadingArea />
    : <>
      <div className={styles.organisation}>
        <h6 className={styles.nameHeading}>Organisation Name</h6>
        <div className={styles.orgNameContainer}>
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
            <FaCheck aria-label="Save Organisation Name" onClick={handleEditOrgName} className={styles.pencil} color="green"
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
                    className: styles.tabIndicator
                  }}
                >
                  <Tab
                    label="All"
                    value="1"
                    className={`${styles.tabs} ${value === '1' ? styles.boldTab : styles.normalTab}`}
                  />
                  <Tab
                    label="Administrator"
                    value="2"
                    className={`${styles.tabs} ${value === '2' ? styles.boldTab : styles.normalTab}`}
                  />
                  <Tab
                    label="Member"
                    value="3"
                    className={`${styles.tabs} ${value === '3' ? styles.boldTab : styles.normalTab}`}
                  />
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
  ;
};

export default TeamTab;
