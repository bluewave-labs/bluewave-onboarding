import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    BlueWave HR
                </Typography>
                <Button color="inherit">Gorkem Cetin</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;