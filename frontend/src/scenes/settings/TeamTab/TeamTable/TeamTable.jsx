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

const tableData = [
    { name: "John Connor", date: 'Created 10/4/2022', email: 'john@domain.com', role: 'Administrator', action: <RiDeleteBinLine style={{ fontSize: '20px' }} /> },
    { name: "Adam McFadden", date: 'Created 10/4/2022', email: 'adam@domain.com', role: 'Member', action: <RiDeleteBinLine style={{ fontSize: '20px' }} /> },
    { name: "Cris Cross", date: 'Created 10/4/2022', email: 'cris@domain.com', role: 'Member', action: <RiDeleteBinLine style={{ fontSize: '20px' }} /> },
    { name: "Prince", date: 'Created 10/4/2022', email: 'prince@domain.com', role: 'Member', action: <RiDeleteBinLine style={{ fontSize: '20px' }} /> }
];

export default function TeamTable({ team }) {
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
          {team.map((user, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" className={styles.nameCol}>
                {user.name}
                <span className={styles.data}>Created {user.createdAt}</span>
              </TableCell>
              <TableCell className={styles.data}>{user.email}</TableCell>
              <TableCell className={styles.data}>{user.role}</TableCell>
              <TableCell className={styles.data}>{user.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
