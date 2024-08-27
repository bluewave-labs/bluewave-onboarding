import React, { useState } from 'react';
import styles from './BannerLeftContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import RadioButton from '../../RadioButton/RadioButton';

const BannerLeftContent = ({ setIsTopPosition, url, setUrl, setButtonAction }) => {
    const [position, setPosition] = useState('top');
    const handleSetUrl = (event) => {
        setUrl(event.target.value);
    };

    const handleActionChange = (newAction) => {
        setButtonAction(newAction);
    };

    const handlePositionChange = (newPosition) => {
        setPosition(newPosition);
        setIsTopPosition(newPosition === 'top');
    };

    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList
                actions={['No action', 'Open URL', 'Open URL in a new tab']}
                onActionChange={handleActionChange}
            />
            <h2>Position</h2>
            <div className={styles.radioContent}>
                <RadioButton
                    id="top-centered-position"
                    name="position"
                    value="top-centered"
                    label="Top (centered)"
                    checked={position === 'top'}
                    onChange={() => handlePositionChange('top')}
                />
            </div>
            <div className={styles.radioContent}>
                <RadioButton
                    id="bottom-centered-position"
                    name="position"
                    value="bottom-centered"
                    label="Bottom (centered)"
                    checked={position === 'bottom'}
                    onChange={() => handlePositionChange('bottom')}
                />
            </div>

            <h2 style={{ marginBottom: 0 }}>URL</h2>
            <CustomTextField
                TextFieldWidth="241px"
                value={url}
                onChange={handleSetUrl}
            />
        </div>
    );
};

export default BannerLeftContent;
