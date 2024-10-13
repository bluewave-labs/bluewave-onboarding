import React, { useState } from 'react';
import { useAuth } from '../../services/authProvider';
import Avatar from '../Avatar/Avatar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import styles from './UserProfileSidebar.module.css';

function UserProfileSidebar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { userInfo } = useAuth();

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={styles["user-info"]}>
            <div className={styles['user-details-container']}>
                <Avatar src={userInfo.picture || "/vendetta.png"} alt="User" size="medium" />
                <div className={styles["user-details"]}>
                    <div className={styles["user-name"]}>{userInfo?.fullName}</div>
                    <div className={styles["user-role"]}>{userInfo?.role}</div>
                </div>
            </div>
            <button className={styles["dropdown-button"]} onClick={handleDropdownClick}>
                {isDropdownOpen ? <>< KeyboardArrowUpIcon /><DropdownMenu /></> : <KeyboardArrowDownOutlinedIcon />}
            </button>
        </div>
    )
}

export default UserProfileSidebar;