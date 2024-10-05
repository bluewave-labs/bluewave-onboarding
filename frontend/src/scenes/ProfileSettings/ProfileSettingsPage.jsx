import { React, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettings.module.scss';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import { InputLabel, Divider } from "@mui/material";
import Avatar from '../../components/Avatar/Avatar';
import DeleteConfirmationModal from '../../components/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import UploadModal from '../../components/Modals/UploadImageModal/UploadModal';


const ProfileSettingsPage = ({ title = '', leftContent = () => null, rightContent = () => null, leftAppearance = () => null, onSave = () => null }) => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(0);
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false);
    const handleOpenDeleteConfirmationModal = () => setOpenDeleteConfirmationModal(true);
    const handleCloseDeleteConfirmationModal = () => setOpenDeleteConfirmationModal(false);

    const [openUploadModal, setOpenUploadModal] = useState(false);
    const handleOpenUploadModal = () => setOpenUploadModal(true);
    const handleCloseUploadModal = () => setOpenUploadModal(false);

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
                    {activeButton == 0 &&
                        (
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '20px', gap: '2rem' }}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <CustomTextField TextFieldWidth="100%" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }} labelText='First Name' />
                                    <CustomTextField TextFieldWidth="100%" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }} labelText='Last Name' />
                                    <CustomTextField labelSubText="This is your current email address — it cannot be changed." TextFieldWidth="100%" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }} labelText='Email' />
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }}>
                                        <div>
                                            <InputLabel sx={{ fontWeight: '600', margin: 0 }}>Your Photo</InputLabel>
                                            <InputLabel sx={{ fontWeight: '400', fontSize: '13px', margin: 0 }}>This photo will be displayed in your profile page.</InputLabel>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <Avatar src='/vendetta.png' />
                                            <Button buttonType='secondary-grey' variant='contained' text='Delete' onClick={onSave} />
                                            <Button buttonType='secondary-grey' variant='contained' text='Update' onClick={handleOpenUploadModal} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.optionButtons}>
                                    <Button text='Save' onClick={onSave} />
                                </div>
                                <Divider />
                                <div>
                                    <h3>Delete Account</h3>
                                    <p>Note that deleting your account will remove all data from our system. This is permanent and non-recoverable.</p>
                                    <Button onClick={handleOpenDeleteConfirmationModal} buttonType='error' variant='contained' text='Delete Account' />
                                </div>
                                <UploadModal
                                    open={openUploadModal}
                                    handleClose={handleCloseUploadModal}
                                />
                                <DeleteConfirmationModal
                                    open={openDeleteConfirmationModal}
                                    handleClose={handleCloseDeleteConfirmationModal}
                                />
                            </div>

                        )
                    }
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
