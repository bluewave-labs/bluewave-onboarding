import React from 'react'
import PropTypes from "prop-types";
import styles from './Error.module.scss';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';

export const ErrorComponent = ({ text, navigateUrl }) => {
  const navigate = useNavigate()
  const errorButtonStyle = {
    borderRadius: '8px',
    marginTop: '58px',
    fontSize: '13px',
    lineHeight: '24px',
    padding: '5px 27px'
  }

  return (
    <div className={styles.errorContainer}>
       <div className={styles.info}>
          <div className={styles.infoHeader}>We cannot find this page</div>
          <div className={styles.infoText}>{text}</div>
       </div>
       <Button 
        style={errorButtonStyle}
        onClick={() => navigate(navigateUrl)}
        text='Go to the main dashboard' 
      />
    </div>
  )
};

ErrorComponent.propTypes = {
  text: PropTypes.string,
  navigateUrl: PropTypes.string
}
