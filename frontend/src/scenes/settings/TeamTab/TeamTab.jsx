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
import { FaCheck, FaCross, FaTimes } from "react-icons/fa";
import { handleEditOrgNameSuccess, handleOrgDataError, handleRemoveTeamMemberError, handleRemoveTeamMemberSuccess } from "../../../utils/settingsHelper";
import LoadingArea from "../../../components/LoadingPage/LoadingArea";
import { getOrgDetails, removeTeamMember, updateTeamDetails } from "../../../services/settingServices";
import RemoveTeamMemberModal from "../../../components/Modals/RemoveTeamMemberModal/RemoveTeamMemberModal";


const TeamTab = () => {
  const [value, setValue] = React.useState('1');
  const [editOrgName, setEditOrgName] = useState(false);
  const [orgName, setOrgName] = useState('BlueWave Labs');
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);

  const [openInviteTeamMemberModal, setOpenInviteTeamMemberModal] = useState(false);
  const [openRemoveTeamMemberModal, setOpenRemoveTeamMemberModal] = useState(false);

  const [selectedMember, setSelectedMember] = useState({name:"asd"});

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
      const response = await updateTeamDetails(orgName);
      if(response.status != 200) {
        throw new Error(response.data.error || response.data.message);
      }
      // originalOrgName = orgName;
      
      // setOrgName(()=>response.data.name);
      // setTeam(()=>response.data.users);
    }
    catch(error) {
      // setOrgName(()=>originalOrgName);
      handleOrgDataError("Error updating team name");
    }
    finally {
      setEditOrgName(false);
    }
  }

  const handleRemoveTeamMember = async () => {
    try {
      const response = await removeTeamMember(selectedMember.id);
      if(response.status != 200) {
        throw new Error(response.data.error || response.data.message);
      }
      handleRemoveTeamMemberSuccess("Team Member Successfully Removed");
      setRefetch(()=>refetch ? false : true);
    }
    catch(error) {
      handleRemoveTeamMemberError("Error Removing Team Member");
    }
    finally {
      setOpenRemoveTeamMemberModal(false);
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
            <>
              <FaCheck aria-label="Save Organisation Name" onClick={handleEditOrgName} className={styles.pencil} color="green" />
              <FaTimes aria-label="Close Edit Panel" onClick={()=>setEditOrgName(false)} className={styles.pencil} color="black" />
            </>
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
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="1"><TeamTable team={team} setModalOpen={setOpenRemoveTeamMemberModal} setSelectedMember={setSelectedMember}/></TabPanel>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="2"><TeamTable team={team.filter((user)=>user.role=="admin")} setModalOpen={setOpenRemoveTeamMemberModal} setSelectedMember={setSelectedMember}/></TabPanel>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="3"><TeamTable team={team.filter((user) => user.role=="member")} setModalOpen={setOpenRemoveTeamMemberModal} setSelectedMember={setSelectedMember}/></TabPanel>
            </TabContext>
          </Box>
        </div>
        <InviteTeamMemberModal open={openInviteTeamMemberModal} handleClose={handleInviteTeamMemberModalClose} />
        <RemoveTeamMemberModal open={openRemoveTeamMemberModal} setModalOpen={setOpenRemoveTeamMemberModal} selectedMember={selectedMember} handleRemoveTeamMember={handleRemoveTeamMember} />
      </div>
    </>
  ;
};

export default TeamTab;
