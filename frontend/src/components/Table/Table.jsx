import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Popover, Checkbox, FormControlLabel
} from '@mui/material';
import { Tune, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
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
    employeeNo: false,
    employmentStatus: false,
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
      <Button variant="outlined" onClick={handleOpenPopover} className='customize-btn' startIcon={<Tune />}>
        Customize
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
          <ArrowBackIosNew />
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
          <ArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
