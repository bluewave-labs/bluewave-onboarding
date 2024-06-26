import React, { useState } from 'react';
import styles from './ProgressSteps.module.scss';
import Step from './Step';

const ProgressSteps = ({ stepData }) => {
    const initialStates = stepData.map(() => false);
    const [stepsCompleted, setStepsCompleted] = useState(initialStates);

    const setStepCompleted = (index, value) => {
        const newStepsCompleted = [...stepsCompleted];
        newStepsCompleted[index] = value;
        setStepsCompleted(newStepsCompleted);
    };

    return (
        <div className={styles.container}>
            {stepData.map((step, index) => (
                <Step
                    key={index}
                    title={step.title}
                    explanation={step.explanation}
                    currentStep={stepsCompleted[index]}
                    prevStep={index - 1 < 0 ? true : stepsCompleted[index - 1]}
                    index={index}
                    dataLength={stepData.length}
                />
            ))}
            <button onClick={() => setStepCompleted(0, true)}>Set Step 2 to True</button>
        </div>
        
    );
};

export default ProgressSteps;
