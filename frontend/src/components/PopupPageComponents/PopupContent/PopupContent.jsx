import { React } from 'react';
import styles from './PopupContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import {ActionsNames, actionsOptions, ActionsTypes} from "../../../../../Shared/constants.js";

const PopupContent = ({ actionButtonText, setActionButtonText, setActionButtonUrl, buttonAction, actionButtonUrl, setButtonAction, buttonActionValue, setButtonActionValue }) => {
    const handleActionButtonText = (event) => {
        setActionButtonText(event.target.value);
      };
      const handleActionButtonUrl = (event) => {
        setActionButtonUrl(event.target.value);
      };
      const handleActionChange = (newAction) => {
          switch (newAction) {
              case ActionsNames.NO_ACTION:
                  setButtonAction(ActionsNames.NO_ACTION);
                  setButtonActionValue(ActionsTypes.NO_ACTION);
                  break;
              case ActionsNames.OPEN_URL:
                  setButtonAction(ActionsNames.OPEN_URL);
                  setButtonActionValue(ActionsTypes.OPEN_URL);
                  break;
              case ActionsNames.OPEN_URL_IN_NEW_TAB:
                  setButtonAction(ActionsNames.OPEN_URL_IN_NEW_TAB);
                  setButtonActionValue(ActionsTypes.OPEN_URL_IN_NEW_TAB);
                  break;
              default:
                  setButtonAction(ActionsNames.NO_ACTION);
                  setButtonActionValue(ActionsTypes.NO_ACTION);
          }
      };
    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList 
                actions={actionsOptions}
                onActionChange={handleActionChange}
                selectedActionString={buttonAction}
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
