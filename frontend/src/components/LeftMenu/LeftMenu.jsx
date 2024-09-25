import React from 'react';
import { List, ListItemIcon, ListItemText, Divider, ListItemButton } from '@mui/material';
import {
  DirectionsBusFilledOutlined as DirectionsBusIcon,
  HomeOutlined as HomeIcon,
  SportsSoccerOutlined as SportsIcon,
  TipsAndUpdatesOutlined as TipsIcon,
  ChecklistOutlined as ChecklistIcon,
  SmsOutlined as SmsIcon,
  LinkOutlined as LinkIcon,
  ListOutlined as ListIcon,
  MarkChatUnreadOutlined as ChatIcon,
} from '@mui/icons-material';
import './LeftMenu.css';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, route: '/' },
  { text: 'SERVE A CONTENT', title: true },
  { text: 'Tours', icon: <DirectionsBusIcon />, route: '/tour' },
  { text: 'Hints', icon: <TipsIcon />, route: '/hint' },
  { text: 'Checklist', icon: <ChecklistIcon /> },
  { text: 'MAKE AN ANNOUNCEMENT', title: true },
  { text: 'Popups', icon: <SmsIcon />, route: '/popup'},
  { text: 'Banners', icon: <SportsIcon /> , route: '/banner'},
  { text: 'Helper Links', icon: <LinkIcon /> , route: '/link'},
  { text: 'GET FEEDBACK', title: true },
  { text: 'Feedback', icon: <ChatIcon /> },
  { text: 'Surveys', icon: <ListIcon /> },
];

function LeftMenu() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route) navigate(route);
  };

  return (
    <div className="left-menu">
      <List>
        {menuItems.map((item, index) => (
          item.title ? (
            <ListItemText key={index} primary={item.text} className="title" />
          ) : (
            <ListItemButton
              key={index}
              className="menu-item"
              onClick={() => handleNavigation(item.route)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )
        ))}
      </List>
      <div className="bottom-menu">
        <Divider />
        <ListItemButton className="menu-item">
          <ListItemIcon>
            <SportsIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItemButton>
      </div>
    </div>
  );
}

export default LeftMenu;
