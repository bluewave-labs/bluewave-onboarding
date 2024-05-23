import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import './TableStyles.css';

const DataTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  if (!data) {
    return null;
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const displayData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const pageNumbers = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="tableContainer">
      <div className="companyHeading">
        Company Members 
        <span className="totalEntriesCircle"> {data.length}</span>
        
      </div>
      <TextField className='searchBox'
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead className='tableHeadRow'>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Hire Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.team}</TableCell>
                <TableCell>{row.hireDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="paginationContainer">
        <button className="direct_buttons"
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675" stroke="#344054" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Previous
        </button>
        <div className="paginationNumbers">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleChangePage(pageNumber)}
              disabled={pageNumber === page}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <button className="direct_buttons"
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= pageCount - 1}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334" stroke="#344054" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DataTable;
