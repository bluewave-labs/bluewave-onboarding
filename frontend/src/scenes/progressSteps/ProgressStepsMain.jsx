import React, { useState } from 'react';
import ProgressSteps from '../../components/ProgressSteps/ProgressSteps';
import styles from './ProgressStepsMain.module.scss';
import Button from '../../components/Button/Button';
import CheckboxHRM from '../../components/Checkbox/CheckboxHRM';
import TeamMembersList from '../../components/ProgressSteps/TeamMemberList/TeamMembersList';
import { useNavigate } from "react-router-dom";
import { sendInvites, setOrganization } from '../../services/teamServices';

const ProgressStepsMain = () => {
    const navigate = useNavigate();
    const NUMBER_OF_STEPS = 4;
    const [step, setStep] = useState(1);
    const [teamMembersEmails, setTeamMembersEmails] = useState([]);
    const [organizationName, setOrganizationName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const addMember = (newMemberEmail) => {
        setTeamMembersEmails((prevEmails) => [...prevEmails, newMemberEmail]);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (emailInput != '') {
                addMember(emailInput);
                setEmailInput('')
            }

        }
    };

    const content = [
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
            explanation: "You have successfully set up your account. <br> What next? Start adding a guide, hint or a tour in your app"
        }
    ];

    const increaseStep = () => {
        if (step < NUMBER_OF_STEPS) {
            setStep(step => step + 1);
        }
    }

    const decreaseStep = () => {
        if (step > 1) {
            setStep(step => step - 1);
        }
    }

    const sendInvitesAndSetOrgName = async () => {
        try {
            const inviteResponse = await sendInvites(teamMembersEmails);
            const orgSetResponse = await setOrganization(organizationName);
            setLoading(false);
            navigate('/');
        } catch (err) {
            setErr(true);
            setLoading(false);
            if (err.response?.data?.error) {
                setErrorMessage(err.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    }

    const firstPage = () => {
        const handleTeamMembersEmailsChange = (event) => {
            setTeamMembersEmails(event.target.value);
        }

        return (
            <>
                <div className={styles.stepOne}>
                    <div className={styles.invite}>
                        <CheckboxHRM style={{ marginRight: '1rem' }} />
                        <h4 style={{ marginTop: '4px' }}>Invite team members</h4>
                    </div>

                    <div className={styles.teamMembers}>
                        <input
                            type="text"
                            placeholder="ex. type john@bluewavelabs.ca and press enter"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <TeamMembersList members={teamMembersEmails} setMembers={setTeamMembersEmails} />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button text='Next' sx={{ width: '107px', borderRadius: '10px !important' }} onClick={increaseStep} />
                </div>
            </>
        )
    }

    const secondPage = () => {
        return (
            <div className={styles.buttons}>
                <Button text='Install now - it’s easy' buttonType='secondary-grey' sx={{ width: '174px', borderRadius: '10px !important' }} />
                <Button text='I will do it later' sx={{ width: '148px', borderRadius: '10px !important' }} onClick={increaseStep} />
            </div>
        )
    }

    const handleOrganizationNameChange = (event) => {
        setOrganizationName(event.target.value);
    }

    const thirdPage = () => {
        return (
            <>
                <div className={styles.stepOne}>
                    <input
                        type="text"
                        placeholder='ex. Acme corp.'
                        value={organizationName}
                        onChange={handleOrganizationNameChange}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button text='Next' sx={{ width: '107px', borderRadius: '10px !important' }} onClick={increaseStep} />
                </div>
            </>
        )
    }

    const fourthPage = () => {
        return (
            <>
                <div className={styles.buttons}>      
                    <Button text='Sweet' sx={{ width: '148px', borderRadius: '10px !important' }} onClick={() => sendInvitesAndSetOrgName()} disabled={loading}/>
                </div>
            </>
        )
    }

    const pages = [firstPage, secondPage, thirdPage, fourthPage];

    return (
        <div className={styles.container}>
            <div className={styles.skeleton}>
                <h2>{content[step - 1].title}</h2>
                <ProgressSteps stepData={NUMBER_OF_STEPS} completed={step} />
            </div>
            <div className={styles.content}>
                <h3 dangerouslySetInnerHTML={{ __html: content[step - 1].explanation }} />
                {pages[step - 1]()}
            </div>
        </div>
    )
}

export default ProgressStepsMain;
