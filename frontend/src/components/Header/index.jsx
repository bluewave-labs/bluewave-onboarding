import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Popover, MenuItem, Divider, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './headerStyles.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <AppBar position="static" style={{ backgroundColor: 'white' }} className='nav'>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }} className='logo-main'>
          BlueWave HR
        </Typography>
        <Box display="flex" alignItems="center">
          <Button
            color="inherit"
            onClick={handleClick}
            style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start" mr={1}>
              <span>Gorkem Cetin</span>
              <span style={{ fontSize: '0.8em' }}>Administrator</span>
            </Box>
            <ArrowDropDownIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>
              <AccountCircleIcon style={{ marginRight: '8px' }} />
              View Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SettingsIcon style={{ marginRight: '8px' }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <BusinessIcon style={{ marginRight: '8px' }} />
              Company Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <GroupIcon style={{ marginRight: '8px' }} />
              Team
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <PersonAddIcon style={{ marginRight: '8px' }} />
              Invite Colleagues
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ExitToAppIcon style={{ marginRight: '8px' }} />
              Logout
            </MenuItem>
          </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
