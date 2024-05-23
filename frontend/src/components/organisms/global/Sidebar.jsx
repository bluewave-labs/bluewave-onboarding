import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, BarChart, Settings } from '@mui/icons-material';

const Sidebar = () => {
    return (
        <List >
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
    );
};

export default Sidebar;
