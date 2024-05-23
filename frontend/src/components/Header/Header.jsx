import React, { useState } from 'react';
import './Header.css'; 
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Header({ user }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="top-banner">
            <div className="logo">BlueWave Onboard</div>
            <div className="user-info">
                <img src="/vendetta.png" alt="User" className="user-picture" />
                <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-role">{user.role}</div>
                </div>
                <button className="dropdown-button" onClick={handleDropdownClick}>
                {isDropdownOpen ? <KeyboardArrowUpIcon /> : <><KeyboardArrowDownOutlinedIcon /><DropdownMenu /></>}
                </button>
            </div>
        </div>
    );
}

export default Header;
