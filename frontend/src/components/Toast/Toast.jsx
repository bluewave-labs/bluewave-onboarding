import React, { useEffect, useState } from 'react';
import styles from './Toast.module.scss';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';
import ToastItem from './ToastItem';
import { defaultToastOptions, MAXIMUM_TOAST_COUNT } from './constant';

const Toast = () => {
  const [toasts, setToasts] = useState([]);
  const [options, setOptions] = useState(defaultToastOptions);

  useEffect(() => {
    const handleNewToast = (message, options) => {
      const newToast = { message: `${message}`, id: Date.now() };
      setToasts((prevToasts) => {
        const newArr = [...prevToasts, newToast];
        return prevToasts.length < MAXIMUM_TOAST_COUNT ? newArr : newArr.slice(1);
      });
      options && setOptions({...defaultToastOptions, ...options})
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
      }, 3000 + 500);
    };

    toastEmitter.on(TOAST_EMITTER_KEY, handleNewToast);

    return () => {
      toastEmitter.off(TOAST_EMITTER_KEY, handleNewToast);
    };
  }, []);

  const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  const containerStyle = {
    top: options.top,
  }

  return (
    <div className={styles.toastContainer} style={containerStyle}>
      {toasts.map((toast) => (
        <ToastItem 
          key={toast?.id} 
          id={toast.id} 
          message={toast.message} 
          closeToast={closeToast} 
          options={options}
        />
      ))}
    </div>
  );
};

export default Toast;