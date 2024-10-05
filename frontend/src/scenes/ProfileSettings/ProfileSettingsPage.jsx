import { React, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettings.module.scss';
import classNames from 'classnames';
import Profile from '../../components/Profile/Profile';


const ProfileSettingsPage = ({ title = '', leftContent = () => null, rightContent = () => null, leftAppearance = () => null, onSave = () => null }) => {
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
                    {/* Content and Appereance buttons */}
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
                    {activeButton == 0 && <Profile onSave={onSave}/>}
                    <div className={styles.leftRightContent}>
                        {activeButton === 1 ? leftAppearance() : leftContent()}
                        {rightContent()}
                    </div>
                    {/* <div className={styles.optionButtons}>
                        <Button text='Cancel' buttonType='secondary-grey' onClick={() => { navigate('/'); }} />
                        <Button text='Save' onClick={onSave} />
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default ProfileSettingsPage;
