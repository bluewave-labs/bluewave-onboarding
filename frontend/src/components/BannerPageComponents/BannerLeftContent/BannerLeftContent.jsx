import { React } from 'react';
import styles from './BannerLeftContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import { Radio, RadioGroup } from "@mui/material";
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';

const BannerLeftContent = ({ isTopPosition, setIsTopPosition, url, setUrl }) => {
    const handleSetUrl = (event) => {
        setUrl(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList actions={['No action', 'Open a URL', 'Open a URL in a new page']} />
            <h2>Position</h2>
            <RadioGroup onChange={(e) => { setIsTopPosition(e.target.value) }} value={isTopPosition}>
                <div className={styles.radioContent}>
                    <Radio value={true} />
                    <h3>Top (centered)</h3>
                </div>
                <div className={styles.radioContent}>
                    <Radio value={false} />
                    <h3>Bottom (centered)</h3>
                </div>
            </RadioGroup>
            <h2 style={{ marginBottom: 0 }}>URL</h2>
            <CustomTextField
                TextFieldWidth='241px'
                value={url}
                onChange={handleSetUrl} />
        </div>
    );
};

export default BannerLeftContent;
