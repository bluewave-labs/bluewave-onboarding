import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, TextField, Autocomplete, Box, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { demoData } from '../../data/demoData';
import './SidebarStyles.css';

const Sidebar = () => {
    const [selectedItems, setSelectedItems] = useState([]);
  
    return (
      <Box>
        <div className='sidebar'>
          <Autocomplete
            className='dropDown_search'
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
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: '#344054' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People" sx={{ color: '#344054' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Time Off" sx={{ color: '#344054' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Company" sx={{ color: '#344054' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reporting" sx={{ color: '#344054' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: '#344054' }} />
            </ListItemButton>
          </List>
        </div>
      </Box>
    );
};

export default Sidebar;
