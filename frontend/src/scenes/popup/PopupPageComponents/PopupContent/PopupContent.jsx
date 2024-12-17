import { React } from 'react';
import styles from './PopupContent.module.scss';
import DropdownList from '@components/DropdownList/DropdownList';
import CustomTextField from '@components/TextFieldComponents/CustomTextField/CustomTextField';

const PopupContent = ({
  actionButtonText,
  buttonAction,
  actionButtonUrl,
  updatePopupStates,
}) => {
  const handleActionButtonText = (event) => {
    updatePopupStates("actionButtonText", event.target.value);
  };
  const handleActionButtonUrl = (event) => {
    updatePopupStates("actionButtonUrl", event.target.value);
  };
  const handleActionChange = (newAction) => {
    if (newAction !== buttonAction) {
      updatePopupStates("buttonAction", newAction);
    }
  };
  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: "8px" }}>Action</h2>
      <DropdownList
        actions={["No action", "Open URL", "Open URL in a new tab"]}
        onActionChange={handleActionChange}
        selectedActionString={buttonAction}
      />
      <h2 style={{ marginBottom: 0 }}>Action button url (can be relative)</h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={actionButtonUrl}
        onChange={handleActionButtonUrl}
      />
      <h2 style={{ marginBottom: 0 }}>Action button text</h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={actionButtonText}
        onChange={handleActionButtonText}
      />
    </div>
  );
};

export default PopupContent;
