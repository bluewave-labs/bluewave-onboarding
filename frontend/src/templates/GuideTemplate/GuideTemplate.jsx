import { React } from 'react';
import PropTypes from 'prop-types';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from './GuideTemplate.module.scss';
import classNames from 'classnames';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

const GuideTemplate = ({ title = '', handleButtonClick = () => null, activeButton = 0, leftContent = () => null, rightContent = () => null, leftAppearance = () => null, onSave= () => null, contentType = "/" }) => {
    const navigate = useNavigate();
    const buttons = ['Content', 'Appearance'];
    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <span style={{ marginLeft: '5px' }}>{title}</span>
                    <CloseOutlinedIcon style={{ color: '#98A2B3', fontSize: '20px', cursor: "pointer" }} onClick={() => navigate(`${contentType}`)} />
                </div>
                <div className={styles.content}>
                    {/* Content and Appereance buttons */}
                    <div className={styles.buttons}>
                        {buttons.map((buttonName, index) => (
                            <button
                                key={index}
                                className={classNames(styles.menuButton, {
                                    [styles.active]: activeButton === index,
                                })}
                                onClick={() => handleButtonClick(index)}
                            >
                                {buttonName}
                            </button>
                        ))}
                    </div>
                    <div className={styles.leftRightContent}>
                        {activeButton === 1 ? leftAppearance() : leftContent()}
                        {rightContent()}
                    </div>
                    <div className={styles.optionButtons}>
                        <Button text='Cancel' buttonType='secondary-grey' onClick={() => {navigate('/');}}/>
                        <Button text='Save'onClick={onSave}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

GuideTemplate.propTypes = {
    title: PropTypes.string,
    handleButtonClick: PropTypes.func,
    activeButton: PropTypes.number,
    leftContent: PropTypes.func,
    rightContent: PropTypes.func,
    leftAppearance: PropTypes.func,
    onSave: PropTypes.func,
};

export default GuideTemplate;