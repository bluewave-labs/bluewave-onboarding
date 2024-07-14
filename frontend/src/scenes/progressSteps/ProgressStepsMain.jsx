import React, { useState } from 'react';
import ProgressSteps from '../../components/ProgressSteps/ProgressSteps';

const ProgressStepsMain = () => {
    const [step, setStep] = useState(1);
    const stepData = [
        {
            title: "Customize your onboarding",
            explanation: "Welcome to BlueWave Onboard. Please customize your dashboard experience here."
        },
        {
            title: "Install BlueWave Onboard now?",
            explanation: "You’ll need a small extension to use create, edit and preview your onboarding items. Your end users don’t need to install this."
        },
        {
            title: "About your organization",
            explanation: "What is your organization’s name?"
        },
        {
            title: "Congratulations!",
            explanation: "You have successfully set up your account. \n What next? Start adding a guide, hint or a tour in your app"
        }
        
    ];
    const number_of_steps = stepData.length;
    const increaseStep = () => {
        if (step < number_of_steps){
            setStep(step => step + 1)
        }
    }

    const decreaseStep = () => {
        if (step > 1){
            setStep(step => step - 1)
        }
    }

    return(
        <ProgressSteps stepData={stepData}/>
    )
       
}

export default ProgressStepsMain;