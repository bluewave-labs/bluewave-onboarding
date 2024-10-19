import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './TeamTable.module.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from '../../../../services/authProvider';

export default function TeamTable({ team, setRemoveModalOpen, setChangeRoleModalOpen, setSelectedMember }) {

  const { userInfo } = useAuth();

  const handleRemoveMember = async (member) => {
    setSelectedMember(()=>member)
    setRemoveModalOpen(()=>true);
  }

  const handleChangeRole = async (member, role) => {
    // setSelectedMember(()=>({...member, newRole: role}));
    // setChangeRoleModalOpen(()=>true)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.tableHeader}>
            <TableCell className={styles.heading}>NAME</TableCell>
            <TableCell className={styles.heading}>EMAIL</TableCell>
            <TableCell className={styles.heading}>ROLE</TableCell>
            <TableCell className={styles.heading}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.map((member, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" className={styles.nameCol}>
                {member.name}
                <span className={styles.data}>Created {member.createdAt}</span>
              </TableCell>
              <TableCell className={styles.data}>{member.email}</TableCell>
              <TableCell className={styles.data}>
                {member.role}
              </TableCell>
              <TableCell className={styles.data}>
                {member.role == "admin" && member.id!=userInfo.id && <RiDeleteBinLine style={{ fontSize: '20px', cursor: 'pointer', color: 'red' }} onClick={() => handleRemoveMember(member)} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
