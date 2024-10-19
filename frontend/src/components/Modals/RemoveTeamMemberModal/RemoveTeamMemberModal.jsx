import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Button/Button';
import styles from './RemoveTeamMemberModal.module.scss';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import DropdownList from '../../DropdownList/DropdownList';

const RemoveTeamMemberModal = ({ open, setModalOpen, actions }) => {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState(actions?.[0]?.value || '');

    const handleActionChange = (role) => {
        setRole(role);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // post formData
    }


    return (
        <Modal
            open={open}
            onClose={() => setModalOpen(false)}
            aria-labelledby="invite-member-avatar-modal"
            aria-describedby="invite-member-description"
        >
            <Box className={styles.box}>
                <form onSubmit={onSubmit}>
                <h3 id="delete-modal-title">Really Delete this account ?</h3>
                <p id="delete-modal-description">If you delete this account, they will no longer be able to sign in. Deleting your account is permanent and non-recoverable action.</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button buttonType='secondary-grey' text='Cancel' onClick={() => setModalOpen(false)} />
                            <Button type='submit' buttonType='' text='Send Invite' />
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

RemoveTeamMemberModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    actions: PropTypes.array.isRequired,
};

export default RemoveTeamMemberModal;