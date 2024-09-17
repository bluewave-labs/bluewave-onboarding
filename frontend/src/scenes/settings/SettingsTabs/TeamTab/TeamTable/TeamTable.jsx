import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './TeamTable.css'
import { RiDeleteBinLine } from "react-icons/ri";

const tableData = [
    {name: "John Connor", date: 'Created 10/4/2022', email: 'john@domain.com', role:'Administrator', action: <RiDeleteBinLine/> },
    {name: "Adam McFadden", date: 'Created 10/4/2022', email: 'adam@domain.com', role:'Member', action: <RiDeleteBinLine /> },
    {name: "Cris Cross", date: 'Created 10/4/2022', email: 'cris@domain.com', role:'Member', action: <RiDeleteBinLine /> },
    {name: "Prince", date: 'Created 10/4/2022', email: 'prince@domain.com', role:'Member', action: <RiDeleteBinLine /> }
]

export default function TeamTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow className='tableHeader'>
            <TableCell className='heading'>NAME</TableCell>
            <TableCell className='heading'>EMAIL</TableCell>
            <TableCell className='heading'>ROLE</TableCell>
            <TableCell className='heading'>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {tableData.map(data => (
                <TableRow>
                <TableCell component="th" scope="row" className='nameCol'>
                  {data.name}
                  <span className='data'>{data.date}</span>
                </TableCell>
                <TableCell className='data'>{data.email}</TableCell>
                <TableCell className='data'>{data.role}</TableCell>
                <TableCell className='data'>{data.action}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
