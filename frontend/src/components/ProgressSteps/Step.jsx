import React from 'react';
import PropTypes from 'prop-types'; 
import styles from './ProgressSteps.module.scss';
import StepIcon from './StepIcon';
import StepLine from './StepLine';

const main_purple = 'var(--main-purple)';

const Step = ({prevStep=true, currentStep=false, title, explanation, index, dataLength }) => {
  return (
    <div className={styles.step}>
        <div className={styles['icon-container']}>
            <StepIcon prevStep={prevStep} currentStep={currentStep}/>
            {index + 1 < dataLength && (<StepLine currentStep={currentStep}/>)}
        </div>
        <h3 style={{color: prevStep ? main_purple : ""}}>{title}</h3>
        <h4 style={{color: prevStep ? main_purple : ""}}>{explanation}</h4>      
    </div>
  );
};

Step.propTypes = {
    prevStep: PropTypes.bool,
    currentStep: PropTypes.bool,
    title: PropTypes.string.isRequired,     
    explanation: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired
  };
export default Step;
