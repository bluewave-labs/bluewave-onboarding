import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Button/Button';
import styles from './DeleteConfirmationModal.module.scss';

const DeleteConfirmationModal = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-confirmation-modal"
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
    )
}

export default DeleteConfirmationModal;