import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, TextField, Autocomplete, Box, Chip } from '@mui/material';
import { Home, BarChart, Settings } from '@mui/icons-material';
import { demoData } from '../../data/demoData';
import './SidebarStyles.css';


const Sidebar = () => {
    const [selectedItems, setSelectedItems] = useState([]);
  
    return (
      <Box>
        <Autocomplete
          multiple
          id="search-box"
          options={demoData}
          getOptionLabel={(option) => option.name}
          value={selectedItems}
          onChange={(event, newValue) => {
            setSelectedItems(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search"
              className='dropDown_search'
            />
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
                key={option.id}
              />
            ))
          }
          disableCloseOnSelect
          popupIcon={null}
        />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Popups" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Box>
    );
  };
  
  export default Sidebar;