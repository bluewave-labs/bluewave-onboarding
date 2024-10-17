import React, {useEffect, useState} from 'react';
import styles from './PopupContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import {ACTIONS_Names, ACTIONS_Options, ACTIONS_TYPES} from "../../../utils/constants.js";

const PopupContent = ({ actionButtonText, setActionButtonText, setActionButtonUrl, buttonAction, actionButtonUrl, setButtonAction }) => {
    const [buttonActionName, setButtonActionName] = useState(ACTIONS_Names.NO_ACTION);
    useEffect(() => {
        const actionTypeKey = Object.keys(ACTIONS_TYPES).find(key => ACTIONS_TYPES[key] === buttonAction)
        if (actionTypeKey) {
            setButtonActionName(ACTIONS_Names[actionTypeKey]);
        } else {
            setButtonActionName(ACTIONS_Names.NO_ACTION);
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
          const actionTypeKey = Object.keys(ACTIONS_Names).find(key => ACTIONS_Names[key] === selectedAction);
          setButtonAction(ACTIONS_TYPES[actionTypeKey] || ACTIONS_TYPES.NO_ACTION);
      }
    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList
                actions={ACTIONS_Options}
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
