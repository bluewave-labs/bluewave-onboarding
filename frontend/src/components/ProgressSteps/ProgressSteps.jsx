import React, { useState } from 'react';
import styles from './ProgressSteps.module.scss';
import { CheckCircle as CheckCircleIcon, TripOrigin as TripOriginIcon } from '@mui/icons-material';

const ProgressSteps = () => {
    const [step1Completed, setStep1Completed] = useState(false);
    const [step2Completed, setStep2Completed] = useState(false);
    const [step3Completed, setStep3Completed] = useState(false);

    const main_purple = 'var(--main-purple)';
    const light_gray = 'var(--light-gray)';

    return (
        <div className={styles.container}>
            <div className={styles.step}>
                <div className={styles['icon-container']}>
                    {step1Completed ? <CheckCircleIcon className={styles['check-circle-icon']} /> : <TripOriginIcon className={styles['on-progress']} />}
                    <div className={styles.line} style={{ backgroundColor: step1Completed ? main_purple : light_gray }}></div>
                </div>
                <h3 style={{color: !step1Completed ? main_purple: ""}}>Your Details</h3>
                <h4 style={{color: !step1Completed ? main_purple : ""}}>Please provide your name and email.</h4>
            </div>
            <div className={styles.step}>
                <div className={styles['icon-container']}>
                    {step2Completed ? <CheckCircleIcon className={styles['check-circle-icon']} /> : <TripOriginIcon className={step1Completed ? styles['on-progress'] : styles['future-step']} />}
                    <div className={styles.line} style={{ backgroundColor: step2Completed ? main_purple : light_gray }}></div>
                </div>
                <h3 style={{color: step1Completed && !step2Completed ? main_purple : ""}}>Company Details</h3>
                <h4 style={{color: step1Completed && !step2Completed ? main_purple : ""}}>A few details about your company.</h4>
            </div>
            <div className={styles.step}>
                {step3Completed ? <CheckCircleIcon className={styles['check-circle-icon']} /> : <TripOriginIcon className={step2Completed ? styles['on-progress'] : styles['future-step']} />}
                <h3 style={{color: step2Completed ? main_purple : ""}}>Invite Your Team</h3>
                <h4 style={{color: step2Completed ? main_purple : ""}}>Start collaborating with your team.</h4>      
            </div>
        </div>
    );
}

export default ProgressSteps;
