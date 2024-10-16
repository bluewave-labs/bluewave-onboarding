import React, {useEffect, useState} from 'react';
import styles from './PopupContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import {ActionsNames, actionsOptions, ActionsTypes} from "../../../../../Shared/constants.js";

const PopupContent = ({ actionButtonText, setActionButtonText, setActionButtonUrl, buttonAction, actionButtonUrl, setButtonAction }) => {
    const [buttonActionName, setButtonActionName] = useState(ActionsNames.NO_ACTION);
    useEffect(() => {
        const actionTypeKey = Object.keys(ActionsTypes).find(key => ActionsTypes[key] === buttonAction)
        setButtonActionName(ActionsNames[actionTypeKey]);
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
          switch (selectedAction) {
              case ActionsNames.NO_ACTION:
                  setButtonAction(ActionsTypes.NO_ACTION);
                  break;
              case ActionsNames.OPEN_URL:
                  setButtonAction(ActionsTypes.OPEN_URL);
                  break;
              case ActionsNames.OPEN_URL_IN_NEW_TAB:
                  setButtonAction(ActionsTypes.OPEN_URL_IN_NEW_TAB);
                  break;
              default:
                  setButtonAction(ActionsTypes.NO_ACTION);
          }
      }
    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList 
                actions={actionsOptions}
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
