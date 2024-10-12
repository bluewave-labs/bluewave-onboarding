import { React, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Button/Button';
import styles from './InviteTeamMemberModal.module.scss';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import DropdownList from '../../DropdownList/DropdownList';

const InviteTeamMemberModal = ({ open, handleClose }) => {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

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
        >
            <Box className={styles.box}>
                <form onSubmit={onSubmit}>
                    <p>Invite New Team Member</p>
                    <p>When you add a new team member, they will get access to all monitors.</p>
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
                        actions={['User', 'Admin']}
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

export default InviteTeamMemberModal;