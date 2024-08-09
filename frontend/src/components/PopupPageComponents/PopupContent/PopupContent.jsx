import { React } from 'react';
import styles from './PopupContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';

const PopupContent = ({ actionButtonText, setActionButtonText, setActionButtonUrl, actionButtonUrl }) => {
    const handleActionButtonText = (event) => {
        setActionButtonText(event.target.value);
      };
      const handleActionButtonUrl = (event) => {
        setActionButtonUrl(event.target.value);
      };
    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList actions={['No action', 'Open a URL', 'Open a URL in a new page']} />
            <h2 style={{ marginBottom: 0 }}>Action button url (can be relative)</h2>
            <CustomTextField TextFieldWidth='241px'
                value={actionButtonUrl}
                onChange={handleActionButtonUrl} />
            <h2 style={{ marginBottom: 0 }}>Action button text</h2>
            <CustomTextField TextFieldWidth='241px'
                value={actionButtonText}
                onChange={handleActionButtonText} />
        </div>
    );
};

export default PopupContent;
