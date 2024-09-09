import React from 'react';
import { List, ListItemButton, ListItemText, Paper, ListItemIcon } from '@mui/material';
import './DropdownMenu.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/loginServices';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../../utils/toastEmitter';

const DropdownMenu = () => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await logout();
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Logout successfull');
        window.location.reload(); // TODO: should remove reload func
        navigate('/');
    };

    const menuItems = [
        { text: 'Profile', icon: <Person2OutlinedIcon /> },
        { text: 'Settings', icon: <SettingsOutlinedIcon /> },
        { text: 'Logout', icon: <LogoutOutlinedIcon />, onClick: handleLogoutClick },
    ];

    return (
        <Paper className="dropdown-menu" elevation={3}>
            <List className="dropdown-list">
                {menuItems.map(({ text, icon, onClick }, index) => (
                    <ListItemButton key={index} className="dropdown-item" onClick={onClick}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default DropdownMenu;
