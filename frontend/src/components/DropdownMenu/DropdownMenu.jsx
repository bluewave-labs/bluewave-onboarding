import React from 'react';
import { List, ListItemButton, ListItemText, Paper, ListItemIcon } from '@mui/material';
import './DropdownMenu.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/loginServices';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';
import { useAuth } from '../../services/authProvider';

const DropdownMenu = () => {
    const navigate = useNavigate();
    const { logoutAuth } = useAuth();

    const handleNavigation = () => {
        navigate("/profile-settings");
    };

    const handleLogoutClick = async () => {
        await logout();
        logoutAuth();
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Logout successful');
        navigate('/');
    };

    const menuItems = [
        { text: 'Profile', icon: <Person2OutlinedIcon />, onClick: handleNavigation },
        { text: 'Settings', icon: <SettingsOutlinedIcon />, onClick: handleNavigation },
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
