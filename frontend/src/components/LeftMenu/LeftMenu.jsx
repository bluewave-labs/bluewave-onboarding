import React, { useState } from 'react';
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
import Logo from '../Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authProvider';
import Avatar from '../Avatar/Avatar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, route: '/' },
  { text: 'SERVE A CONTENT', title: true },
  { text: 'Tours', icon: <DirectionsBusIcon />, route: '/tour' },
  { text: 'Hints', icon: <TipsIcon />, route: '/hint' },
  { text: 'Checklist', icon: <ChecklistIcon /> },
  { text: 'MAKE AN ANNOUNCEMENT', title: true },
  { text: 'Popups', icon: <SmsIcon />, route: '/popup' },
  { text: 'Banners', icon: <SportsIcon />, route: '/banner' },
  { text: 'Helper Links', icon: <LinkIcon />, route: '/link' },
  { text: 'GET FEEDBACK', title: true },
  { text: 'Feedback', icon: <ChatIcon /> },
  { text: 'Surveys', icon: <ListIcon /> },
];

function LeftMenu() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route) navigate(route);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo } = useAuth();

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="left-menu">
      <Logo isSidebar={true} />
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
      <div className="user-info">
        <div className='user-details-container'>
          <Avatar src="/vendetta.png" alt="User" size="medium" />
          <div className="user-details">
            <div className="user-name">{userInfo.fullName}</div>
            <div className="user-role">{userInfo.role}</div>
          </div>
        </div>
        <button className="dropdown-button" onClick={handleDropdownClick}>
          {isDropdownOpen ? <>< KeyboardArrowUpIcon /><DropdownMenu /></> : <KeyboardArrowDownOutlinedIcon />}
        </button>
      </div>
    </div>
  );
}

export default LeftMenu;
