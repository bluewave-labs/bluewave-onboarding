import React, {useEffect, useState} from 'react';
import styles from './PopupContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import constants from "../../../../../shared/constants.json";
import {ACTIONS_OPTIONS} from "../../../utils/constants.js";

const PopupContent = ({ actionButtonText, setActionButtonText, setActionButtonUrl, buttonAction, actionButtonUrl, setButtonAction }) => {
    const [buttonActionName, setButtonActionName] = useState(constants.ACTIONS_NAMES.NO_ACTION);
    useEffect(() => {
        const actionTypeKey = Object.keys(constants.ACTIONS_TYPES).find(key => constants.ACTIONS_TYPES[key] === buttonAction)
        if (actionTypeKey) {
            setButtonActionName(constants.ACTIONS_NAMES[actionTypeKey]);
        } else {
            setButtonActionName(constants.ACTIONS_NAMES.NO_ACTION);
        }
    }, [buttonAction]);
    const handleActionButtonText = (event) => {
        setActionButtonText(event.target.value);
      };
      const handleActionButtonUrl = (event) => {
        setActionButtonUrl(event.target.value);
      };
      const handleActionChange = (newAction) => {
          setButtonActionName(newAction);
          setButtonActionWithValue(newAction);
      };

      const setButtonActionWithValue = (selectedAction) => {
          const actionTypeKey = Object.keys(constants.ACTIONS_NAMES).find(key => constants.ACTIONS_NAMES[key] === selectedAction);
          setButtonAction(constants.ACTIONS_TYPES[actionTypeKey] || constants.ACTIONS_TYPES.NO_ACTION);
      }
    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList
                actions={ACTIONS_OPTIONS}
                onActionChange={handleActionChange}
                selectedActionString={buttonActionName}
            />
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
