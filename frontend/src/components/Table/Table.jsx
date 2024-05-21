import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Popover, Checkbox, FormControlLabel } from '@mui/material';
import './TableStyles.css';

const DataTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filterOptions, setFilterOptions] = useState({
    name: true,
    status: true,
    role: true,
    team: true,
    hireDate: true,
    employeeNo: false,        // Changed to false
    employmentStatus: false,  // Changed to false
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const filteredData = data;

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const displayData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const pageNumbers = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="tableContainer">
      <div className="companyHeading">
        Company Members 
        <span className="totalEntriesCircle"> {data.length}</span>
      </div>
      <Button variant="outlined" onClick={handleOpenPopover} className='customize-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2.25 6L11.25 6M11.25 6C11.25 7.24264 12.2574 8.25 13.5 8.25C14.7426 8.25 15.75 7.24264 15.75 6C15.75 4.75736 14.7426 3.75 13.5 3.75C12.2574 3.75 11.25 4.75736 11.25 6ZM6.75 12L15.75 12M6.75 12C6.75 13.2426 5.74264 14.25 4.5 14.25C3.25736 14.25 2.25 13.2426 2.25 12C2.25 10.7574 3.25736 9.75 4.5 9.75C5.74264 9.75 6.75 10.7574 6.75 12Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> Customize
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className="popoverContent">
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.name}
                onChange={handleFilterChange}
                name="name"
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.status}
                onChange={handleFilterChange}
                name="status"
              />
            }
            label="Status"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.role}
                onChange={handleFilterChange}
                name="role"
              />
            }
            label="Role"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.team}
                onChange={handleFilterChange}
                name="team"
              />
            }
            label="Team"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.hireDate}
                onChange={handleFilterChange}
                name="hireDate"
              />
            }
            label="Hire Date"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.employeeNo}
                onChange={handleFilterChange}
                name="employeeNo"
              />
            }
            label="Employee No"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterOptions.employmentStatus}
                onChange={handleFilterChange}
                name="employmentStatus"
              />
            }
            label="Employment Status"
          />
        </div>
      </Popover>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead className='tableHeadRow'>
            <TableRow>
              {filterOptions.name && <TableCell className='tableCell'>Name</TableCell>}
              {filterOptions.status && <TableCell className='tableCell'>Status</TableCell>}
              {filterOptions.role && <TableCell className='tableCell'>Role</TableCell>}
              {filterOptions.team && <TableCell className='tableCell'>Team</TableCell>}
              {filterOptions.hireDate && <TableCell className='tableCell'>Hire Date</TableCell>}
              {filterOptions.employeeNo && <TableCell className='tableCell'>Employee No</TableCell>}
              {filterOptions.employmentStatus && <TableCell className='tableCell'>Employment Status</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map(row => (
              <TableRow key={row.id}>
                {filterOptions.name && <TableCell className='tableCell'>{row.name}</TableCell>}
                {filterOptions.status && <TableCell className='tableCell'>{row.status}</TableCell>}
                {filterOptions.role && <TableCell className='tableCell'>{row.role}</TableCell>}
                {filterOptions.team && <TableCell className='tableCell'>{row.team}</TableCell>}
                {filterOptions.hireDate && <TableCell className='tableCell'>{row.hireDate}</TableCell>}
                {filterOptions.employeeNo && <TableCell className='tableCell'>{row.employeeNo}</TableCell>}
                {filterOptions.employmentStatus && <TableCell className='tableCell'>{row.employmentStatus}</TableCell>}
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
            <path d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
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
            <path d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DataTable;
