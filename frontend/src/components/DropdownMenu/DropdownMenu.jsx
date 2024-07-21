import React from 'react';
import { List, ListItemButton, ListItemText, Paper, ListItemIcon } from '@mui/material';
import './DropdownMenu.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/loginServices';

const DropdownMenu = () => {

    const navigate = useNavigate();
    const handleLogoutClick = async () => {
        const response = await logout();
        console.log('Logout successful:', response);
        window.location.reload();
        navigate('/');
    };

    return (
        <Paper className="dropdown-menu" elevation={3}>
            <List className='dropdown-list'>
                <ListItemButton className="dropdown-item">
                    <ListItemIcon>
                        <Person2OutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton className="dropdown-item">
                    <ListItemIcon>
                        <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton className="dropdown-item">
                    <ListItemIcon>
                        <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" onClick={handleLogoutClick}/>
                </ListItemButton>
            </List>
        </Paper>
    );
}

export default DropdownMenu;
