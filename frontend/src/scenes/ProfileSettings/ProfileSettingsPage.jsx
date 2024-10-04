import HomePageTemplate from '../../templates/HomePageTemplate/HomePageTemplate';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import BannerLeftContent from '../../components/BannerPageComponents/BannerLeftContent/BannerLeftContent';
import BannerLeftAppearance from '../../components/BannerPageComponents/BannerLeftAppearance/BannerLeftApperance';
import { React, useState, useEffect } from 'react';
import BannerPreview from '../../components/BannerPageComponents/BannerPreview/BannerPreview';
import { addBanner, getBannerById, editBanner } from '../../services/bannerServices';
import { useNavigate, useLocation } from 'react-router-dom';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';
import { emitToastError } from '../../utils/guideHelpers'
import styles from './ProfileSettings.module.scss';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import { TextField, InputLabel, Divider } from "@mui/material";
import Avatar from '../../components/Avatar/Avatar';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};

const ProfileSettingsPage = ({ title = '', leftContent = () => null, rightContent = () => null, leftAppearance = () => null, onSave = () => null }) => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(0);
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                                            <Avatar />
                                            <Button buttonType='secondary-grey' variant='contained' text='Delete' onClick={onSave} />
                                            <Button buttonType='secondary-grey' variant='contained' text='Update' onClick={onSave} />
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
                                    <Button onClick={handleOpen} buttonType='error' variant='contained' text='Delete Account' />
                                </div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className={styles.modalBox}>
                                        <h3>Really Delete this account ?</h3>
                                        <p>If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable action.</p>
                                        <div style={{ display: 'flex', width: '100%', gap: '1rem', justifyContent: 'flex-end' }}>
                                            <Button onClick={handleClose} buttonType='secondary-grey' variant='contained' text='Cancel' />
                                            <Button buttonType='error' variant='contained' text='Delete Account' />
                                        </div>
                                    </Box>
                                </Modal>

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
