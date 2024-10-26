import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../../../components/Button/Button';
import styles from './DeleteConfirmationModal.module.scss';

const DeleteConfirmationModal = ({ open, handleClose, handleDelete }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <Box className={styles.modalBox}>
                <h3 id="delete-modal-title">Really Delete this account ?</h3>
                <p id="delete-modal-description">If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable action.</p>
                <div style={{ display: 'flex', width: '100%', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Button onClick={handleClose} buttonType='secondary-grey' variant='contained' text='Cancel' />
                    <Button onClick={handleDelete} buttonType='error' variant='contained' text='Delete Account' />
                </div>
            </Box>
        </Modal>
    )
}

export default DeleteConfirmationModal;