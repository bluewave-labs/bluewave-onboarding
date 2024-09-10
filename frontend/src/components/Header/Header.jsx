import React, { useState, useEffect } from 'react';
import './Header.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Avatar from './Avatar/Avatar';
import { getCurrentUser } from '../../services/loginServices';
import Cookies from 'js-cookie';

function Header({ }) {
    const initialFullName = Cookies.get('fullName') || 'John Doe';
    const initialRole = Cookies.get('role') || 'role';

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState({ fullName: initialFullName, role: initialRole });

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser();
            const fullName = userData.surname ? userData.name + " " + userData.surname : userData.name;
            setUser({ fullName, role: userData.role });
        };
        fetchUser();
    }, []);


    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="top-banner">
            <div className="logo">BlueWave Onboard</div>
            <div className="user-info">
                <Avatar src="/vendetta.png" alt="User" size="medium" />
                <div className="user-details">
                    <div className="user-name">{user.fullName}</div>
                    <div className="user-role">{user.role}</div>
                </div>
                <button className="dropdown-button" onClick={handleDropdownClick}>
                    {isDropdownOpen ? <>< KeyboardArrowUpIcon /><DropdownMenu /></> : <KeyboardArrowDownOutlinedIcon />}
                </button>
            </div>
        </div>
    );
}

export default Header;
