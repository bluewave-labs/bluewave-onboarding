import React from 'react';
import CreateActivityButton from '../CreateActivityButton/CreateActivityButton';
import styles from './CreateActivityButtonList.module.scss'

const CreateActivityButtonList = ({ buttons }) => {
    return (
        <div className={styles.activityButtons}>
            {buttons.map((button, index) => (
                <CreateActivityButton 
                    key={index}
                    placeholder={button.placeholder}
                    onButtonClick={button.onClick}
                />
            ))}
        </div>
    );
};

export default CreateActivityButtonList;
