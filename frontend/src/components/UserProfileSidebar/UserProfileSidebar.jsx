import React, { useState } from 'react';
import { useAuth } from '../../services/authProvider';
import Avatar from '../Avatar/Avatar';
import DropdownMenu from '../DropdownMenu/DropdownMenu'; // Adjusted import
import styles from './UserProfileSidebar.module.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/loginServices';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';

function UserProfileSidebar() {
    const { userInfo, logoutAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await logout();
        logoutAuth();
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Logout successful');
        navigate('/');
    };

    const menuItems = [
        { text: 'Settings', icon: <SettingsOutlinedIcon />, onClick: () => navigate('/settings') },
        { text: 'Logout', icon: <LogoutOutlinedIcon />, onClick: handleLogoutClick },
    ];

    return (
        <div className={styles["user-info"]}>
            <div className={styles['user-details-container']}>
                <Avatar src={userInfo?.picture || "/vendetta.png"} alt="User" size="medium" />
                <div className={styles["user-details"]}>
                    <div className={styles["user-name"]}>{userInfo?.fullName}</div>
                    <div className={styles["user-role"]}>{userInfo?.role}</div>
                </div>
            </div>
            <DropdownMenu menuItems={menuItems} />
        </div>
    );
}

export default UserProfileSidebar;
