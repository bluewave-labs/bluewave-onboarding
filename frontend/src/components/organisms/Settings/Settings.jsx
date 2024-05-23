// settings.jsx

import {useState, React} from 'react';
import styles from './Settings.module.scss';
import Switch from '../../atoms/Switch/Switch'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Settings = () => {

    const [text, setText] = useState('/');

    const handleInputChange = (event) => {
        let newText = event.target.value;
        if (!newText.startsWith('/')) {
            newText = '/' + newText;
        }
        setText(newText);
    };

    
  return (
    <div className={styles.settings}>
    <div className={styles.settingsHeader}>
      <span style={{marginLeft:'5px'}}>Settings</span>
      <CloseOutlinedIcon style={{color: '#98A2B3', fontSize: '20px'}}/>
      </div>
      <div className={styles.settingsContent}>
        <h3>Main dashboard - first login tour</h3>
        <h4 style={{fontWeight: 600}}>Status</h4>
        <div className={styles.status}>
        <div className={styles.switch}> <Switch/> </div>
          <h4>Active and visible</h4>
        </div>
        <div className={styles.tourName}>
          <h4>Tour Name</h4>
          <input type="text" />
        </div>
        <div className={styles.description}>
          <h4>Description</h4>
          <input type="text" />
        </div>
        <div className={styles.pageTargeting}>
          <h4>Page Targeting</h4>
          <div className={styles.pageTargetingOption}>
            <select style={{marginBottom:'5px'}}>
              <option value="equals">Equals to</option>
            </select>
            <input type="text" value={text} style={{marginBottom:'5px'}} 
            onChange={handleInputChange} 
            />     
          </div>
          <div className={styles.smallText}>Only show when the page URL matches</div>
        </div>
        <div className={styles.triggeringFrequency}>
          <h4>Triggering Frequency</h4>
          <select>
            <option value="just-once">Just Once</option>
          </select>
        </div>
        <div className={styles.theme}>
          <h4>Theme</h4>
          <select>
            <option value="default-theme">Default Theme</option>
          </select>
        </div>
      </div>
    </div>
  );
};


export default Settings;
