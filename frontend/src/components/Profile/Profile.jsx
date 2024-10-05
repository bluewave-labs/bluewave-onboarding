import { React, useState } from 'react';
import Button from '../../components/Button/Button';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';
import { InputLabel, Divider } from "@mui/material";
import Avatar from '../../components/Avatar/Avatar';
import DeleteConfirmationModal from '../../components/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import UploadModal from '../../components/Modals/UploadImageModal/UploadModal';
import styles from './Profile.module.scss';

const Profile = ({ onSave }) => {

    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false);
    const handleOpenDeleteConfirmationModal = () => setOpenDeleteConfirmationModal(true);
    const handleCloseDeleteConfirmationModal = () => setOpenDeleteConfirmationModal(false);

    const [openUploadModal, setOpenUploadModal] = useState(false);
    const handleOpenUploadModal = () => setOpenUploadModal(true);
    const handleCloseUploadModal = () => setOpenUploadModal(false);

    return (
        <form className={styles.profileContainer}>
            <div className={styles.textFieldContainer}>
                <CustomTextField TextFieldWidth="100%" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }} labelText='First Name' />
                <CustomTextField TextFieldWidth="100%" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }} labelText='Last Name' />
                <CustomTextField labelSubText="This is your current email address — it cannot be changed." TextFieldWidth="100%" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }} labelText='Email' />
                {/* Change Avatar Field */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center', marginTop: '1rem' }}>
                    <div>
                        <InputLabel sx={{ fontWeight: '600', margin: 0 }}>Your Photo</InputLabel>
                        <InputLabel sx={{ fontWeight: '400', fontSize: '13px', margin: 0 }}>This photo will be displayed in your profile page.</InputLabel>
                    </div>
                    <div className={styles.avatarContainer}>
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
        </form>
    )
}

export default Profile;