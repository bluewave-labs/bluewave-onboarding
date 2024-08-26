import { React } from 'react';
import styles from './BannerLeftContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import { Radio, FormControlLabel } from "@mui/material";
import {RadioGroup} from '@mui/material';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import RadioButton from '../../RadioButton/RadioButton';

const BannerLeftContent = ({ setIsTopPosition, url, setUrl, setButtonAction }) => {
    const handleSetUrl = (event) => {
        setUrl(event.target.value);
    };
    const handleActionChange = (newAction) => {
        setButtonAction(newAction);
    };

    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList
                actions={['No action', 'Open URL', 'Open URL in a new tab']}
                onActionChange={handleActionChange}
            />
            <h2>Position</h2>

            {/* How the functionality should be */}
            <RadioGroup
                defaultValue="top"
                name="radio-buttons-group"
            >
                <FormControlLabel value="top" control={<Radio onClick={() => setIsTopPosition(true)}/>} label="Top" />
                <FormControlLabel value="bottom" control={<Radio onClick={() => setIsTopPosition(false)}/>} label="Bottom" />
            </RadioGroup>
            {/* How it should look */}
            <div className={styles.radioContent}>
                <Radio onClick={() => setIsTopPosition(true)} />
                <h3>Top (centered)</h3>
            </div>
            <div className={styles.radioContent}>
                <Radio onClick={() => setIsTopPosition(false)} />
                <h3>Bottom (centered)</h3>
            </div>
            {/* How it is right now */}
            <RadioButton name='top-bottom' label='top' onClick={() => setIsTopPosition(true)}/>
            <RadioButton name='top-bottom' label='bottom' onClick={() => setIsTopPosition(false)}/>

            <h2 style={{ marginBottom: 0 }}>URL</h2>
            <CustomTextField
                TextFieldWidth='241px'
                value={url}
                onChange={handleSetUrl} />
        </div>
    );
};

export default BannerLeftContent;
