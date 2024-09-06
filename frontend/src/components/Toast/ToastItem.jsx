import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Toast.module.scss';

const ToastItem = ({ message, id, closeToast, options }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // For animation slide-in
    const animationTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 0)
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, options.duration);

    return () => {
      clearTimeout(timeout);
      clearTimeout(animationTimeout);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // For animation slide out
    setTimeout(() => {
      closeToast(id)
    },300)
  }

  return (
    <div className={classNames(styles.toast, { [styles.slideIn]: isVisible, [styles.slideOut]: !isVisible})} key={id}>
      <p className={styles.text}>{message}</p>
      <CloseIcon onClick={handleClose} className={styles.icon} />
    </div>
  );
};

ToastItem.propTypes = {
  message: PropTypes.string,
  id: PropTypes.number,
  closeToast: PropTypes.func,
  options: PropTypes.object
}

export default ToastItem;