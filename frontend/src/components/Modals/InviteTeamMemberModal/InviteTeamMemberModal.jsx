import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Button/Button';
import styles from './InviteTeamMemberModal.module.scss';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import DropdownList from '../../DropdownList/DropdownList';

const InviteTeamMemberModal = ({ open, handleClose, actions }) => {

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
            onClose={handleClose}
            aria-labelledby="invite-member-avatar-modal"
            aria-describedby="invite-member-description"
        >
            <Box className={styles.box}>
                <form onSubmit={onSubmit}>
                    <p>Invite New Team Member</p>
                    <p id="invite-member-description">When you add a new team member, they will get access to all monitors.</p>
                    <CustomTextField
                        TextFieldWidth="100%"
                        style={{ marginBottom: '0.75rem' }}
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name='email'
                        type='email'
                        id='invite-member-email'
                        required
                    />
                    <DropdownList
                        name="role"
                        actions={actions}
                        onActionChange={handleActionChange}
                        selectedActionString={role}
                        className={styles.select} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button buttonType='secondary-grey' text='Cancel' onClick={handleClose} />
                            <Button type='submit' buttonType='' text='Send Invite' />
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

InviteTeamMemberModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    actions: PropTypes.array.isRequired,
};

export default InviteTeamMemberModal;