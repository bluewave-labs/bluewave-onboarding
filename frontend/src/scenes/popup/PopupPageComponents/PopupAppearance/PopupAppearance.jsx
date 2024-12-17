import { React } from 'react';
import styles from './PopupAppearance.module.scss';
import ColorTextField from '@components/ColorTextField/ColorTextField';
import DropdownList from '@components/DropdownList/DropdownList';

const PopupAppearance = ({ data = [], popupSize, updatePopupStates }) => {
    const handleActionChange = (newAction) => {
        if (newAction) {
            updatePopupStates("popupSize", newAction.toLowerCase());  
      };
    };
    return (
        <div className={styles.container}>
            {data.map(({ stateName, state, setState }) => (
                <div key={stateName}>
                    <h2>{stateName}</h2>
                    <div className={styles.color}>
                        <ColorTextField
                            value={state}
                            onChange={setState}
                        />
                    </div>
                </div>
            ))}
            <h2 style={{ marginBottom: '1rem' }}>Popup Size</h2>
            <DropdownList
                actions={['Small', 'Medium', 'Large']}
                onActionChange={handleActionChange} 
                selectedActionString={popupSize}/>
        </div>
    );
};

export default PopupAppearance;
