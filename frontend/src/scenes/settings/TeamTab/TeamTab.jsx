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
import { handleEditOrgNameSuccess, handleGenericError, handleRemoveTeamMemberSuccess } from "../../../utils/settingsHelper";
import LoadingArea from "../../../components/LoadingPage/LoadingArea";
import { changeMemberRole, getOrgDetails, inviteMember, removeTeamMember, updateTeamDetails } from "../../../services/settingServices";
import RemoveTeamMemberModal from "../../../components/Modals/RemoveTeamMemberModal/RemoveTeamMemberModal";
import ChangeMemberRoleModal from "../../../components/Modals/ChangeMemberRoleModal/ChangeMemberRoleModal";


const TeamTab = () => {
  const [value, setValue] = React.useState('1');
  const [editOrgName, setEditOrgName] = useState(false);
  const [orgName, setOrgName] = useState('BlueWave Labs');
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);

  const [openInviteTeamMemberModal, setOpenInviteTeamMemberModal] = useState(false);
  const [openRemoveTeamMemberModal, setOpenRemoveTeamMemberModal] = useState(false);
  const [openChangeMemberRoleModal, setOpenChangeMemberRoleModal] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

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
        handleGenericError("Error fetching team details");
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
      handleEditOrgNameSuccess(response, "Team Name Changed Successfully");
      setRefetch(()=>refetch ? false : true);
    }
    catch(error) {
      handleGenericError("Error updating team name");
    }
    finally {
      setEditOrgName(false);
    }
  }

  const handleRemoveTeamMember = async () => {
    try {
      console.log("🚀 ~ handleRemoveTeamMember ~ selectedMember:", selectedMember)
      const response = await removeTeamMember(selectedMember.id);
      
      handleRemoveTeamMemberSuccess("Team Member Successfully Removed");
      setRefetch(()=>refetch ? false : true);
    }
    catch(error) {
      handleGenericError("Error Removing Team Member");
    }
    finally {
      setOpenRemoveTeamMemberModal(false);
    }
  }

  const handleInviteTeamMember = async (inputs) => {
    try {
      const response = await inviteMember(inputs);
      if(response.status != 200) {
        throw new Error(response.data.error || response.data.message);
      }
      // handle("Team Member Successfully Removed");
      // setRefetch(()=>refetch ? false : true);
    }
    catch(error) {
      handleGenericError("Error Removing Team Member");
    }
    finally {
      setOpenInviteTeamMemberModal(false);
    }
  }

  const handleChangeRole = async () => {
    try {
      const response = await changeMemberRole(selectedMember);
      if(response.status != 200) {
        throw new Error(response.data.error || response.data.message);
      }
      // handleRemoveTeamMemberSuccess("Team Member Successfully Removed");
      setRefetch(()=>refetch ? false : true);
    }
    catch(error) {
      // handleRemoveTeamMemberError("Error Removing Team Member");
    }
    finally {
      setOpenChangeMemberRoleModal(false);
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
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="1"><TeamTable team={team} setRemoveModalOpen={setOpenRemoveTeamMemberModal} setChangeRoleModalOpen={setOpenChangeMemberRoleModal} setSelectedMember={setSelectedMember}/></TabPanel>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="2"><TeamTable team={team.filter((user)=>user.role=="admin")} setRemoveModalOpen={setOpenRemoveTeamMemberModal} setChangeRoleModalOpen={setOpenChangeMemberRoleModal} setSelectedMember={setSelectedMember}/></TabPanel>
              <TabPanel sx={{ padding: 0, marginTop: '1.2rem' }} value="3"><TeamTable team={team.filter((user) => user.role=="member")} setRemoveModalOpen={setOpenRemoveTeamMemberModal} setChangeRoleModalOpen={setOpenChangeMemberRoleModal} setSelectedMember={setSelectedMember}/></TabPanel>
            </TabContext>
          </Box>
        </div>
        <InviteTeamMemberModal open={openInviteTeamMemberModal} handleClose={handleInviteTeamMemberModalClose} handleInviteTeamMember={handleInviteTeamMember} />
        <RemoveTeamMemberModal open={openRemoveTeamMemberModal} setModalOpen={setOpenRemoveTeamMemberModal} selectedMember={selectedMember} handleRemoveTeamMember={handleRemoveTeamMember} />
        <ChangeMemberRoleModal open={openChangeMemberRoleModal} setModalOpen={setOpenChangeMemberRoleModal} selectedMember={selectedMember} handleChangeRole={handleChangeRole} />
      </div>
    </>
  ;
};

export default TeamTab;
