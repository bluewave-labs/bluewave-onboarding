import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettings.module.scss';
import classNames from 'classnames';
import Profile from '../../components/Profile/Profile';


const ProfileSettingsPage = ({ onSave = () => null }) => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(0);
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };


    const buttons = ['Profile', 'Password', 'Team'];

    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.content}>
                    {/* Profile, Password, Team tabs */}
                    <div className={styles.buttons}>
                        {buttons.map((buttonName, index) => (
                            <button
                                key={index}
                                className={classNames(styles.menuButton, {
                                    [styles.active]: activeButton === index,
                                })}
                                onClick={() => handleButtonClick(index)}
                            >
                                {buttonName}
                            </button>
                        ))}
                    </div>
                    {activeButton == 0 && <Profile onSave={onSave} />}
                </div>
            </div>

        </div>
    );
};

export default ProfileSettingsPage;
