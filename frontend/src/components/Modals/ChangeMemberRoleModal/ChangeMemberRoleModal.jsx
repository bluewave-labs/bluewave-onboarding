import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Button/Button';
import styles from './ChangeMemberRoleModal.module.scss';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import DropdownList from '../../DropdownList/DropdownList';

const ChangeMemberRoleModal = ({ open, handleClose, actions }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="invite-member-avatar-modal"
            aria-describedby="invite-member-description"
        >
            <Box className={styles.box}>
                
            </Box>
        </Modal>
    )
}

ChangeMemberRoleModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    actions: PropTypes.array.isRequired,
};

export default ChangeMemberRoleModal;