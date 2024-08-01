import { React } from 'react';
import styles from './BannerLeftApperance.module.scss';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import CircleIcon from '@mui/icons-material/Circle';
import ColorTextField from '../../ColorTextField/ColorTextField';

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
                <ColorTextField
                    value={backgroundColor}
                    onChange={handleBackgroundColor}
                />
            </div>
            <h2>Font Color</h2>
            <div className={styles.color}>
                <ColorTextField
                    value={fontColor}
                    onChange={handleFontColor}
                />
            </div>
        </div>
    );
};

export default BannerLeftAppearance;
