import { React } from 'react';
import styles from './BannerLeftApperance.module.scss';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import CircleIcon from '@mui/icons-material/Circle';

const BannerLeftAppearance = ({ backgroundColor, setBackgroundColor, fontColor, setFontColor }) => {
    const handleFontColor = (event) => {
        let newText = event.target.value;
        if (!newText.startsWith('#')) {
            newText = '#' + newText;
        }
        setFontColor(newText);
    };

    const handleBackgroundColor = (event) => {
        let newText = event.target.value;
        if (!newText.startsWith('#')) {
            newText = '#' + newText;
        }
        setBackgroundColor(newText);
    };

    return (
        <div className={styles.container}>
            <h2>Background Color</h2>
            <div className={styles.color}>
                <CustomTextField
                    TextFieldWidth="100%"
                    value={backgroundColor}
                    onChange={handleBackgroundColor}
                    placeholder="Enter a background color"
                />
                <CircleIcon style={{ fontSize: '24px', color: backgroundColor }} />
            </div>
            <h2>Font Color</h2>
            <div className={styles.color}>
                <CustomTextField
                    TextFieldWidth="100%"
                    value={fontColor}
                    onChange={handleFontColor}
                    placeholder="Enter a font color"
                />
                <CircleIcon style={{ fontSize: '24px', color: fontColor }} />
            </div>
        </div>
    );
};

export default BannerLeftAppearance;
