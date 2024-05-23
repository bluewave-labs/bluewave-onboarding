
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, TextField, InputAdornment, Divider, ListItemButton} from '@mui/material';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import './LeftMenu.css'; 
import { useNavigate } from 'react-router-dom';

function LeftMenu() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  
  return (
    <div className="left-menu">
      <List>

        <ListItemButton className="menu-item" style={{backgroundColor: "#F9FAFB"}} onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemText primary="SERVE A CONTENT" className="title"/>

        <ListItemButton className="menu-item">
          <ListItemIcon>
            <DirectionsBusFilledOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Tours" />
        </ListItemButton>

        <ListItemButton className="menu-item">
          <ListItemIcon>
            <TipsAndUpdatesOutlinedIcon /> 
          </ListItemIcon>
          <ListItemText primary="Hints" />
        </ListItemButton>
        <ListItemButton className="menu-item">
          <ListItemIcon>
            <ChecklistOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Checklist" />
        </ListItemButton>

        <ListItemText primary="MAKE AN ANNOUNCEMENT" className="title"/>

        <ListItemButton className="menu-item">
          <ListItemIcon>
            <SmsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Popups" />
        </ListItemButton>
        <ListItemButton className="menu-item">
          <ListItemIcon>
          <SportsSoccerOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Banners" />
        </ListItemButton>
        <ListItemButton className="menu-item">
          <ListItemIcon>
            <LinkOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Helper Links" />
        </ListItemButton>

        
        <ListItemText primary="GET FEEDBACK" className="title"/>

        <ListItemButton className="menu-item">
          <ListItemIcon>
            <MarkChatUnreadOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
        <ListItemButton className="menu-item">
          <ListItemIcon>
            <ListOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Surveys" />
        </ListItemButton>

      </List>
      <div className="bottom-menu">
      <Divider />
        <ListItemButton className="menu-item">
          <ListItemIcon>
            <SportsSoccerOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItemButton>
      </div>
    </div>
  );
}

export default LeftMenu;
